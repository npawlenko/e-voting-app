import { gql } from "@apollo/client";

export const LOGIN = gql`
    mutation AuthLogin($email: String!, $password: String!) {
        auth_login(email: $email, password: $password) {
            accessToken
            refreshToken
        }
    }
`;

export const REGISTER = gql`
    mutation AuthRegister($object: user_register_input!) {
        auth_register(object: $object) {
            accessToken
            refreshToken
        }
    }
`;

export const LOGOUT = gql`
    mutation {
        auth_logout
    }
`;

export const REFRESH_TOKEN = gql`
    mutation AuthRefresh($refreshToken: String!) { 
        auth_refresh(refresh_token: $refreshToken) {
            accessToken
            refreshToken
        }
    }
`;
