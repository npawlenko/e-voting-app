import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { authInterceptor } from "./authInterceptor";

const API_ENDPOINT = process.env.REACT_APP_GRAPHQL_URL;

const apiLink = createHttpLink({
    uri: API_ENDPOINT
});

export const apolloClient = new ApolloClient({
    link: authInterceptor.concat(apiLink),
    uri: API_ENDPOINT,
    cache: new InMemoryCache(),
});
