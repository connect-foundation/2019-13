import React from 'react';
import styled from 'styled-components';
import Header from '../Components/Header';

const Wrapper = styled.div`
    margin-top: 100px;
`;


const main = () => (
  <Wrapper>
    <Header isLoggedIn={false} />
This is logout main
  </Wrapper>
);

export default main;
