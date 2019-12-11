import React, { useContext } from 'react';
import styled from 'styled-components';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { CurrentSpriteContext, SpritesContext } from '../../Context';

const SpriteSelectorItem = ({ sprite, spritekey }) => {
  const { setCurrentSprite } = useContext(CurrentSpriteContext);
  const { spritesDispatch } = useContext(SpritesContext);
  const onClickHandler = () => {
    setCurrentSprite({ key: spritekey, position: sprite });
  };
  const onClickCloseButtonHandler = () => {
    spritesDispatch({
      type: 'DELETE_IMAGE',
      key: spritekey,
    });
  };
  return (
    <SpriteContainer onClick={onClickHandler}>
      <CloseWrapper onClick={onClickCloseButtonHandler}>
        <FontAwesomeIcon icon={faTimes} />
      </CloseWrapper>
      <ImageWrapper>
        <Image src={sprite.url} />
      </ImageWrapper>

      <Title>{sprite.name}</Title>
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
  padding-left : 6px;
  overflow: hidden;
  text-overflow: ellipsis;
  color : white;
  white-space : nowrap;
  background-color: #4d97ffdd;
`;

const ImageWrapper = styled.div`
  display : inline-block;
  /* vertical-align : center; */
  text-align:center;
  max-height : 70%;
`;

const CloseWrapper = styled.div`
  position: absolute;
  width : 17px;
  text-align : center;
  left: 89%;
  top: -10%;
  transform : scale(1.2);
  border-radius: 50%;
  border : 1px solid black;
`;
const SpriteContainer = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
  margin-right: 12px;
  padding-bottom: 5px;
  border:  1px solid ${props => props.color || 'black'};
  border-radius: 5px;
  background-color:white;
  display : flex;
  flex-direction : column;
  justify-content: space-between;
  & > .svg-inline--fa.fa-times.fa-w-11 { 
    position: absolute;
   
   
  }

`;

SpriteSelectorItem.propTypes = {
  sprite: PropTypes.object.isRequired,
  spritekey: PropTypes.string.isRequired,
};

export default SpriteSelectorItem;
