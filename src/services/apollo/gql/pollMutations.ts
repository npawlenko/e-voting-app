import { gql } from "@apollo/client";

export const INSERT_POLL = gql`
    mutation InsertPoll($poll: poll_input!) {
        insert_poll(poll: $poll) {
            id
        }
    }
`;

export const UPDATE_POLL = gql`
    mutation UpdatePoll($pollId: ID!, $object: poll_input!) {
        update_poll(poll_id: $pollId, object: $object) {
            id
        }
    }
`;

export const CLOSE_POLL = gql`
    mutation ClosePoll($pollId: ID!) {
        close_poll(poll_id: $pollId)
    }
`;

export const DELETE_POLL = gql`
    mutation DeletePoll($pollId: ID!) {
        delete_poll(poll_id: $pollId)
    }
`;

