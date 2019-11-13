import React, { useState } from 'react';
import Theme from '../Styles/Theme';
import mouseHandler from './Logic/Drag';
import path from './Path'

const TripleBlock = ({ width, firstHeight, secondHeight, stroke, strokeWidth, color }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const drag = mouseHandler(setPosition)
  const d = path.triple(width, firstHeight, secondHeight)

  return (
    <g onMouseDown={drag} transform={`translate(${position.x},${position.y})`}>
      <path stroke={stroke} strokeWidth={strokeWidth} fill={color} d={d} />
    </g>
  )
}

TripleBlock.defaultProps = {
  stroke: Theme.controlBlockBorderColor,
  strokeWidth: 0.5,
  color: Theme.controlBlockColor,
  width: 14,
  firstHeight: 2,
  secondHeight: 2
}

export default TripleBlock