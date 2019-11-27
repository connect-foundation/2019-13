import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { WorkspaceContext } from '../../Context';
import Group from '../Group';
import GroupBlock from '../GroupModel';
import BlockModelList from './blockmodel_list';
import CONSTANTS from './constants';
import BlockModel from './blockmodel';
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
        const blockModel = new BlockModel(idx).makeFromJSON({
          ...json,
          x: CONSTANTS.DEFAULT_POSITION.x,
          y: CONSTANTS.DEFAULT_POSITION.y + idx * 100,
          allIdx,
          styleIdx,
        });
        idx += 1;
        blockModelList.addBlock(blockModel);
      });
      blockModelList.addBlock(blockModel);
    });
  }
  return (
    <Svg>
      {[...blockModelList.getBlockDB().values()].map(block => (
        <GroupBlock block={block} key={block.id} />
      ))}
      {workspace.topblocks.map(block => <Group block={block} key={block.id} />)}
    </Svg>
  );
};

const Svg = styled.svg`
  position: absolute;
  width: 70%;
  height: 70%;
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
