import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { GithubProvider } from './context/context';
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/*Auth0 Provider to enable authentication Auth0 in the app. Keys to use library. Cache location into browser's local storage.*/}
    <Auth0Provider
      domain="dev-j5d6wurxdb5q2f8o.us.auth0.com"
      clientId="EenaUYkJbRl0QiYzfUUCKGUUtKMHLVCJ"
      redirectUri={window.location.origin}
      cacheLocation='localstorage'>
      {/*Wrapping app into GithubProvider component to enable global context use*/}
      <GithubProvider>
        <App />
      </GithubProvider>
    </Auth0Provider>
  </React.StrictMode >
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
