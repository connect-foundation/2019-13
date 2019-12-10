import React, { useState, useContext, useRef, useEffect } from 'react';

import PropType from 'prop-types';
import copy from '../Block/Logic/Copy';
import { WorkspaceContext } from '../../Context';

const GroupModel = ({ block, scrollY }) => {
  const [position] = useState({ x: block.x, y: block.y });
  const { workspaceDispatch } = useContext(WorkspaceContext);
  const [, setRender] = useState();
  const gRef = useRef();
  useEffect(() => {
    // eslint-disable-next-line
    block.render = setRender;
    block.setNode(gRef.current);
  }, [block]);
  return (
    <g
      ref={gRef}
      key={block.id}
      onMouseEnter={copy({ workspaceDispatch, allIdx: block.allIdx, styleIdx: block.styleIdx })}
      transform={`translate(${position.x},${position.y - scrollY})`}
    >
      {block.path}
      {block.args.map(args => args)}
    </g>
  );
};

GroupModel.propTypes = {
  block: PropType.object.isRequired,
  scrollY: PropType.number.isRequired,
};

export default GroupModel;
