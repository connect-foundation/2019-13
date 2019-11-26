import React, { useState } from 'react';
import styled from 'styled-components';
import DialMenu from '../DialMenu';
import Sprite from '../Sprite';

export default () => {
  const [test, setTest] = useState(null);
  return (
    <SpriteContainer>
      <Sprite />
      <DialMenu />
    </SpriteContainer>
  );
};

const SpriteContainer = styled.div`
  padding: 10px;
  border: 1px solid black;
  border-radius: 10px;
  width: 100%;
  height: 400px;
  background-color: #e9f1fc;
`;
