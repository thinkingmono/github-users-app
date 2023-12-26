import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router-dom';

//Component to restrict access handling
const PrivateRoute = ({ children }) => {
  //Destructure isAuthenticated and user from Auth0 using useAuth0 hook.
  const { isAuthenticated, user } = useAuth0();
  //Store boolean checking if there is an user and if it is authenticated.
  const isUser = isAuthenticated && user;

  //If there is no user logged navigate to Login.
  if (!isUser) {
    return <Navigate to='/login' />
  }

  //If everything is ok render dashboard.
  return children;
};
export default PrivateRoute;
