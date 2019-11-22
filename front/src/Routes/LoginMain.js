import React from 'react';
import styled from 'styled-components';
import Example from '../Components/Carousel/index.js'
import InfiniteCarousel from 'react-leaf-carousel'
import Card from '../Components/Card'
const Wrapper = styled.div`

`;
const Title = styled.div`
  font-size:30px;
  padding:40px;
`

const loginMain = () => (
  <Wrapper>
    <Example></Example>
    <Title>인기가 많다구</Title>

  </Wrapper>
);

export default loginMain;
