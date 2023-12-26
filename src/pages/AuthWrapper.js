import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import loadingGif from '../images/preloader.gif';
import styled from 'styled-components';

//Wrapper to enable auth0 authentication to AuthWrapper children components.
function AuthWrapper({ children }) {
  //Destructure isLoading and error from Auth0.
  const { isLoading, error } = useAuth0();

  //If is loading return loader gif.
  if (isLoading) {
    return <Wrapper><img src={loadingGif} alt="Loader" /></Wrapper>
  }

  //If there is an error in Auth operations return heading with error message.
  if (error) {
    return <Wrapper><h2>{error.message}</h2></Wrapper>
  }

  //If everything is ok. Render Dashboard.
  return <>{children}</>;
}

const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
  img {
    width: 150px;
  }
`;

export default AuthWrapper;
