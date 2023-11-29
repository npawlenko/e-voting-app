import { gql } from "@apollo/client";

export const INSERT_POLL = gql`
    query InsertPoll($poll: poll_input!) {
        insert_poll(poll: $poll) {
            id
            question
            createdAt
            closesAt
            public
            creator
            answers
            votes
        }
    }
`;

export const UPDATE_POLL = gql`
    query UpdatePoll($pollId: ID!, $object: poll_input!) {
        update_poll(poll_id: $pollId, object: $object): Poll
            id
            question
            createdAt
            closesAt
            public
            creator
            answers
            votes
        }
    }
`;

export const DELETE_POLL = gql`
    query DeletePoll($pollId: ID!) {
        delete_poll(poll_id: $pollId)
    }
`;

