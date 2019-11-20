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
        <Group block={block} key={block.id} />
      ))}
    </Svg>
  );
};

const Svg = styled.svg`
  position: absolute;
  width: 100%;
  height: 100%;
  text {
    font-size: 12px;
    fill: white;
    pointer-events: none;
    user-select: none;
  }
  foreignObject {
    width: 30px;
    height: 30px;
    input {
      width: 30px;
      height: 20px;
      border-radius: 18px;
      text-align: center;
      border: none;
      padding: 0;
      font-size: 0.5rem;
      &:focus {
        outline: none;
      }
    }
  }
`;
