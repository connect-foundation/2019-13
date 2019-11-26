import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { WorkspaceContext } from '../../Context';
import Group from '../Group';
import GroupBlock from '../GroupModel';
import BlockModelList from './block_model_list';
import CONSTANTS from './constants';
import init from './Init';

const blockModelList = new BlockModelList();
export default () => {
  const [isInit, setIsInit] = useState(false);
  const { workspace } = useContext(WorkspaceContext);
  const [, setRender] = useState(0);
  if (!isInit) {
    setIsInit(true);
    workspace.setRender = setRender;
    let idx = 0;
    init.forEach((blocks, allIdx) => {
      blocks.forEach((json, styleIdx) => {
        const block = blockModelList.addBlock(idx);
        block.makeFromJSON({
          ...json,
          x: CONSTANTS.DEFAULT_POSITION.x,
          y: CONSTANTS.DEFAULT_POSITION.y + idx * 100,
          allIdx,
          styleIdx,
        });
        idx += 1;
      });
    });
  }
  return (
    <Svg>
      {Object.values(blockModelList.blockDB).map(block => (
        <GroupBlock block={block} key={block.id} />
      ))}
      {workspace.topblocks.map(block => <Group block={block} key={block.id} />)}
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
