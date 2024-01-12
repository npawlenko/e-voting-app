import { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { POLL, POLLS, USER_POLLS } from 'services/apollo/gql/pollQueries';
import { CLOSE_POLL, DELETE_POLL } from 'services/apollo/gql/pollMutations';
import { PollData } from 'utils/types';

type UsePollHook = {
    pollId: string | undefined
};

export const usePoll = ({ pollId }: UsePollHook) => {
    const [poll, setPoll] = useState<PollData | undefined>(undefined);
    const [deletePollMutation] = useMutation(DELETE_POLL, {
        refetchQueries: [POLLS, USER_POLLS]
    });
    const [closePollMutation] = useMutation(CLOSE_POLL, {
        refetchQueries: [POLL]
    })

    const { loading, data, error, refetch } = useQuery(POLL, {
        variables: { pollId },
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

    const deletePoll = () => {
        if(pollId) {
            deletePollMutation({
                variables: {
                    pollId
                }
            })
        }
    };

    const closePoll = () => {
        if(pollId) {
            closePollMutation({
                variables: {
                    pollId
                }
            })
        }
    };

    return { poll, loading, error, deletePoll, closePoll, refreshPoll };
};