import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faStop } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import Canvas from '../Canvas';
import SpriteSelector from '../SpriteSelector';

export default () => {
  const x = useRef(0);
  const y = useRef(0);

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
              ref={x}
            />
            <div> Y</div>
            <input ref={y} />
          </div>
          <div className="setting__row">
            <div> 크기 </div>
            <input />
            <div> 방향 </div>
            <input />
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
