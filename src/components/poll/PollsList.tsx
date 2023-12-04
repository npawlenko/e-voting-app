import React, { useState } from 'react'
import { useQuery } from '@apollo/client';
import { POLLS } from 'services/poll/gql/queries';
import { useTranslation } from 'react-i18next';
import { Poll } from './PollListItem';
import { Typography } from '@mui/material';
import GenericList from 'components/GenericList';
import PollListItem from './PollListItem';
import { showAlertAndLog } from 'utils/errorUtils';

const PollsList = () => {
    const { t } = useTranslation();
    const [currentPage, setCurrentPage] = useState(1);
    const { loading, error, data: pollsData} = useQuery(POLLS, {
        variables: {
            pageSize: 10, pageNumber: currentPage - 1
        }
    });

    if(loading) {
        return <p>Ładowanie...</p>;
    }

    if(error) {
        showAlertAndLog(error);
        return <>error :</>;
    }

    return ( 
        <>
            <Typography variant='h3' sx={{ mb: 3 }}>{t('availablePolls')}</Typography>
            <GenericList
                data={pollsData.polls}
                keyExtractor={(poll: Poll) => poll?.id}
                renderItem={(poll) => (
                    <PollListItem poll={poll} />
                )}
            />
        </>
    );
}

export default PollsList