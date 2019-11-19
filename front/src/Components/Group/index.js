import React, { useState } from 'react';
import PropType from 'prop-types';
import drag from '../Block/Logic/Drag';


const Group = ({ block }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  console.log(block);
  return (
    <g
      onMouseDown={drag(setPosition)}
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
