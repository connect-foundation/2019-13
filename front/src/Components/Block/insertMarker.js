import React, { useState, useEffect } from 'react';
import CONSTANTS from './constants';
import workspaceList from './workspaceList';
import color from '../../Styles/Theme';

const InsertMarker = () => {
  const [typeAndPos, setTypeAndPos] = useState({ type: 'single', x: 0, y: 0 });
  const d = typeAndPos.type !== 'variable' && typeAndPos.type !== 'condition' ? `
  M 0,0
  l 0,0 ${CONSTANTS.PIXEL * 1},${CONSTANTS.PIXEL * 1}
  0,0 ${CONSTANTS.PIXEL * 2},0
  0,0 ${CONSTANTS.PIXEL * 1},-${CONSTANTS.PIXEL * 1}
  0,0 -${CONSTANTS.PIXEL * 4},0
  ` : `
  M ${CONSTANTS.PIXEL * 4},0
  c -${CONSTANTS.PIXEL * 2},0 -${CONSTANTS.PIXEL * 2},${CONSTANTS.PIXEL * 4} 0,${CONSTANTS.PIXEL * 4}
  l 0,0 0,-${CONSTANTS.PIXEL * 4}
  `;
  useEffect(() => {
    workspaceList.setInsertMarker = setTypeAndPos;
  }, []);
  return (
    <>
      <path
        id="marker"
        transform={`translate(${typeAndPos.x},${typeAndPos.y})`}
        d={d}
        fill={color.alertColor}
        visibility={typeAndPos.x > CONSTANTS.DELETE_AREA_X ? 'visible' : 'hidden'}
      />
      <use xlinkHref="#marker" />
    </>
  );
};

export default InsertMarker;
