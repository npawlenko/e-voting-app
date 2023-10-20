import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

const initialState: AuthState = {
    user: null,
    accessToken: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAccessToken: (state, action: PayloadAction<string | null>) => {
            state.accessToken = action.payload;
        },
        setUser: (state, action: PayloadAction<User | null>) => {
            state.user = action.payload;
        }
    }
});

export const { setUser, setAccessToken } = authSlice.actions;

export default authSlice.reducer;
