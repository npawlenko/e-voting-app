import { apolloClient } from 'services/apollo';
import { POLL, POLLS, POLL_BY_TOKEN, USER_POLLS } from './gql/queries';
import { DocumentNode } from 'graphql';

async function queryWithPagination(query: DocumentNode, pageSize=10, pageNumber=0) {
    try {
        return await apolloClient.query({
            query,
            variables: {pageSize, pageNumber}
        });
    } catch (error) {
        console.error(error);
        throw error;
    }
} 

export const getPolls = async (pageSize=10, pageNumber=0) => {
    return queryWithPagination(POLLS, pageSize, pageNumber);
}

export const getUserPolls = async (pageSize=10, pageNumber=0) => {
    return queryWithPagination(USER_POLLS, pageSize, pageNumber);
}

export const getPollById = async (pollId: number) => {
    try {
        return await apolloClient.query({
            query: POLL,
            variables: {pollId}
        });
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getPollByToken = async (token: String) => {
    try {
        return await apolloClient.query({
            query: POLL_BY_TOKEN,
            variables: {token}
        });
    } catch (error) {
        console.error(error);
        throw error;
    }
}