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

export const RESET_PASSWORD_INIT = gql`
    mutation AuthResetPasswordInit($email: String!) {
        auth_send_reset_password_link(email: $email)
    }
`;

export const RESET_PASSWORD = gql`
    mutation AuthResetPassword($password: String!, $resetToken: String!) {
        auth_reset_password(new_password: $password, reset_token: $resetToken)
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
