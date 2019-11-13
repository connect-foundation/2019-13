import React, { useState } from 'react';
import Theme from '../Styles/Theme';
import mouseHandler from './Logic/Drag';
import path from './Path'

const EventBlock = ({ width, stroke, strokeWidth, color }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const drag = mouseHandler(setPosition)
  const d = path.event(width)

  return (
    <g onMouseDown={drag} transform={`translate(${position.x},${position.y})`}>
      <path stroke={stroke} strokeWidth={strokeWidth} fill={color} d={d} />
    </g>
  )
}

EventBlock.defaultProps = {
  stroke: Theme.eventBlockBorderColor,
  strokeWidth: 0.5,
  color: Theme.eventBlockColor,
  width: 5
}

export default EventBlock