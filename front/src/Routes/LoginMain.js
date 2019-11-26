import React from 'react';
import styled from 'styled-components';
import Example from '../Components/Carousel/index.js'
import Insta from '../Components/InstaCard'
const Wrapper = styled.div`

`;
const Title = styled.div`
  font-size:30px;
  padding:40px;
`

const Cont=styled.div`
  padding : 40px;
`



const loginMain = () => (
  <Wrapper>
    <Example></Example>
    <Title>인기가 많다구</Title>
    <Cont></Cont>
  </Wrapper>
);

export default loginMain;
