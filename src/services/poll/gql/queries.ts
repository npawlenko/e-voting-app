import { gql } from "@apollo/client";

export const POLLS = gql`
    query PollList($pageSize: Int, $pageNumber: Int) {
        polls(page_size: $pageSize, page_number: $pageNumber) {
            id
            creator {
                firstName
                lastName
            }
            question
            createdAt
            closesAt
            isPublic
        }
    }
`;

export const USER_POLLS = gql`
    query UserPollList($pageSize: Int, $pageNumber: Int) {
        user_polls(page_size: $pageSize, page_number: $pageNumber) {
            id
            creator {
                firstName
                lastName
            }
            question
            createdAt
            closesAt
            isPublic
        }
    }
`;

export const POLL = gql`
    query Poll($pollId: ID!) {
        poll(poll_id: $pollId) {
            id
            creator {
                firstName
                lastName
            }
            question
            createdAt
            closesAt
            isPublic
        }
    }
`;

export const POLL_BY_TOKEN = gql`
    query PollByToken($token: String!) {
        poll_by_token(vote_token: $token) {
            id
            question
            createdAt
            closesAt
            isPublic
        }
    }
`;
