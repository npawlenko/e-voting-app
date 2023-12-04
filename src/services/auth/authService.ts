import { store } from "store";
import { setAccessToken, setRefreshToken } from "features/auth/authSlice"
import Cookies from "universal-cookie";
import { apolloClient } from "services/apollo/apollo"
import { LOGIN, LOGOUT, REGISTER, REFRESH_TOKEN } from "./gql/mutations"
import { LoginPayload, RegisterPayload } from "./authTypes"
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { showAlert, showAlertAndLog } from "utils/errorUtils";
import { ErrorSeverity } from "features/error/ApplicationError";

export const ACCESS_TOKEN_COOKIE_NAME: any = process.env.REACT_APP_ACCESS_TOKEN_COOKIE_NAME;
export const REFRESH_TOKEN_COOKIE_NAME: any = process.env.REACT_APP_REFRESH_TOKEN_COOKIE_NAME;

const cookies = new Cookies();


export const initializeAuthContext = async (appStore: ToolkitStore) => {
    const accessTokenValue = cookies.get(ACCESS_TOKEN_COOKIE_NAME);
    const refreshTokenValue = cookies.get(REFRESH_TOKEN_COOKIE_NAME);
    
    if(refreshTokenValue) {
        appStore.dispatch(setRefreshToken(refreshTokenValue));
        if (accessTokenValue) {
            appStore.dispatch(setAccessToken(accessTokenValue));
        } else {
            refreshToken();
        }
    }
}

export const isLoggedIn = (): boolean => {
    return store.getState().auth.accessToken !== null;
}

export const logout = async () => {
    if (!isLoggedIn()) {
        throw new Error('error.auth.notLoggedIn');
    }

    try {
        await apolloClient.mutate({
            mutation: LOGOUT
        });
    } catch (error) {
        throw error;
    } finally {
        cookies.remove(ACCESS_TOKEN_COOKIE_NAME);
        cookies.remove(REFRESH_TOKEN_COOKIE_NAME);
        updateStoreTokenState(null, null);
    }
}

export const login = async (payload: LoginPayload) => {
    if (isLoggedIn()) {
        throw new Error('error.auth.alreadyLoggedIn');
    }

    try {
        const { data: { auth_login: { accessToken, refreshToken } } } = await apolloClient.mutate({
            mutation: LOGIN,
            variables: payload
        });
        console.log(accessToken, refreshToken)
        updateStoreTokenState(accessToken, refreshToken);
        showAlert('auth.loggedIn', ErrorSeverity.SUCCESS);
    } catch (error) {
        console.error("Error when trying to login: ", error);
        throw error;
    }
}

export const register = async (payload: RegisterPayload) => {
    if (isLoggedIn()) {
        throw new Error('error.auth.alreadyLoggedIn');
    }

    try {
        const { data: { auth_register: { accessToken, refreshToken } } } = await apolloClient.mutate({
            mutation: REGISTER,
            variables: {
                object: payload
            }
        });
        updateStoreTokenState(accessToken, refreshToken);
    } catch (error) {
        console.error("Error when trying to register: ", error);
        throw error;
    }
}

export const refreshToken = async () => {
    const refreshToken = store.getState().auth.refreshToken;
    try {
        const { data: { auth_refresh: { accessToken: newAccessToken, newRefreshToken } } } = await apolloClient.mutate({
            variables: {
                refreshToken: refreshToken
            },
            mutation: REFRESH_TOKEN
        });
        updateStoreTokenState(newAccessToken, newRefreshToken);
        return newAccessToken;
    } catch (error) {
        updateStoreTokenState(null, null);
        cookies.remove(ACCESS_TOKEN_COOKIE_NAME);
        cookies.remove(REFRESH_TOKEN_COOKIE_NAME);
    }
}

const updateStoreTokenState = (accessToken: string | null, refreshToken: string | null) => {
    store.dispatch(setRefreshToken(refreshToken));
    store.dispatch(setAccessToken(accessToken));
}
