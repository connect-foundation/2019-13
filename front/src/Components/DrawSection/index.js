import React, { useState, useRef, useContext, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faStop } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import Canvas from '../Canvas';
import SpriteSelector from '../SpriteSelector';
import { SpriteCoordinateContext } from '../../Context';

export default () => {
  const { sprites } = useContext(SpriteCoordinateContext);
  const [position, setPosition] = useState(sprites[Object.keys(sprites)[0]]);
  const checkPositionHandler = ({ type }, event) => {
    let inputEl = 0;
    if (!isNaN(Number(event.target.value))) {
      inputEl = Number(event.target.value);
    }
    position[type] = inputEl;
    setPosition({ ...position });
  };
  return (
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
              pattern="[0-9]*"
              value={position.x}
              onChange={checkPositionHandler.bind(null, { type: 'x' })}
            />
            <div> Y</div>
            <input
              value={position.y}
              onChange={checkPositionHandler.bind(null, { type: 'y' })}
            />
          </div>
          <div className="setting__row">
            <div> 크기 </div>
            <input
              value={position.size}
              onChange={checkPositionHandler.bind(null, { type: 'size' })}
            />
            <div> 방향 </div>
            <input
              value={position.direction}
              onChange={checkPositionHandler.bind(null, { type: 'direction' })}
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
`;
