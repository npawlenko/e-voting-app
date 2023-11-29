import { gql } from "@apollo/client";

export const LOGIN = gql`
    mutation AuthLogin($email: String!, $password: String!) {
        auth_login(email: $email, password: $password) {
            accessToken
        }
    }
`;

export const REGISTER = gql`
    mutation AuthRegister($object: user_register_input!) {
        auth_register(object: $object) {
            accessToken
        }
    }
`;

export const LOGOUT = gql`
    mutation {
        auth_logout
    }
`;

export const REFRESH_TOKEN = gql`
    mutation { 
        auth_refresh {
            accessToken
        }
    }
`;
