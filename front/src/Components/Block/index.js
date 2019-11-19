import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import motion from './Init/Motion';
import { WorkspaceContext } from '../../Context';
import Group from '../Group';

export default () => {
  const [isInit, setIsInit] = useState(false);
  const { workspace } = useContext(WorkspaceContext);

  if (!isInit) {
    setIsInit(true);
    motion.forEach((json) => {
      const block = workspace.addBlock();
      block.makeFromJSON(json);
    });
  }

  return (
    <Svg>
      {Object.values(workspace.blockDB).map(block => (
        <Group block={block} />
      ))}
    </Svg>
  );
};

const Svg = styled.svg`
  position: absolute;
  width: 100%;
  height: 100%;
`;
