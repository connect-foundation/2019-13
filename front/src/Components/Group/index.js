import React, { useState, useContext, useRef, useEffect } from 'react';
import PropType from 'prop-types';
import drag from '../Block/Logic/Drag';
import { WorkspaceContext } from '../../Context';

const Group = ({ block, children }) => {
  let [isMoved, setMoved] = useState(false);
  const [position, setPosition] = useState({ x: block.x, y: block.y });
  if (block.previousElement && position.y !== 36) { setPosition({ x: 0, y: 36 }); }
  const { workspaceDispatch } = useContext(WorkspaceContext);
  const [, setRender] = useState();
  const gRef = useRef();
  useEffect(() => {
    block.render = setRender;
    block.setNode(gRef.current);
  }, []);
  if (block.previousElement) isMoved = true;
  return (
    <g
      data-it={block.id}
      key={block.id}
      ref={gRef}
      onMouseLeave={isMoved ? () => {} : () => {
        workspaceDispatch({
          type: 'DELETE_BLOCK',
          id: block.id,
        });
      }}
      onMouseDown={
          drag({ set: setPosition, block, setMoved })
      }
      transform={`translate(${position.x},${position.y})`}
    >
      {block.path}
      {block.args.map(args => args)}
      {block.nextElement && <Group block={block.nextElement} key={block.nextElement.id} />}
    </g>
  );
};

Group.propTypes = {
  block: PropType.object.isRequired,
};

export default Group;
