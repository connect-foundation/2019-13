import React, { useState, useContext } from 'react';
import PropType from 'prop-types';
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
const yArray = [];
let previousClickedButton = 0;

const Blocks = ({ clickedButton }) => {
  const [isInit, setIsInit] = useState(false);
  const { workspace, workspaceDispatch } = useContext(WorkspaceContext);
  const [, setRender] = useState(0);
  const [isMove, setMove] = useState(false);
  const [scrollY, setScrollY] = useState(CONSTANTS.SCROLL_MINIMUM);
  const [initY, setInitY] = useState(CONSTANTS.SCROLL_MINIMUM);
  if (yArray.length > 0 && previousClickedButton !== clickedButton) {
    if (scrollY !== yArray[parseInt(clickedButton, 10)]) {
      previousClickedButton = clickedButton;
      setScrollY(yArray[parseInt(clickedButton, 10)]);
    }
  }
  const dragStartHandler = (scrollEvent) => {
    setMove(true);
    setInitY(scrollEvent.clientY - scrollEvent.target.getBoundingClientRect().y
    + scrollEvent.target.ownerSVGElement.getBoundingClientRect().y);
  };
  const dragMoveHandler = (scrollEvent) => {
    if (!isMove) return;
    let diff = (scrollEvent.clientY - initY);
    if (diff < CONSTANTS.SCROLL_MINIMUM)diff = CONSTANTS.SCROLL_MINIMUM;
    else if (diff > CONSTANTS.SCROLL_MAXIMUM)diff = CONSTANTS.SCROLL_MAXIMUM;
    workspaceDispatch({ type: 'SCROLL_END' });
    setScrollY(diff);
  };
  const dragEndHandler = () => {
    if (!isMove) return;
    setMove(false);
  };

  const clickHandler = (scrollEvent) => {
    let currentY = scrollEvent.clientY - scrollEvent.target.getBoundingClientRect().y;
    if (currentY < CONSTANTS.SCROLL_MINIMUM)currentY = CONSTANTS.SCROLL_MINIMUM;
    else if (currentY > CONSTANTS.SCROLL_MAXIMUM)currentY = CONSTANTS.SCROLL_MAXIMUM;
    setScrollY(currentY);
  };

  const wheelSVG = (events) => {
    let newY = scrollY + events.deltaY;
    if (newY < CONSTANTS.SCROLL_MINIMUM)newY = CONSTANTS.SCROLL_MINIMUM;
    else if (newY > CONSTANTS.SCROLL_MAXIMUM)newY = CONSTANTS.SCROLL_MAXIMUM;
    workspaceDispatch({ type: 'SCROLL_END' });
    setScrollY(newY);
  };

  if (!isInit) {
    setIsInit(true);
    workspace.setRender = setRender;
    let idx = 0;
    let { y } = CONSTANTS.DEFAULT_POSITION;
    init.forEach((blocks, allIdx) => {
      yArray.push(y - 3);
      blocks.forEach((json, styleIdx) => {
        const blockModel = new BlockModel(idx).makeFromJSON({
          ...json,
          x: CONSTANTS.DEFAULT_POSITION.x,
          y,
          allIdx,
          styleIdx,
        });
        idx += 1;
        switch (json.style) {
          case 'double':
            y += 100;
            break;
          case 'variable':
          case 'condition':
            y += 35;
            break;
          default:
            y += 50;
        }
        blockModelList.addBlock(blockModel);
      });
    });
  }
  return (
    <Svg onWheel={wheelSVG} transform={`translate(${CONSTANTS.BUTTON_AREA_WIDTH},0)`}>
      {isMove ? null
        : (
          <rect
            width="300"
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
      {workspace.topblocks.map(block => <Group block={block} key={block.id} scroll={isMove} />)}
      {!isMove ? null
        : (
          <rect
            width="300"
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
        x="275"
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

Blocks.propTypes = {
  clickedButton: PropType.number.isRequired,
};

const Svg = styled.svg`
  position: absolute;
  width: 70%;
  height: 84%;
  g {
    cursor: grab;
    &:active {
      cursor: grabbing;
    }
  }
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
      font-size: 8px;
      &:focus {
        outline: none;
      }
    }
  }
`;

export default Blocks;
