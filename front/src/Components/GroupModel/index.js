import React, { useState, useContext, useRef, useEffect } from 'react';

import PropType from 'prop-types';
import copy from '../Block/Logic/Copy';
import { WorkspaceContext } from '../../Context';

const GroupModel = ({ block }) => {
  const [position] = useState({ x: block.x, y: block.y });
  const { workspaceDispatch } = useContext(WorkspaceContext);
  const [, setRender] = useState();
  const gRef = useRef();
  useEffect(() => {
    block.render = setRender;
    block.setNode(gRef.current);
  }, []);
  return (
    <g
      ref={gRef}
      key={block.id}
      onMouseEnter={copy({ workspaceDispatch, motionIndex: block.motionIndex })}
      transform={`translate(${position.x},${position.y})`}
    >
      {block.path}
      {block.args.map(args => args)}
    </g>
  );
};

GroupModel.propTypes = {
  block: PropType.object.isRequired,
};

export default GroupModel;
