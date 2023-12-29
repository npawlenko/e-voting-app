import React, { useEffect, useState } from 'react';
import { DocumentNode, useQuery } from '@apollo/client';
import { POLLS } from 'services/apollo/gql/pollQueries';
import { useTranslation } from 'react-i18next';
import { Typography, Pagination, Button } from '@mui/material';
import { PollData } from './PollListItem';
import GenericList from 'components/GenericList';
import PollListItem from './PollListItem';
import { showAlertAndLog } from 'utils/errorUtils';

const PAGE_SIZE = 10;

type PollsListProps = {
    query: DocumentNode 
}

const PollsList = ({query}: PollsListProps) => {
    const { t } = useTranslation();
    const [polls, setPolls] = useState<PollData[]>([]);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState(1);

    const { loading, error, data } = useQuery(query, {
        variables: {
            pageSize: PAGE_SIZE, pageNumber: currentPage - 1
        }
    });

    const loadMore = () => {
        if (hasMore) {
            setCurrentPage(currentPage + 1);
        }
    };

    useEffect(() => {
        if(!data) {
            return;
        }

        const key = Object.keys(data)[0];
        const d = data[key];
        if (d) {
            setPolls(prevPolls => currentPage === 1 ? [...d] : [...prevPolls, ...d]);
            setHasMore(d.length === PAGE_SIZE);
        }
    }, [data]);

    if (loading) {
        return <p>Ładowanie...</p>;
    }

    if (error) {
        showAlertAndLog(error);
        return <>error :</>;
    }

    return (
        <>
            <GenericList
                data={polls}
                keyExtractor={(poll: PollData) => poll?.id}
                renderItem={(poll) => (
                    <PollListItem poll={poll} />
                )}
            />
            {!hasMore ? null :
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={loadMore}
                    >
                        Załaduj więcej
                    </Button>
                </div>
            }
        </>
    );
}

export default PollsList;