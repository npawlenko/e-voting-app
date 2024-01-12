import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
import { ACCESS_TOKEN_COOKIE_NAME, REFRESH_TOKEN_COOKIE_NAME } from "services/auth/authService";
import { RootState } from "store/store";
import Cookies from "universal-cookie";

export type AuthState = {
    user: User | null;
    accessToken: string | null;
    refreshToken: string | null;
}

export enum Role {
    USER, ADMIN
}

export type User = {
    id: string
    email: string
    fullName: string
    role: Role
}

export type CredentialsPayload = {
    accessToken: string
    user: User
}

type TokenClaims = {
    id: string
    sub: string
    role: Role
    fullName: string
    exp: number
    iat: number
}

const initialState: AuthState = {
    user: null,
    accessToken: null,
    refreshToken: null
};

const cookies = new Cookies();

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAccessToken: (state, action: PayloadAction<string | null>) => {
            const accessToken = action.payload;
            if (!accessToken) {
                cookies.remove(ACCESS_TOKEN_COOKIE_NAME);
                state.user = state.accessToken = null;
                return;
            }

            state.accessToken = accessToken;
            const claims: TokenClaims = jwtDecode(accessToken);
            state.user = {
                email: claims.sub,
                ...claims
            };
            cookies.set(ACCESS_TOKEN_COOKIE_NAME, accessToken, {
                expires: new Date(claims.exp * 1000),
                path: '/'
            });
        },
        setRefreshToken: (state, action: PayloadAction<string | null>) => {
            const refreshToken = action.payload;
            if (!refreshToken) {
                cookies.remove(REFRESH_TOKEN_COOKIE_NAME);
                state.user = state.refreshToken = null;
                return;
            }

            state.refreshToken = refreshToken;
            const claims: TokenClaims = jwtDecode(refreshToken);
            state.user = {
                email: claims.sub,
                ...claims
            };
            cookies.set(REFRESH_TOKEN_COOKIE_NAME, refreshToken, {
                expires: new Date(claims.exp * 1000),
                path: '/'
            });
        }
    }
});

export const { setAccessToken, setRefreshToken } = authSlice.actions;
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentAccessToken = (state: RootState) => state.auth.accessToken;

export default authSlice.reducer;
