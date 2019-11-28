import React, { useState, useContext, useRef, useEffect } from 'react';
import PropType from 'prop-types';
import drag from '../Block/Logic/Drag';
import { WorkspaceContext } from '../../Context';
import CONSTANTS from '../Block/constants';

const Group = ({ block, x }) => {
  // eslint-disable-next-line
  let [isMoved, setMoved] = useState(true);
  const [position, setPosition] = useState({ x: block.x, y: block.y });
  if (block.previousElement && position.y !== block.previousElement.height - CONSTANTS.PIXEL) {
    setPosition({ x: 0, y: block.previousElement.height - CONSTANTS.PIXEL });
  }
  if (block.parentElement && position.y !== CONSTANTS.BLOCK_HEAD_HEIGHT) {
    setPosition({ x: CONSTANTS.PREVIOUS_NEXT_POS_X, y: CONSTANTS.BLOCK_HEAD_HEIGHT });
  }
  const { workspaceDispatch } = useContext(WorkspaceContext);
  const [, setRender] = useState();
  const gRef = useRef();
  useEffect(() => {
    // eslint-disable-next-line
    block.render = setRender;
    block.setNode(gRef.current);
  }, []);
  return (
    <g
      data-id={block.id}
      key={block.id}
      ref={gRef}
      onMouseLeave={isMoved ? () => {} : () => {
        workspaceDispatch({
          type: 'DELETE_BLOCK',
          id: block.id,
        });
      }}
      onMouseDown={
          drag({ set: setPosition, block, setMoved, x, workspaceDispatch })
      }
      transform={`translate(${position.x},${position.y})`}
    >
      {block.path}
      {block.args.map(args => args)}
      {block.firstchildElement
      && <Group block={block.firstchildElement} key={block.firstchildElement.id} />}
      {block.secondchildElement
      && <Group block={block.secondchildElement} key={block.secondchildElement.id} />}
      {block.nextElement && <Group block={block.nextElement} key={block.nextElement.id} />}
    </g>
  );
};

Group.propTypes = {
  block: PropType.object.isRequired,
};

export default Group;
