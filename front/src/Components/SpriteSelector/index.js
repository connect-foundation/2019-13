import React, { useContext } from 'react';
import styled from 'styled-components';
import DialMenu from '../DialMenu';
import SpriteSelectorItem from '../SpriteSelectorItem';
import { SpritesContext } from '../../Context';

export default () => {
  const { sprites } = useContext(SpritesContext);
  console.log(sprites);
  return (
    <SpriteContainer>
      {Object.entries(sprites).map(sprite => <SpriteSelectorItem sprite={sprite[1]} key={sprite[0]} />)}
      <DialMenu />
    </SpriteContainer>
  );
};

const SpriteContainer = styled.div`
  position : relative;
  display : inline-flex;
  flex-wrap: wrap;
  padding: 10px;
  border: 1px solid black;
  border-radius: 10px;
  width: 100%;
  height: 300px;
  background-color: #e9f1fc;
`;
