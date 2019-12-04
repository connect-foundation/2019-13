import React from 'react';
import styled from 'styled-components';

export default ({ sprite }) => (
  <SpriteContainer>
    <Image src={sprite.url} />
    <Title>{sprite.url}</Title>
  </SpriteContainer>
);
const Image = styled.img`
  height: 70%;
  transform:translate(25%, 0%);
`;
const Title = styled.div`
  height: 30%;
  background-color: white;
  overflow:hidden;
  text-overflow:ellipsis;
`;

const SpriteContainer = styled.div`
  width: 80px;
  height: 80px;
  padding-bottom: 5px;
  border: 1px solid black;
  border-radius: 5px;
  background-color:white;
`;
