import { User } from "./types";

export function getFullName(user: User) {
    return user.firstName + " " + user.lastName;
}


export function isEmail(email: string) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
}