import React, { useState } from 'react';
import mouseHandler from './Logic/Drag';
import path from './Path'

function ConditionBlock({ width, stroke, strokeWidth, color }) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const drag = mouseHandler(setPosition)
  const d = path.condition(width)

  return (
    <g onMouseDown={drag} transform={`translate(${position.x},${position.y})`}>
      <path stroke={stroke} strokeWidth={strokeWidth} fill={color} d={d} />
    </g>
  )
}

ConditionBlock.defaultProps = {
  stroke: "black",
  strokeWidth: 0.5,
  color: "white",
  width: 5
}

export default ConditionBlock