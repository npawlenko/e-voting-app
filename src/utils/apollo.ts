import { ApolloClient, InMemoryCache } from "@apollo/client";

const API_ENDPOINT = process.env.REACT_APP_GRAPHQL;
console.log(API_ENDPOINT);

export const graphqlClient = new ApolloClient({
    uri: API_ENDPOINT,
    cache: new InMemoryCache(),
});
