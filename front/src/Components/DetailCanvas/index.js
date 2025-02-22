import React, { useEffect, useReducer } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faStop } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import Canvas from '../Canvas';
import Utils from '../../utils/utils';
import { start, stop } from '../../utils/playBlocks';
import { SpritesContext } from '../../context';
import { spritesReducer } from '../../reducer';
import { setCanvasSize } from '../../utils/canvasSize';
import KeyListener from '../../utils/keyListener';

let dispatch;
let allsprites;
const getPosition = () => ({ dispatch, allsprites });

const DetailCanvas = ({ images }) => {
  setCanvasSize('DETAIL');
  const [sprites, spritesDispatch] = useReducer(spritesReducer, {});
  allsprites = sprites;
  dispatch = spritesDispatch;
  const playHandler = () => {
    start(true);
  };

  const stopHandler = () => {
    stop();
    spritesDispatch({ type: 'LOAD_PROJECT', images });
  };
  useEffect(() => {
    spritesDispatch({ type: 'LOAD_PROJECT', images });
    Utils.setSprite(getPosition);
  }, [images]);
  return (
    <SpritesContext.Provider value={{ sprites, spritesDispatch }}>
      <DrawSectionWrapper className="Contents__Column">
        <Canvas draggable={false} />
      </DrawSectionWrapper>
      <Controller>
        <FontAwesomeIcon
          icon={faPlay}
          onClick={playHandler}
          className="play-button"
        />
        <FontAwesomeIcon
          icon={faStop}
          onClick={stopHandler}
          className="stop-button"
        />
      </Controller>
      <KeyListener />
    </SpritesContext.Provider>
  );
};

const DrawSectionWrapper = styled.div`
  padding : 4px;
  .draw-section__row {
    & > div {
      width: 100%;
      height: 100%;
      background-color: white;
      border-radius: 5px;
      border: 1px solid ${props => props.theme.mainBorderColor};
    }
  }
  .setting {
    padding: 20px;
    margin-top: 5px;
  }
  .setting__row {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 10px;
    div {
      width: 50px;
      text-align: center;
    }
    input {
      width: 60px;
      padding: 5px;
      border-radius: 15px;
      text-align: center;
      border: 1px solid #aaaaaa;
    }
  }
  .setting__name {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 10px;
    div {
      width: 50px;
      text-align: center;
    }
    input {
      width: 280px;
      padding: 5px;
      border-radius: 15px;
      text-align: center;
      border: 1px solid #aaaaaa;
    }
  }
`;

const Controller = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  .play-button {
    color: ${props => props.theme.operatorsColor};
    &:hover {
      color: ${props => props.theme.motionColor};
    }
  }
  .stop-button {
    margin-left: 15px;
    color: grey;
    &:hover {
      color: red;
    }
  }
`;
DetailCanvas.propTypes = {
  images: PropTypes.array.isRequired,
};

export default DetailCanvas;
