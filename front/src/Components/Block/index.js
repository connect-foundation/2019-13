import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { WorkspaceContext } from '../../Context';
import Group from '../Group';
import GroupBlock from '../GroupModel';
import BlockModelList from './blockmodel_list';
import CONSTANTS from './constants';
import BlockModel from './blockmodel';
import init from './Init';
import Theme from '../../Styles/Theme';

const blockModelList = new BlockModelList();


export default () => {
  const [isInit, setIsInit] = useState(false);
  const { workspace, workspaceDispatch } = useContext(WorkspaceContext);
  const [, setRender] = useState(0);
  const [isMove, setMove] = useState(false);
  const [scrollY, setScrollY] = useState(20);
  const [initY, setInitY] = useState(20);

  if (!isInit) {
    setIsInit(true);
    workspace.setRender = setRender;
    let idx = 0;
    let { y } = CONSTANTS.DEFAULT_POSITION;
    init.forEach((blocks, allIdx) => {
      blocks.forEach((json, styleIdx) => {
        const blockModel = new BlockModel(idx).makeFromJSON({
          ...json,
          x: CONSTANTS.DEFAULT_POSITION.x,
          y,
          allIdx,
          styleIdx,
        });
        idx += 1;
        y += (json.style === 'double' ? 100 : 50);
        blockModelList.addBlock(blockModel);
      });
    });
  }
  return (
    <Svg transform="translate(60,0)">
      {[...blockModelList.getBlockDB().values()].map(block => (
        <GroupBlock block={block} key={block.id} scrollY={scrollY} />
      ))}
      {workspace.topblocks.map(block => <Group block={block} key={block.id} scroll={isMove} />)}
    </Svg>
  );
};


const Svg = styled.svg`
  position: absolute;
  width: 70%;
  height: 84%;
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
