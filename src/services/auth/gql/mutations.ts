import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
    mutation AuthLogin($email: String!, $password: String!) {
        auth_login(email: $email, password: $password) {
            accessToken
        }
    }
`;

export const REGISTER_MUTATION = gql`
    mutation AuthRegister($object: user_register_input!) {
        auth_register(object: $object) {
            accessToken
        }
    }
`;

export const LOGOUT_MUTATION = gql`
    mutation {
        auth_logout
    }
`;

export const REFRESH_TOKEN_MUTATION = gql`
    mutation { 
        auth_refresh {
            accessToken
        }
    }
`;
