import React from 'react';
const pixel = 6

function SingleBlock({ width, stroke, strokeWidth, color }) {
  const d = `M ${pixel},0 
  l 0,0 ${pixel * 3},0 
  0,0 ${pixel * 2},${pixel * 2}
  0,0 ${pixel * 4},0 
  0,0 ${pixel * 2},-${pixel * 2}
  0,0 ${pixel * (width - 1)},0 
  c ${pixel},0 ${pixel},0 ${pixel},${pixel}
  l 0,0 0,${pixel * 4}
  c 0,${pixel} 0,${pixel} -${pixel},${pixel}
  l 0,0 -${pixel * (width - 1)},0 
  0,0 -${pixel * 2},${pixel * 2}
  0,0 -${pixel * 4},0 
  0,0 -${pixel * 2},-${pixel * 2}
  0,0 -${pixel * 3},0
  c -${pixel},0 -${pixel},0 -${pixel},-${pixel} 
  l 0,0 0,-${pixel * 4}
  c 0,-${pixel} 0,-${pixel} ${pixel},-${pixel}`

  return (
    <svg>
      <path stroke={stroke} strokeWidth={strokeWidth} fill={color} d={d} />
    </svg>
  )
}

SingleBlock.defaultProps = {
  stroke: "black",
  strokeWidth: 0.5,
  color: "white",
  width: 14
}

export default SingleBlock