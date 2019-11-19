import React, { useState } from 'react';
import styled from 'styled-components';
import drag from './Logic/Drag';
import motion from './Init/Motion';
import Workspace from './workspace';

export default () => {
  const [isInit, setIsInit] = useState(false);
  const [workspace] = useState(new Workspace());
  const blocks = [];

  if (!isInit) {
    setIsInit(true);
    motion.forEach((json) => {
      const block = workspace.addBlock();
      block.makeFromJSON(json);
    });
  }

  Object.values(workspace.blockDB).forEach((block) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const g = React.createElement(
      'g',
      {
        onMouseDown: drag(setPosition),
        transform: `translate(${position.x},${position.y})`,
        key: block.id,
      },
      block.path,
      ...block.args,
    );
    blocks.push(g);
  });

  return (
    <Svg>
      {blocks.map(block => block)}
    </Svg>
  );
};

const Svg = styled.svg`
  position: absolute;
  width: 100%;
  height: 100%;
`;
