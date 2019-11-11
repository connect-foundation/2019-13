import React from 'react';
const pixel = 6

function DoubleBlock({ width, height, stroke, strokeWidth, color }) {
  const d = `M ${pixel},0 
  l 0,0 ${pixel * 3},0 
  0,0 ${pixel * 2},${pixel * 2}
  0,0 ${pixel * 4},0 
  0,0 ${pixel * 2},-${pixel * 2}
  0,0 ${pixel * (width - 1 + 4)},0 
  c ${pixel},0 ${pixel},0 ${pixel},${pixel}
  l 0,0 0,${pixel * 4}
  c 0,${pixel} 0,${pixel} -${pixel},${pixel}
  l 0,0 -${pixel * (width - 1)},0 
  0,0 -${pixel * 2},${pixel * 2}
  0,0 -${pixel * 4},0 
  0,0 -${pixel * 2},-${pixel * 2}
  0,0 -${pixel * 3},0
  c -${pixel},0 -${pixel},0 -${pixel},${pixel}
  l 0,0 0,${pixel * height}
  c 0,${pixel} 0,${pixel} ${pixel},${pixel}
  l 0,0 ${pixel * 3},0
  0,0 ${pixel * 2},${pixel * 2}
  0,0 ${pixel * 4},0 
  0,0 ${pixel * 2},-${pixel * 2}
  0,0 ${pixel * (width - 1)},0
  c ${pixel},0 ${pixel},0 ${pixel},${pixel}
  l 0,0 0,${pixel * 3}
  c 0,${pixel} 0,${pixel} -${pixel},${pixel}
  l 0,0 -${pixel * (width - 1 + 4)},0 
  0,0 -${pixel * 2},${pixel * 2}
  0,0 -${pixel * 4},0 
  0,0 -${pixel * 2},-${pixel * 2}
  0,0 -${pixel * 3},0
  c -${pixel},0 -${pixel},0 -${pixel},-${pixel}
  l 0,0 0,-${pixel * 4}
  0,0 0,-${pixel * (height + 2)}
  0,0 0,-${pixel * 5}
  c 0,-${pixel} 0,-${pixel} ${pixel},-${pixel}
  `

  return (
    <svg>
      <path stroke={stroke} strokeWidth={strokeWidth} fill={color} d={d} />
    </svg>
  )
}

DoubleBlock.defaultProps = {
  stroke: "black",
  strokeWidth: 0.5,
  color: "white",
  width: 14,
  height: 2
}

export default DoubleBlock