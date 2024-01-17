import { gql } from "@apollo/client";

export const USERS = gql`
    query {
        users {
            id
            firstName
            lastName
        }
    }
`;

export const USERS_PAGE = gql`
    query {
        users_page {
            id
            firstName
            lastName
            email
        }
    }
`;

export const USER = gql`
    query User($id: ID!) {
        user(id: $id) {
            id
            firstName
            lastName
            email
        }
    }
`;