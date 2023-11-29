import React, { useState } from 'react'
import { Container, Typography } from '@mui/material';
import GenericList from 'components/GenericList';
import PollListItem, { Poll } from 'components/poll/PollListItem';
import { useQuery } from '@apollo/client';
import { POLLS } from 'services/poll/gql/queries';
import { showAlertAndLog } from 'utils/errorUtils';
import { useTranslation } from 'react-i18next';

const ITEMS_PER_PAGE = 10;

const HomeLoggedIn = () => {
    const { t } = useTranslation();
    const [currentPage, setCurrentPage] = useState(1);
    const { loading, error, data: pollsData} = useQuery(POLLS, {
        variables: {
            pageSize: ITEMS_PER_PAGE, pageNumber: currentPage - 1
        }
    });

    if(loading) {
        return <p>Ładowanie...</p>;
    }

    if(error) {
        showAlertAndLog(error);
        return <>error :</>;
    }

    if(typeof pollsData !== undefined) console.log('data: ', pollsData);

    return ( 
        <Container sx={{my: 4}}>
            <Typography variant='h3'>{t('myPolls')}</Typography>

            <Typography variant='h3'>{t('availablePolls')}</Typography>
            <GenericList
                data={pollsData.polls}
                keyExtractor={(poll: Poll) => poll?.id}
                renderItem={(poll) => (
                    <PollListItem poll={poll} />
                )}
            />
        </Container>
    );
}

export default HomeLoggedIn