import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import motion from './Init/Motion';
import { WorkspaceContext } from '../../Context';
import Group from '../Group';
import BlockModelList from './block_model_list';

const position = { x: 75, y: 25 };
const modelspace = new BlockModelList();
export default () => {
  const [isInit, setIsInit] = useState(false);
  const { workspace } = useContext(WorkspaceContext);

  if (!isInit) {
    setIsInit(true);
    motion.forEach((json, idx) => {
      const block = modelspace.addBlock();
      block.makeFromJSON({ ...json, x: position.x, y: (position.y + 75 * idx), motionIndex: idx });
    });
  }

  return (
    <Svg>
      {Object.values(modelspace.blockDB).map(block => (
        <Group
          block={block}
        />
      ))}
      {Object.values(workspace.blockDB).map(block => (
        <Group
          block={block}
        />
      ))}
    </Svg>
  );
};

const Svg = styled.svg`
  position: absolute;
  width: 100%;
  height: 100%;
`;
