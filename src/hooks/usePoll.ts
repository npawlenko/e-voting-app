import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { PollData } from 'features/poll/PollListItem';
import { POLL } from 'services/apollo/gql/pollQueries';

type UsePollHook = {
    pollId: string | undefined
};

export const usePoll = ({ pollId: id }: UsePollHook) => {
    const [poll, setPoll] = useState<PollData | null>(null);

    const { loading, data, error, refetch } = useQuery(POLL, {
        variables: { pollId: id },
        fetchPolicy: 'network-only'
    });

    useEffect(() => {
        if(data && data.poll) {
            setPoll(data.poll);
        }
    }, [data]);

    useEffect(() => {
        if(error) {
            console.error('Błąd podczas pobierania ankiety:', error);
        }
    }, [error]);

    const refreshPoll = () => {
        refetch();
    };

    return { poll, loading, refreshPoll };
};