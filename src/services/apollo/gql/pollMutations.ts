import { gql } from "@apollo/client";

export const INSERT_POLL = gql`
    mutation InsertPoll($poll: poll_input!) {
        insert_poll(poll: $poll) {
            id
            question
            createdAt
            closesAt
            isPublic
            creator
            answers
            votes
        }
    }
`;

export const UPDATE_POLL = gql`
    mutation UpdatePoll($pollId: ID!, $object: poll_input!) {
        update_poll(poll_id: $pollId, object: $object) {
            id
            question
            createdAt
            closesAt
            isPublic
            creator
            answers
            votes
        }
    }
`;

export const DELETE_POLL = gql`
    mutation DeletePoll($pollId: ID!) {
        delete_poll(poll_id: $pollId)
    }
`;

