import { store } from "store";
import { setUser } from "features/auth/authSlice"
import jwtDecode from "jwt-decode";
import { graphqlClient } from "utils/apollo"
import { LOGIN_MUTATION, LOGOUT_MUTATION, REGISTER_MUTATION, REFRESH_TOKEN_MUTATION } from "./gql/mutations"
import { LoginPayload, RegisterPayload, TokenClaims } from "./authTypes"

const AuthService = () => {
    const logout = async () => {
        try {
            await graphqlClient.mutate({
                mutation: LOGOUT_MUTATION
            });
            store.dispatch(setUser(null));
        } catch (error) {
            // TODO: error handling
            throw error;
        }
    }
    
    const login = async (payload: LoginPayload) => {
        try {
            const { data: { auth_login: { accessToken } } } = await graphqlClient.mutate({
                mutation: LOGIN_MUTATION,
                variables: payload
            });
            const claims: TokenClaims = jwtDecode(accessToken);
            store.dispatch(setUser({
                email: claims.sub,
                ...claims
            }));
        } catch (error) {
            console.error("Error when trying to login: ", error);
            throw error;
        }
    }
    
    const register = async (payload: RegisterPayload) => {
        try {
            const { data: { auth_register: { accessToken } } } = await graphqlClient.mutate({
                mutation: REGISTER_MUTATION,
                variables: payload
            });
        } catch (error) {
            throw error;
        }
    }
    
    const refreshToken = async () => {
        try {
            const { data: { auth_refresh: { accessToken } } } = await graphqlClient.mutate({
                mutation: REFRESH_TOKEN_MUTATION
            });

        } catch (error) {
            throw error;
        }
    }

    return {
        login,
        register,
        logout,
        refreshToken
    }
}

export default AuthService();
