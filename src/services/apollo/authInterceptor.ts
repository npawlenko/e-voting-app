import { ApolloLink, Observable } from '@apollo/client';
import { Subscription } from 'zen-observable-ts';
import { store } from "store";
import { isLoggedIn } from 'services/auth/authService';

export const authInterceptor = new ApolloLink((operation, forward) => {
    return new Observable((observer) => {
        let handle: Subscription | undefined;
        try {
            if (isLoggedIn()) {
                const accessToken = store.getState().auth.accessToken;
                operation.setContext({
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
            }

            handle = forward(operation).subscribe({
                next: observer.next.bind(observer),
                error: (error) => {
                    if(error) {
                        console.log(error);
                    }
                    else {
                        observer.error(error);
                    }
                },
                complete: observer.complete.bind(observer)
            })
        } catch (e) {
            console.error('Błąd podczas obsługi operacji:', e);
            observer.error(e);
        }
        
        return () => {
            if (handle) handle.unsubscribe();
        };
    });
});
