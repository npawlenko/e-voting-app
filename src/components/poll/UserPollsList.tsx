import React, { useState } from 'react'
import { useQuery } from '@apollo/client';
import { USER_POLLS } from 'services/poll/gql/queries';
import { useTranslation } from 'react-i18next';
import { Poll } from './PollListItem';
import { Typography } from '@mui/material';
import GenericList from 'components/GenericList';
import PollListItem from './PollListItem';
import { showAlertAndLog } from 'utils/errorUtils';

const UserPollsList = () => {
    const { t } = useTranslation();
    const [currentPage, setCurrentPage] = useState(1);
    const { loading, error, data: pollsData} = useQuery(USER_POLLS, {
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
            <Typography variant='h3' sx={{ mb: 3 }}>{t('myPolls')}</Typography>
            <GenericList
                data={pollsData.user_polls}
                keyExtractor={(poll: Poll) => poll?.id}
                renderItem={(poll) => (
                    <PollListItem poll={poll} />
                )}
            />
        </>
    );
}

export default UserPollsList