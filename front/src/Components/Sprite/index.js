import React from 'react';
import styled from 'styled-components';

export default ({ title, sprite }) => (
  <SpriteContainer>
    <Image />
    <Title />
  </SpriteContainer>
);
const Image = styled.img`
    height : 70%;
    
`;
const Title = styled.div`
    height : 30%;
    background-color : white;
`;

const SpriteContainer = styled.div`
  width: 80px;
  height: 80px;
  padding-bottom : 5px;
  border: 1px solid black;
  border-radius: 5px;
`;
