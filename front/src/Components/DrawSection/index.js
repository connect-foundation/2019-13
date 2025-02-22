/* eslint-disable no-restricted-globals */
import React, { useContext, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faStop } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import Canvas from '../Canvas';
import SpriteSelector from '../SpriteSelector';
import {
  SpritesContext,
  WorkspaceContext,
  CurrentSpriteContext,
} from '../../context';
import Snackbar from '../Snackbar';
import Utils from '../../utils/utils';
import { start, stop, getIsPlay } from '../../utils/playBlocks';
import { setCanvasSize } from '../../utils/canvasSize';
import useSnackbar from '../../customHooks/useSnackbar';

let key;
let position;
let dispatch;

let allsprites;
const getPosition = () => ({ key, position, dispatch, allsprites });

const playHandler = () => {
  start(true);
};

const stopHandler = () => {
  stop();
};


export default () => {
  setCanvasSize('DEFAULT');
  const isPlay = getIsPlay();
  const { workspaceDispatch } = useContext(WorkspaceContext);
  const [snackbar, setSnackbar] = useSnackbar();
  const { sprites, spritesDispatch } = useContext(SpritesContext);
  const [currentSprite, setCurrentSprite] = useState({
    key: Object.keys(sprites)[0],
    position: Object.values(sprites)[0],
  });
  allsprites = sprites;
  dispatch = spritesDispatch;
  ({ key, position } = currentSprite);

  const checkPositionHandler = ({ type, coordinate }, event) => {
    if (isPlay) return;
    if (!currentSprite.position) {
      setSnackbar({
        ...snackbar,
        open: true,
        message: '이미지를 업로드 해주세요',
        color: 'alertColor',
      });
      return;
    }
    spritesDispatch({
      type,
      coordinate,
      key: currentSprite.key,
      value: event.target.value,
    });
  };
  useEffect(() => {
    Utils.setSprite(getPosition);
    setCurrentSprite({
      key: key && sprites[key] ? key : Object.keys(sprites)[0],
      position: key && sprites[key] ? sprites[key] : Object.values(sprites)[0],
    });
  }, [sprites]);
  return (
    <CurrentSpriteContext.Provider value={{ currentSprite, setCurrentSprite }}>
      <DrawSectionWrapper className="Contents__Column">
        <div className="draw-section__row controller">
          <FontAwesomeIcon
            icon={faPlay}
            onClick={() => playHandler()}
            className="play-button"
          />
          <FontAwesomeIcon
            icon={faStop}
            onClick={(e) => {
              stopHandler(e);
              setSnackbar({
                ...snackbar,
                open: false,
                message: '이미지를 업로드 해주세요',
                color: 'alertColor',
              });
            }}
            className="stop-button"
          />
        </div>
        <div className="draw-section__row">
          <Canvas
            draggable={!getIsPlay()}
            workspaceDispatch={workspaceDispatch}
            setCurrentSprite={setCurrentSprite}
          />
        </div>
        <div className="draw-section__row">
          <div className="setting">
            <div className="setting__name">
              <div> 이름 </div>
              <input
                value={
                  currentSprite.position ? currentSprite.position.name : '입력'
                }
                onChange={checkPositionHandler.bind(null, {
                  type: 'CHANGE_NAME',
                })}
              />
            </div>
            <div className="setting__row">
              <div> X </div>
              <input
                value={currentSprite.position ? currentSprite.position.x : 0}
                onChange={checkPositionHandler.bind(null, {
                  type: 'CHANGE_POSITION',
                  coordinate: 'x',
                })}
              />
              <div> Y</div>
              <input
                value={currentSprite.position ? currentSprite.position.y : 0}
                onChange={checkPositionHandler.bind(null, {
                  type: 'CHANGE_POSITION',
                  coordinate: 'y',
                })}
              />
            </div>
            <div className="setting__row">
              <div> 크기 </div>
              <input
                value={currentSprite.position ? currentSprite.position.size : 0}
                onChange={checkPositionHandler.bind(null, {
                  type: 'CHANGE_SIZE',
                })}
              />
              <div> 방향 </div>
              <input
                value={
                  currentSprite.position ? currentSprite.position.direction : 0
                }
                onChange={checkPositionHandler.bind(null, {
                  type: 'CHANGE_DIRECTION',
                })}
              />
            </div>
            <SpriteSelector />
          </div>
        </div>
      </DrawSectionWrapper>
      <Snackbar snackbar={snackbar} setSnackbar={setSnackbar} />
    </CurrentSpriteContext.Provider>
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
