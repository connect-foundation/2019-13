import React, { useState, useContext, useRef, useEffect } from 'react';

import PropType from 'prop-types';
import copy from '../Block/Logic/Copy';
import drag from '../Block/Logic/Drag';
import { WorkspaceContext } from '../../Context';

const Group = ({ block }) => {
  const [isModel, setModel] = useState(true);
  const [position, setPosition] = useState({ x: block.x, y: block.y });
  const { workspaceDispatch } = useContext(WorkspaceContext);
  const [, setRender] = useState();
  const gRef = useRef();
  useEffect(() => {
    block.render = setRender;
    block.setNode(gRef.current);
  }, []);
  return (
    <g
      key={block.id}
      ref={gRef}
      onMouseDown={
        isModel
          ? copy({
            dispatch: workspaceDispatch,
            motionIndex: block.motionIndex,
            setModel,
            setPosition,
          })
          : drag(setPosition)
      }
      transform={`translate(${position.x},${position.y})`}
    >
      {block.path}
      {block.args.map(args => args)}
    </g>
  );
};

Group.propTypes = {
  block: PropType.object.isRequired,
};

export default Group;
