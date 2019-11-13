import React, { useState } from 'react';
import Theme from '../Styles/Theme';
import mouseHandler from './Logic/Drag';
import path from './Path'

function DoubleBlock({ theme, width, height, stroke, strokeWidth, color }) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const drag = mouseHandler(setPosition)
  const d = path.double(width, height)

  return (
    <g onMouseDown={drag} transform={`translate(${position.x},${position.y})`}>
      <path stroke={stroke} strokeWidth={strokeWidth} fill={color} d={d} />
    </g>
  )
}

DoubleBlock.defaultProps = {
  stroke: Theme.controlBlockBorderColor,
  strokeWidth: 0.5,
  color: Theme.controlBlockColor,
  width: 14,
  height: 2
}

export default DoubleBlock