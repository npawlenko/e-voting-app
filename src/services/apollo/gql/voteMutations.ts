import { gql } from "@apollo/client";

export const INSERT_VOTE = gql`
    mutation InsertVote($pollAnswerId: ID!) {
        insert_vote(poll_answer_id: $pollAnswerId) {
            id
        }
    }
`;