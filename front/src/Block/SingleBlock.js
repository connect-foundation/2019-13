import React, { useState } from 'react';
import mouseHandler from './Logic/Drag';
import path from './Path'

function SingleBlock({ width, stroke, strokeWidth, color }) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const drag = mouseHandler(setPosition)
  const d = path.single(width)
  
  return (
    <g onMouseDown={drag} transform={`translate(${position.x},${position.y})`}>
      <path stroke={stroke} strokeWidth={strokeWidth} fill={color} d={d} />
    </g>
  )
}

SingleBlock.defaultProps = {
  stroke: "black",
  strokeWidth: 0.5,
  color: "white",
  width: 14
}

export default SingleBlock