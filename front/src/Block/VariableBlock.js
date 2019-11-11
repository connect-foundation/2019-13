import React from 'react';
const pixel = 6

function VariableBlock({ width, stroke, strokeWidth, color }) {
  const d = `M 0,0 
  l 0,0 ${pixel * width},0
  c ${pixel * 4},0 ${pixel * 4},${pixel * 4} 0,${pixel*4}
  l 0,0 -${pixel*width},0
  c -${pixel * 4},0 -${pixel * 4},-${pixel * 4} 0,-${pixel*4}
  `

  return (
    <svg>
      <path stroke={stroke} strokeWidth={strokeWidth} fill={color} d={d} />
    </svg>
  )
}

VariableBlock.defaultProps = {
  stroke: "black",
  strokeWidth: 0.5,
  color: "white",
  width: 2
}

export default VariableBlock