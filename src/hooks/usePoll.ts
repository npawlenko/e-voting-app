import { useState, useEffect } from 'react';
import { DocumentNode, OperationVariables, QueryResult, useMutation, useQuery } from '@apollo/client';
import { POLL, POLLS, POLL_BY_TOKEN, USER_POLLS } from 'services/apollo/gql/pollQueries';
import { CLOSE_POLL, DELETE_POLL } from 'services/apollo/gql/pollMutations';
import { PollData } from 'utils/types';

type UsePollHook = {
    pollId: string | undefined
    token?: string | undefined
}

const refetchQueries = [POLL];

function getQueryName(query: DocumentNode): string {
    switch(query) {
        case POLL:
            return 'poll';
        case POLL_BY_TOKEN:
            return 'poll_by_token';
        default:
            return '';
    }
}

export const usePoll = ({ pollId, token }: UsePollHook) => {
    const [poll, setPoll] = useState<PollData | undefined>(undefined);
    const [deletePollMutation] = useMutation(DELETE_POLL, {refetchQueries});
    const [closePollMutation] = useMutation(CLOSE_POLL, {refetchQueries})

    const query = token === undefined ? POLL : POLL_BY_TOKEN;
    const queryName = getQueryName(query);
    const {loading, error, data, refetch} = useQuery(query, {
        fetchPolicy: 'network-only',
        variables: {
            pollId,
            token
        }},
    );

    useEffect(() => {
        if(data && data[queryName]) {
            setPoll(data[queryName]);
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