import React, { useContext } from 'react';
import styled from 'styled-components';
import DialMenu from '../DialMenu';
import SpriteSelectorItem from '../SpriteSelectorItem';
import { SpritesContext } from '../../Context';

export default () => {
  const { sprites } = useContext(SpritesContext);
  const spriteSelectorItems = Object.entries(sprites);
  return (
    <SpriteContainer>
      {spriteSelectorItems.map((sprite, idx) => (
        <SpriteSelectorItem
          sprite={sprite[1]}
          key={sprite[0]}
          spritekey={sprite[0]}
          idx={idx}
          length={spriteSelectorItems.length}
        />
      ))}
      <DialMenu />
    </SpriteContainer>
  );
};

const SpriteContainer = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  padding: 10px;
  border: 1px solid black;
  border-radius: 10px;
  max-width: 100%;
  min-height: 29.5vh;
  background-color: #e9f1fc;
`;
