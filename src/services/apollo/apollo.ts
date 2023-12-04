import { ApolloClient, InMemoryCache, createHttpLink, from } from "@apollo/client";
import { authInterceptor } from "./authInterceptor";
import { errorInterceptor } from "./errorInterceptor";

const API_ENDPOINT = process.env.REACT_APP_GRAPHQL_URL;

const httpLink = createHttpLink({
    uri: API_ENDPOINT,
    credentials: "include"
});

export const apolloClient = new ApolloClient({
    link: from([authInterceptor, errorInterceptor, httpLink]),
    uri: API_ENDPOINT,
    cache: new InMemoryCache(),
});
