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
