import React from 'react';
import styled from 'styled-components';
import Card from './Card';
import Followers from './Followers';

//User information row.
const User = () => {
  return <section className='section'>
    <Wrapper className='section-center'>
      {/*User's card info*/}
      <Card />
      {/*User's followers*/}
      <Followers />
    </Wrapper>
  </section>;
};

const Wrapper = styled.div`
  padding-top: 2rem;
  display: grid;
  gap: 3rem 2rem;
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
  /* align-items: start; */
`;

export default User;
