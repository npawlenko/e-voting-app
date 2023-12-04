import { FetchResult, Observable } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { GraphQLError } from "graphql";
import { refreshToken } from "services/auth";
import { showAlert } from "utils/errorUtils";
import { ACCESS_TOKEN_COOKIE_NAME, REFRESH_TOKEN_COOKIE_NAME } from "services/auth/authService";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const UNATHENTICATED = 401;

export const errorInterceptor = onError(({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
        for(let error of graphQLErrors) {
            switch(error.extensions.code) {
                case UNATHENTICATED:
                    if (operation.operationName === 'refreshToken') return;

                    const observable = new Observable<FetchResult<Record<string, any>>>(
                        (observer) => {
                          (async () => {
                            try {
                              const accessToken = await refreshToken();
          
                              if (!accessToken) {
                                cookies.remove(REFRESH_TOKEN_COOKIE_NAME);
                                cookies.remove(ACCESS_TOKEN_COOKIE_NAME);
                                throw new GraphQLError('Could not refresh token');
                              }
          
                              const subscriber = {
                                next: observer.next.bind(observer),
                                error: observer.error.bind(observer),
                                complete: observer.complete.bind(observer),
                              };
          
                              forward(operation).subscribe(subscriber);
                            } catch (err) {
                              observer.error(err);
                            }
                          })();
                        }
                      );
                    return observable;
            }
        }
    }
    if (networkError) showAlert('error.server');
  });