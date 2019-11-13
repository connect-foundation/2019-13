import React, { useState } from 'react';
import mouseHandler from './Logic/Drag';
import path from './Path'

const VariableBlock = ({ width, stroke, strokeWidth, color }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const drag = mouseHandler(setPosition)
  const d = path.variable(width)

  return (
    <g onMouseDown={drag} transform={`translate(${position.x},${position.y})`}>
      <path stroke={stroke} strokeWidth={strokeWidth} fill={color} d={d} />
    </g>
  )
}

VariableBlock.defaultProps = {
  stroke: "black",
  strokeWidth: 0.5,
  color: "white",
  width: 2
}

export default VariableBlock