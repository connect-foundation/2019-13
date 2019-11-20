import React, { useState, useRef, useEffect } from 'react';
import PropType from 'prop-types';
import drag from '../Block/Logic/Drag';


const Group = ({ block }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
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
