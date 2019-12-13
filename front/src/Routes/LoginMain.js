import React from 'react';
import styled from 'styled-components';
import Carousel from '../Components/Carousel';
import RecommendContainer from '../Components/RecommendContainer';

const Wrapper = styled.div`

`;


const loginMain = () => (
  <Wrapper>
    <Carousel />
    <RecommendContainer />
  </Wrapper>
);

export default loginMain;
