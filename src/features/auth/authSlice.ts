import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
import { RootState } from "store/store";

export type AuthState = {
    user: User | null;
    accessToken: string | null;
}

export enum Role {
    USER, ADMIN
}

export type User = {
    email: string;
    fullName: string;
    role: Role;
}

export type CredentialsPayload = {
    accessToken: string;
    user: User;
}

type TokenClaims = {
    sub: string;
    role: Role;
    fullName: string;
    exp: number;
    iat: number;
}

const initialState: AuthState = {
    user: null,
    accessToken: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAccessToken: (state, action: PayloadAction<string | null>) => {
            const accessToken = action.payload;
            if (!accessToken) {
                state.user = state.accessToken = null;
                return;
            }

            state.accessToken = accessToken;
            const claims: TokenClaims = jwtDecode(accessToken);
            state.user = {
                email: claims.sub,
                ...claims
            };
        }
    }
});

export const { setAccessToken } = authSlice.actions;
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentAccessToken = (state: RootState) => state.auth.accessToken;

export default authSlice.reducer;
