import { useQuery } from '@apollo/client';
import GenericList from 'components/GenericList';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { showAlertAndLog } from 'utils/errorUtils';
import UserListItem from './UserListItem';
import { UserData } from 'utils/types';
import { USERS_PAGE } from 'services/apollo/gql/userQueries';
import { Button } from '@mui/material';

const PAGE_SIZE = 9;

const UsersList = () => {
    const { t } = useTranslation();
    const [users, setUsers] = useState<UserData[]>([]);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState(1);

    const { loading, error, data } = useQuery(USERS_PAGE, {
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
            setUsers(prevUsers => currentPage === 1 ? [...d] : [...prevUsers, ...d]);
            setHasMore(d.length === PAGE_SIZE);
        }
    }, [data, currentPage]);

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
                data={users}
                keyExtractor={(user: UserData) => Number.parseInt(user?.id)}
                renderItem={(user) => (
                    <UserListItem user={user} />
                )}
            />
            {!hasMore ? null :
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={loadMore}
                    >
                        {t('loadMore')}
                    </Button>
                </div>
            }
        </>
    );
}

export default UsersList