/* eslint-disable no-restricted-globals */
import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faStop } from '@fortawesome/free-solid-svg-icons';
import {  WorkspaceContext } from '../../Context';
import Generator from '../Block/generator';
let interval;
let isPlay = false;
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
  const { workspace } = useContext(WorkspaceContext);
  return (
    <div className="draw-section__row controller">
      <FontAwesomeIcon icon={faPlay} onClick={() => playHandler(workspace)} className="play-button" />
      <FontAwesomeIcon icon={faStop} onClick={stopHadler} className="stop-button" />
    </div>  
  );
};