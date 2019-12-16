import React from 'react';
import styled from 'styled-components';
import Carousel from '../Components/Carousel';
import RecommendContainer from '../Components/RecommendContainer';

export default () => (
  <Wrapper>
    <Carousel />
    <RecommendContainer />
  </Wrapper>
);

const Wrapper = styled.div`
`;
