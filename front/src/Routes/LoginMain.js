import React from 'react';
import styled from 'styled-components';
import Example from '../Components/Carousel';

const Wrapper = styled.div`

`;
const Title = styled.div`
  font-size:30px;
  padding:40px;
`;

const Cont = styled.div`
  padding : 40px;
`;

const loginMain = () => (
  <Wrapper>
    <Example />
    <Title>인기가 많다구</Title>
    <Cont />
  </Wrapper>
);

export default loginMain;
