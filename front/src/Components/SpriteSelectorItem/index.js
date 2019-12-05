import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { CurrentSpriteContext } from '../../Context';

export default ({ sprite, spritekey }) => {
  const { currentSprite, setCurrentSprite } = useContext(CurrentSpriteContext);
  const [isclicked, setClicked] = useState(false);
  const onClickHandler = () => {
    setCurrentSprite({ key: spritekey, position: sprite });
  };
  return (
    <SpriteContainer onClick={onClickHandler}>
      <ImageWrapper>
        <Image src={sprite.url} />
      </ImageWrapper>
      <Title>{sprite.url}</Title>
    </SpriteContainer>
  );
};
const Image = styled.img`
  max-width : 100%;
  max-height : 100%;
`;
const Title = styled.div`
  height: 30%;
  background-color: white;
  overflow:hidden;
  text-overflow:ellipsis;
`;

const ImageWrapper = styled.div`
  display : inline-block;
  /* vertical-align : center; */
  text-align:center;
  max-height : 70%;
`;

const SpriteContainer = styled.div`
  width: 80px;
  height: 80px;
  margin-right: 10px;
  padding-bottom: 5px;
  border:  1px solid ${props => props.color || 'black'};
  border-radius: 5px;
  background-color:white;
  display : flex;
  flex-direction : column;
  justify-content: space-between;
  

`;
