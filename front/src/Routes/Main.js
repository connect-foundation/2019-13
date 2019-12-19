import React from 'react';
import styled from 'styled-components';
import Carousel from '../Components/Carousel';
import RecommendContainer from '../Components/RecommendContainer';
import Footer from '../Components/Footer';


const Main = () => (
  <>
    <Wrapper>
      <Carousel />
      <RecommendContainer />
    </Wrapper>
    <Footer />
  </>
);

const Wrapper = styled.div`
  min-height: ${props => props.theme.footerPageMinHeight};
`;

export default Main;
