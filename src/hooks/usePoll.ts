import { useState, useCallback, useEffect } from 'react';
import { useMutation, gql, useQuery, useLazyQuery } from '@apollo/client';
import { PollData } from 'features/poll/PollListItem';
import { POLL } from 'services/apollo/gql/pollQueries';

type UsePollHook = {
    pollId: string | undefined
}

export const usePoll = ({ pollId: id }: UsePollHook) => {
    const [poll, setPoll] = useState<PollData | null>(null);

    const { loading, data, error } = useQuery(POLL, {
        variables: { pollId: id }
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

    return { poll, loading };
};