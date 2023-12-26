import React from 'react';
import styled from 'styled-components';
import { useAuth0 } from '@auth0/auth0-react';

//App Navbar
const Navbar = () => {
  //Destructure from Auth0.
  const { isLoading, user, isAuthenticated, loginWithRedirect, logout } = useAuth0();
  //Set isUser to true or false checking if there is an user and if it is authenticated.
  const isUser = isAuthenticated && user;

  return <Wrapper>
    {/*If isUser is true and user has a picture render user's avatar.*/}
    {isUser && user.picture && <img src={user.picture} alt={user.name} />}
    {/*If isUser is true and user has a name render user's welcome */}
    {isUser && user.name && <h4>Welcome, <strong>{user.name.toUpperCase()}</strong></h4>}
    {/*If isUser is true render logout button. If not render login button*/}
    {isUser ?
      //Logout button. onCilck Event call logout Auth0 method to end user's session.
      <button type="button" onClick={() => {
        logout({
          returnTo: window.location.origin
        })
      }}>Logout</button> :
      //Login button. onClick event handler call to loginWithRedirect Auth0 method to access platform.
      <button type="button" onClick={loginWithRedirect}>Login</button>
    }
  </Wrapper>;
};

const Wrapper = styled.nav`
  padding: 1.5rem;
  margin-bottom: 4rem;
  background: var(--clr-white);
  text-align: center;
  display: grid;
  grid-template-columns: auto auto 100px;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  h4 {
    margin-bottom: 0;
    font-weight: 400;
  }
  img {
    width: 35px !important;
    height: 35px;
    border-radius: 50%;
    object-fit: cover;
  }
  button {
    background: transparent;
    border: transparent;
    font-size: 1.2rem;
    text-transform: capitalize;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
`;

export default Navbar;
