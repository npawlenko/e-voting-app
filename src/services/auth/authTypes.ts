import { Role } from "features/auth/authSlice";

export type LoginPayload = {
    email: string;
    password: string;
}

export type RegisterPayload = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export type TokenClaims = {
    sub: string;
    role: Role;
    fullName: string;
    exp: number;
    iat: number;
}