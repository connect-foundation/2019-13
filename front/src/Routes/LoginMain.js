import React from 'react';
import styled from 'styled-components';
import Header from '../Components/Header';


const Wrapper = styled.div`
    margin-top: 100px;
`;

const loginMain = () => (
  <Wrapper>
    <Header isLoggedIn />
    This is loginMain

  </Wrapper>
);

export default loginMain;
