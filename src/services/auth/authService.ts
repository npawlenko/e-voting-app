import { store } from "store";
import { setAccessToken } from "features/auth/authSlice"
import Cookies from "universal-cookie";
import { apolloClient } from "services/apollo/apollo"
import { LOGIN_MUTATION, LOGOUT_MUTATION, REGISTER_MUTATION, REFRESH_TOKEN_MUTATION } from "./gql/mutations"
import { LoginPayload, RegisterPayload } from "./authTypes"
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { showError, showAndLogError } from "utils/errorUtils";
import { ErrorSeverity } from "features/error/ApplicationError";

const ACCESS_TOKEN_COOKIE_NAME: any = process.env.REACT_APP_ACCESS_TOKEN_COOKIE_NAME;
const ACCESS_TOKEN_COOKIE_LIFETIME: any = process.env.REACT_APP_ACCESS_TOKEN_COOKIE_LIFETIME;

const cookies = new Cookies();


export const initializeAuthContext = (appStore: ToolkitStore) => {
    const accessToken = cookies.get(ACCESS_TOKEN_COOKIE_NAME);
    
    if (accessToken) {
        appStore.dispatch(setAccessToken(accessToken));
    }
}

export const isLoggedIn = (): boolean => {
    return store.getState().auth.accessToken !== null;
}

export const logout = async () => {
    if (!isLoggedIn()) {
        showError('error.auth.notLoggedIn', ErrorSeverity.ERROR);
        return;
    }

    try {
        await apolloClient.mutate({
            mutation: LOGOUT_MUTATION
        });
        updateAccessToken(null);
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const login = async (payload: LoginPayload) => {
    if (isLoggedIn()) {
        showError('error.auth.alreadyLoggedIn', ErrorSeverity.ERROR);
        return;
    }

    try {
        const { data: { auth_login: { accessToken } } } = await apolloClient.mutate({
            mutation: LOGIN_MUTATION,
            variables: payload
        });
        updateAccessToken(accessToken);
    } catch (error) {
        console.error("Error when trying to login: ", error);
        throw error;
    }
}

export const register = async (payload: RegisterPayload) => {
    if (isLoggedIn()) {
        showError('error.auth.alreadyLoggedIn', ErrorSeverity.ERROR);
        return;
    }

    try {
        const { data: { auth_register: { accessToken } } } = await apolloClient.mutate({
            mutation: REGISTER_MUTATION,
            variables: {
                object: payload
            }
        });
        updateAccessToken(accessToken);
    } catch (error) {
        console.error("Error when trying to register: ", error);
        throw error;
    }
}

export const refreshToken = async () => {
    try {
        const { data: { auth_refresh: { accessToken } } } = await apolloClient.mutate({
            mutation: REFRESH_TOKEN_MUTATION
        });
        updateAccessToken(accessToken);
    } catch (error) {
        console.error("Error when trying to refresh: ", error);
        throw error;
    }
}

function setAccessTokenCookie(accessToken: string) {
    const cookieExpirationDate = new Date();
    cookieExpirationDate.setSeconds(cookieExpirationDate.getSeconds() + ACCESS_TOKEN_COOKIE_LIFETIME);
    cookies.set(ACCESS_TOKEN_COOKIE_NAME, accessToken, {
        expires: cookieExpirationDate,
    });
}

function updateAccessToken(accessToken: string | null) {
    store.dispatch(setAccessToken(accessToken));

    if (accessToken) {
        setAccessTokenCookie(accessToken);
    }
    else {
        cookies.remove(ACCESS_TOKEN_COOKIE_NAME);
    }
}
