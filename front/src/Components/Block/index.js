import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Scrollbars } from 'react-custom-scrollbars';
import { WorkspaceContext } from '../../Context';
import Group from '../Group';
import GroupBlock from '../GroupModel';
import BlockModelList from './blockmodel_list';
import CONSTANTS from './constants';
import BlockModel from './blockmodel';
import init from './Init';


// const blockModelList = new BlockModelList();
export default ({ degree }) => {
  // const [isInit, setIsInit] = useState(false);
  const { workspace } = useContext(WorkspaceContext);
  const [, setRender] = useState(0);
  const [isMove, setMove] = useState(false);
  const [scrollY, setScrollY] = useState(20);
  const [initY, setInitY] = useState(20);
  const dragStartHandler = (scrollEvent) => {
    setMove(true);
    setInitY(scrollEvent.clientY - scrollEvent.target.getBoundingClientRect().y
    + scrollEvent.target.ownerSVGElement.getBoundingClientRect().y);
  };
  const dragMoveHandler = (scrollEvent) => {
    if (!isMove) return;
    let diff = (scrollEvent.clientY - initY);
    if (diff < 20)diff = 20;
    else if (diff > 670)diff = 670;
    setScrollY(diff);
  };
  const dragEndHandler = (scrollEvent) => {
    if (!isMove) return;
    setMove(false);
  };

  const clickHandler = (scrollEvent) => {
    let currentY = scrollEvent.clientY - scrollEvent.target.getBoundingClientRect().y;
    if (currentY < 20)currentY = 20;
    else if (currentY > 670)currentY = 670;
    setScrollY(currentY);
  };

  // if (!isInit) {
  // setIsInit(true);
  const blockModelList = new BlockModelList();
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
  });
  // }
  return (
    <Svg>
      {[...blockModelList.getBlockDB().values()].map(block => (
        <GroupBlock block={block} key={block.id} />
      ))}
      {workspace.topblocks.map(block => <Group block={block} key={block.id} />)}
      <rect
        width="25"
        height="750"
        fill="rgba(0,0,0,0.1)"
        x="330"
        y="20"
        rx="4"
        ry="4"
        onMouseUp={dragEndHandler}
        onMouseMove={dragMoveHandler}
        onMouseLeave={dragEndHandler}
        onClick={clickHandler}
      />
      <rect
        width="20"
        height="100"
        fill="orange"
        x="332"
        y={scrollY}
        rx="4"
        ry="4"
        onMouseDown={dragStartHandler}
        onMouseUp={dragEndHandler}
        onMouseMove={dragMoveHandler}
      />
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
