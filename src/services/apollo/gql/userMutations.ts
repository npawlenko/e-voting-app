import { gql } from "@apollo/client";

export const DELETE_USER = gql`
    mutation DeleteUser($id: ID!) {
        delete_user(id: $id)
    }
`;

export const UPDATE_USER = gql`
    mutation EditUser($id: ID!, $data: user_input!) {
        edit_user(id: $id, data: $data)
    }
`;