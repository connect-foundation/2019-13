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
  const dragEndHandler = () => {
    if (!isMove) return;
    setMove(false);
  };

  const clickHandler = (scrollEvent) => {
    let currentY = scrollEvent.clientY - scrollEvent.target.getBoundingClientRect().y;
    if (currentY < 20)currentY = 20;
    else if (currentY > 670)currentY = 670;
    setScrollY(currentY);
  };

  const wheelSVG = (events) => {
    const newY = scrollY + events.deltaY;
    if (newY < 20 || newY > 670) return;
    setScrollY(newY);
  };

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
    <Svg onWheel={wheelSVG}>
      {isMove ? null
        : (
          <rect
            width="500"
            height="800"
            fill="rgba(0,0,0,0)"
            x="0"
            y="0"
            rx="4"
            ry="4"
            onMouseUp={dragEndHandler}
            onMouseMove={dragMoveHandler}
            onMouseLeave={dragEndHandler}
            onClick={clickHandler}
          />
        )
      }
      {[...blockModelList.getBlockDB().values()].map(block => (
        <GroupBlock block={block} key={block.id} scrollY={scrollY} />
      ))}
      {workspace.topblocks.map(block => <Group block={block} key={block.id} x={500} scroll={isMove} />)}
      {!isMove ? null
        : (
          <rect
            width="500"
            height="800"
            fill="rgba(0,0,0,0)"
            x="0"
            y="0"
            rx="4"
            ry="4"
            onMouseUp={dragEndHandler}
            onMouseMove={dragMoveHandler}
            onMouseLeave={dragEndHandler}
            onClick={clickHandler}
          />
        )}

      <rect
        width="20"
        height="100"
        fill={isMove ? Theme.duckOrangeColor : Theme.unactivedColor}
        x="320"
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
