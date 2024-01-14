import { gql } from "@apollo/client";

export const INSERT_VOTE = gql`
    mutation InsertVote($pollAnswerId: ID!) {
        insert_vote(poll_answer_id: $pollAnswerId) {
            id
        }
    }
`;

export const INSERT_VOTE_BY_TOKEN = gql`
    mutation InsertVoteByToken($pollAnswerId: ID!, $token: String!) {
        insert_vote_by_token(poll_answer_id: $pollAnswerId, vote_token: $token) {
            id
        }
    }
`;