import React from 'react';
import Theme from '../Styles/Theme';
const pixel = 6

function TripleBlock({ width, firstHeight, secondHeight, stroke, strokeWidth, color }) {
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
  l 0,0 0,${pixel * firstHeight}
  c 0,${pixel} 0,${pixel} ${pixel},${pixel}
  l 0,0 ${pixel * 3},0
  0,0 ${pixel * 2},${pixel * 2}
  0,0 ${pixel * 4},0 
  0,0 ${pixel * 2},-${pixel * 2}
  0,0 ${pixel * (width - 1)},0
  c ${pixel},0 ${pixel},0 ${pixel},${pixel}
  l 0,0 0,${pixel * 3}
  c 0,${pixel} 0,${pixel} -${pixel},${pixel}
  l 0,0 -${pixel * (width - 1)},0 
  0,0 -${pixel * 2},${pixel * 2}
  0,0 -${pixel * 4},0 
  0,0 -${pixel * 2},-${pixel * 2}
  0,0 -${pixel * 3},0
  c -${pixel},0 -${pixel},0 -${pixel},${pixel}
  l 0,0 0,${pixel * secondHeight}
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
  0,0 0,-${pixel * (secondHeight + 2)}
  0,0 0,-${pixel * 5}
  0,0 0,-${pixel * (firstHeight + 2)}
  0,0 0,-${pixel * 5}
  c 0,-${pixel} 0,-${pixel} ${pixel},-${pixel}
  `

  return (
    <svg>
      <path stroke={stroke} strokeWidth={strokeWidth} fill={color} d={d} />
    </svg>
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