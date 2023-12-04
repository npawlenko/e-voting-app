import { ApolloLink, FetchResult, Observable, Operation } from '@apollo/client';
import { store } from "store";

export const authInterceptor = new ApolloLink((operation, forward) => {
    const accessToken = store.getState().auth.accessToken;
    operation.setContext(({ headers }: { headers: Record<string, string> }) => ({
        headers: {
            ...headers,
            Authorization: accessToken ? `Bearer ${accessToken}` : ''
        }
    }));

    return forward(operation);
});
