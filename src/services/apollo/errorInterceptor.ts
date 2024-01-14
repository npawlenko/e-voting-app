import { FetchResult, Observable } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { GraphQLError } from "graphql";
import { refreshToken } from "services/auth";
import { showAlert, showAlertAndLog } from "utils/errorUtils";
import { ACCESS_TOKEN_COOKIE_NAME, REFRESH_TOKEN_COOKIE_NAME } from "services/auth/authService";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const UNATHENTICATED = 401;

function stopErrorPropagation() {
  return new Observable<FetchResult<Record<string, any>>>(() => {});
}

export const errorInterceptor = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors) {
      for(let error of graphQLErrors) {
          switch(error.extensions.errorCode) {
            case UNATHENTICATED:
              if (operation.operationName === 'AuthRefresh') return;
              if (operation.operationName === 'AuthLogin') return;

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

                        operation.setContext(({ headers = {} }) => ({
                          headers: {
                            ...headers,
                            authorization: `Bearer ${accessToken}`,
                          },
                        }));
    
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
            default:
              showAlertAndLog(error);
              return stopErrorPropagation();
          }
      }
  }
  if (networkError) {
    showAlert('error.server');
    return stopErrorPropagation();
  }
});