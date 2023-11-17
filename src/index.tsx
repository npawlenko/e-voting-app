import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from 'services/apollo/apollo';
import { store } from './store';
import { initializeAuthContext } from 'services/auth';
import router from 'router';
import './i18n';
import "assets/styles/index.scss";

initializeAuthContext(store);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <ApolloProvider client={apolloClient}>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </ApolloProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
