/* eslint-disable no-restricted-globals */
import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faStop } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import Canvas from '../Canvas';
import SpriteSelector from '../SpriteSelector';
import { SpritesContext, WorkspaceContext } from '../../Context';
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
      codes.forEach((code, i) => {
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

const stopHadler = () => {
  if (interval) {
    clearInterval(interval);
    isPlay = false;
  }
};

export default () => {
  const { sprites, spritesDispatch } = useContext(SpritesContext);
  const { workspace } = useContext(WorkspaceContext);
  dispatch = spritesDispatch;
  key = Object.keys(sprites)[0];
  position = { ...sprites[key], key };
  const checkPositionHandler = ({ type, coordinate }, event) => {
    spritesDispatch({ type, coordinate, key, value: event.target.value });
  };
  return (
    <DrawSectionWrapper className="Contents__Column">
      <div className="draw-section__row controller">
        <FontAwesomeIcon icon={faPlay} onClick={() => playHandler(workspace)} className="play-button" />
        <FontAwesomeIcon icon={faStop} onClick={stopHadler} className="stop-button" />
      </div>
      <div className="draw-section__row">
        <Canvas />
      </div>
      <div className="draw-section__row">
        <div className="setting">
          <div className="setting__row">
            <div> X </div>
            <input
              pattern="[0-9]*"
              value={position.x}
              onChange={checkPositionHandler.bind(null, { type: 'CHANGE_POSITION', coordinate: 'x' })}
            />
            <div> Y</div>
            <input
              value={position.y}
              onChange={checkPositionHandler.bind(null, { type: 'CHANGE_POSITION', coordinate: 'y' })}
            />
          </div>
          <div className="setting__row">
            <div> 크기 </div>
            <input
              value={position.size}
              onChange={checkPositionHandler.bind(null, { type: 'CHANGE_SIZE' })}
            />
            <div> 회전 </div>
            <input
              value={position.direction}
              onChange={checkPositionHandler.bind(null, { type: 'CHANGE_DIRECTION' })}
            />
          </div>
          <SpriteSelector />
        </div>
      </div>
    </DrawSectionWrapper>
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
