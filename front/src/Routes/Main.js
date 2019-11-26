import React from 'react';
import styled from 'styled-components';
import Example from '../Components/Carousel/index.js'
import InstaCard from '../Components/InstaCard/index.js';
const Wrapper = styled.div`
`;

const RecommendComtainer=styled.div`
  padding:40px;
`

const CardContainer=styled.div`
  display:flex;
  justify-content:space-between;
  padding:40px 0px;
`

const main = () => (
  <Wrapper>
    <Example></Example>
    <RecommendComtainer>
      <h3>이런것도 추천한다구</h3>
      <CardContainer>
          <InstaCard></InstaCard>
          <InstaCard></InstaCard>
          <InstaCard></InstaCard>
      </CardContainer>
    </RecommendComtainer>
    

  </Wrapper>
  
);

export default main;
