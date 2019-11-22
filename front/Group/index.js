import React, { useState, useRef, useEffect } from 'react';
import drag from '../Block/Logic/Drag';

const Group = ({ block, children }) => {
  const [position, setPosition] = useState({ x: block.x, y: block.y });
  if (block.previousElement && position.y !== 36) { setPosition({ x: 0, y: 36 }); }
  const [, setRender] = useState();
  const gRef = useRef();
  useEffect(() => {
    block.render = setRender;
    block.setNode(gRef.current);
  }, []);
  return (
    <g
      ref={gRef}
      onMouseDown={
          drag({ set: setPosition, block })
      }
      transform={`translate(${position.x},${position.y})`}
    >
      {block.path}
      {block.args.map(args => args)}
      {block.nextElement && <Group block={block.nextElement} key={block.nextElement.id} />}
    </g>
  );
};

export default Group;
