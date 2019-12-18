import React, { useContext, useState, useEffect, useReducer } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faStop } from '@fortawesome/free-solid-svg-icons';
import Canvas from './Canvas';
import Utils from '../utils/utils';
import { start, stop } from '../utils/playBlocks';
import { SpritesContext } from '../Context';
import { spritesReducer } from '../reducer';

let dispatch;
let allsprites;
const WIDTH = 840;
const HEIGHT = 470;

const playHandler = () => {
  start(true);
};

const stopHandler = () => {
  stop();
};
const getPosition = () => ({ dispatch, allsprites });

export default ({ blocks, images }) => {
  const [sprites, spritesDispatch] = useReducer(spritesReducer, {});
  allsprites = sprites;
  dispatch = spritesDispatch;
  useEffect(() => {
    spritesDispatch({ type: 'LOAD_PROJECT', images });
    Utils.setSprite(getPosition);
  }, []);

  return (
    <SpritesContext.Provider value={{ sprites, spritesDispatch }}>
      <DrawSectionWrapper className="Contents__Column">
        <Canvas WIDTH={WIDTH} HEIGHT={HEIGHT} draggable="false" />
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
        <span>아직 미완성(테스트 중)입니다.</span>
      </Controller>
    </SpritesContext.Provider>
  );
};

const DrawSectionWrapper = styled.div`
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
