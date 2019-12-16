import React, { useContext, useState, useEffect, useReducer } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faStop } from '@fortawesome/free-solid-svg-icons';
import Canvas from './Canvas';
import { CurrentSpriteContext, SpritesContext } from '../Context';
import { spritesReducer } from '../reducer';
import Generator from './Block/generator';
import Utils from '../utils/utils';
import Workspace from './Block/workspace';
import makeBlock from '../utils/makeBlock';

let key;
let position;
let dispatch;
let isPlay;
let interval;

const defaultSprite = {};
defaultSprite[Utils.uid()] = {
  name: 'logo.png',
  url: '/logo.png',
  size: 100,
  direction: 90,
  x: 0,
  y: 0,
  reversal: false,
  realName: '/logo.png',
};

const WIDTH = 840;
const HEIGHT = 470;
const getPosition = () => ({ key, position, dispatch });

export default ({ blocks }) => {
  const [workspace] = useState(new Workspace());
  const [sprites, spritesDispatch] = useReducer(
    spritesReducer,
    defaultSprite,
  );
  const [currentSprite, setCurrentSprite] = useState({
    key: Object.keys(sprites)[0],
    position: Object.values(sprites)[0],
  });
  const playHandler = () => {
    if (!isPlay) {
      const generator = new Generator();
      const codes = generator.workspaceToCode(workspace.getStartBlocks());
      isPlay = true;
      interval = setInterval(() => {
        let isEnd = true;
        codes.forEach((code) => {
          const res = code.func.next();
          if (res && !res.done) {
            isEnd = false;
          }
        });
        if (isEnd) {
          clearInterval(interval);
          isPlay = false;
        }
      }, 1000 / 30);
    }
  };

  const stopHandler = () => {
    if (interval) {
      clearInterval(interval);
      isPlay = false;
    }
  };

  dispatch = spritesDispatch;
  ({ key, position } = currentSprite);

  useEffect(() => {
    setCurrentSprite({
      key: key && sprites[key] ? key : Object.keys(sprites)[0],
      position: key && sprites[key] ? sprites[key] : Object.values(sprites)[0],
    });
  }, [sprites]);

  useEffect(() => {
    makeBlock(blocks, workspace);
    Utils.setPostion(getPosition);
  }, []);

  return (
    <SpritesContext.Provider value={{ sprites, spritesDispatch }}>
      <CurrentSpriteContext.Provider value={{ currentSprite, setCurrentSprite }}>
        <DrawSectionWrapper className="Contents__Column">
          <Canvas WIDTH={WIDTH} HEIGHT={HEIGHT} />
        </DrawSectionWrapper>
        <Controller>
          <FontAwesomeIcon icon={faPlay} onClick={playHandler} className="play-button" />
          <FontAwesomeIcon icon={faStop} onClick={stopHandler} className="stop-button" />
          <span>아직 미완성(테스트 중)입니다.</span>
        </Controller>
      </CurrentSpriteContext.Provider>
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
      color: ${props => props.theme.motionColor}
    }
  }
  .stop-button {
    margin-left: 15px;
    color: grey;
    &:hover {
      color : red;
    }
  }
`;
