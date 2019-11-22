import React, { useState, useContext, useEffect } from 'react';
import motion from './Init/Motion';
import { WorkspaceContext } from '../../Context';
import Group from '../Group';
import GroupBlock from '../GroupModel';
import BlockModelList from './block_model_list';
import CONSTANTS from './constants';

const blockModelList = new BlockModelList();
export default () => {
  const [isInit, setIsInit] = useState(false);
  const { workspace } = useContext(WorkspaceContext);
  const [, setRender] = useState(0);
  if (!isInit) {
    setIsInit(true);
    workspace.setRender = setRender;
    motion.forEach((json, idx) => {
      const block = blockModelList.addBlock(idx);
      block.makeFromJSON({
        ...json,
        x: CONSTANTS.DEFAULT_POSITION.x,
        y: CONSTANTS.DEFAULT_POSITION.y + 75 * idx,
        motionIndex: idx,
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
