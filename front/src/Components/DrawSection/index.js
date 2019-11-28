/* eslint-disable no-restricted-globals */
import React, { useContext, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faStop } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import Canvas from '../Canvas';
import SpriteSelector from '../SpriteSelector';
import { SpritesContext, CurrentSpriteContext } from '../../Context';

let key;
let position;
let dispatch;
export const getPosition = () => ({ key, position, dispatch });

export default () => {
  const { sprites, spritesDispatch } = useContext(SpritesContext);

  const [currentSprite, setCurrentSprite] = useState({
    key: Object.keys(sprites)[0],
    position: { ...sprites[Object.keys(sprites)[0]] },
  });
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
    setCurrentSprite({ key, position });
  }, [sprites]);
  return (
    <CurrentSpriteContext.Provider value={{ currentSprite, setCurrentSprite }}>
      <DrawSectionWrapper className="Contents__Column">
        <div className="draw-section__row controller">
          <FontAwesomeIcon icon={faPlay} className="play-button" />
          <FontAwesomeIcon icon={faStop} className="stop-button" />
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
