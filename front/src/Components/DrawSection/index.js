/* eslint-disable no-restricted-globals */
import React, { useContext, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faStop } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import Canvas from '../Canvas';
import SpriteSelector from '../SpriteSelector';
import { SpritesContext, WorkspaceContext, CurrentSpriteContext } from '../../Context';
import Generator from '../Block/generator';

let key;
let position;
let dispatch;
let interval;
let isPlay = false;
export const getPosition = () => ({ key, position, dispatch });
const playHandler = (workspace) => {
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

export default () => {
  const { sprites, spritesDispatch } = useContext(SpritesContext);
  const [currentSprite, setCurrentSprite] = useState({
    key: Object.keys(sprites)[0],
    position: Object.values(sprites)[0],
  });
  const { workspace } = useContext(WorkspaceContext);
  dispatch = spritesDispatch;
  ({ key, position } = currentSprite);
  const checkPositionHandler = ({ type, coordinate }, event) => {
    spritesDispatch({
      type,
      coordinate,
      key: currentSprite.key,
      value: event.target.value,
    });
  };
  useEffect(() => {
    setCurrentSprite({
      key: key && sprites[key] ? key : Object.keys(sprites)[0],
      position: key && sprites[key] ? sprites[key] : Object.values(sprites)[0],
    });
  }, [sprites]);
  return (
    <CurrentSpriteContext.Provider value={{ currentSprite, setCurrentSprite }}>
      <DrawSectionWrapper className="Contents__Column">
        <div className="draw-section__row controller">
          <FontAwesomeIcon icon={faPlay} onClick={() => playHandler(workspace)} className="play-button" />
          <FontAwesomeIcon icon={faStop} onClick={stopHandler} className="stop-button" />
        </div>
        <div className="draw-section__row">
          <Canvas />
        </div>
        <div className="draw-section__row">
          <div className="setting">
            <div className="setting__row">
              <div> X </div>
              <input
                value={currentSprite.position.x}
                onChange={checkPositionHandler.bind(null, {
                  type: 'CHANGE_POSITION',
                  coordinate: 'x',
                })}
              />
              <div> Y</div>
              <input
                value={currentSprite.position.y}
                onChange={checkPositionHandler.bind(null, {
                  type: 'CHANGE_POSITION',
                  coordinate: 'y',
                })}
              />
            </div>
            <div className="setting__row">
              <div> 크기 </div>
              <input
                value={currentSprite.position.size}
                onChange={checkPositionHandler.bind(null, {
                  type: 'CHANGE_SIZE',
                })}
              />
              <div> 회전 </div>
              <input
                value={currentSprite.position.direction}
                onChange={checkPositionHandler.bind(null, {
                  type: 'CHANGE_DIRECTION',
                })}
              />
            </div>
            <SpriteSelector />
          </div>
        </div>
      </DrawSectionWrapper>
    </CurrentSpriteContext.Provider>
  );
};

const DrawSectionWrapper = styled.div`
  min-width: 400px;
  .draw-section__row {
    & > div {
      width: 100%;
      height: 100%;
      background-color: white;
      border-radius: 5px;
      border: 1px solid ${props => props.theme.mainBorderColor};
    }
  }
`;
