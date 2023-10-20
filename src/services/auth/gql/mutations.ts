import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
    mutation AuthLogin($email: String!, $password: String!) {
        auth_login(email: $email, password: $password) {
            accessToken
        }
    }
`;

export const REGISTER_MUTATION = gql`
    mutation AuthRegister($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
        auth_register(firstName: $first_name, lastName: $last_name, email: $email, password: $password) {
            accessToken
        }
    }
`;

export const LOGOUT_MUTATION = gql`
    mutation {
        auth_logout {
            void
        }
    }
`;

export const REFRESH_TOKEN_MUTATION = gql`
    mutation { 
        auth_refresh {
            accessToken
        }
    }
`;
