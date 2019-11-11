import React from 'react';
import Theme from '../Styles/Theme';
const pixel = 6

function EventBlock({ width, stroke, strokeWidth, color }) {
  const d = `M 0,0 
  c ${pixel * 6},-${pixel*4} ${pixel * 14},-${pixel*4} ${pixel * 20},0
  l 0,0 ${pixel * (width - 1)},0
  c ${pixel},0 ${pixel},0 ${pixel},${pixel}
  l 0,0 0,${pixel * 4}
  c 0,${pixel} 0,${pixel} -${pixel},${pixel}
  l 0,0 -${pixel * (width - 1 + 8)},0
  0,0 -${pixel * 2},${pixel * 2}
  0,0 -${pixel * 4},0 
  0,0 -${pixel * 2},-${pixel * 2}
  0,0 -${pixel * 3},0
  c -${pixel},0 -${pixel},0 -${pixel},-${pixel} 
  l 0,0 0,-${pixel * 5}
  `

  return (
    <svg>
      <path stroke={stroke} strokeWidth={strokeWidth} fill={color} d={d} />
    </svg>
  )
}

EventBlock.defaultProps = {
  stroke: Theme.eventBlockBorderColor,
  strokeWidth: 0.5,
  color: Theme.eventBlockColor,
  width: 5
}

export default EventBlock