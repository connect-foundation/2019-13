import React from 'react';
const pixel = 6

function ConditionBlock({ width, stroke, strokeWidth, color }) {
  const d = `M 0,0 
  l 0,0 ${pixel * width},0
  0,0 ${pixel * 2},${pixel * 2}
  0,0 -${pixel * 2},${pixel * 2}
  0,0 -${pixel*width},0
  0,0 -${pixel * 2},-${pixel * 2}
  0,0 ${pixel * 2},-${pixel * 2}
  `

  return (
    <svg>
      <path stroke={stroke} strokeWidth={strokeWidth} fill={color} d={d} />
    </svg>
  )
}

ConditionBlock.defaultProps = {
  stroke: "black",
  strokeWidth: 0.5,
  color: "white",
  width: 5
}

export default ConditionBlock