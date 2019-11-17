import React, { useState } from 'react'
import Block from './block'
import drag from './Logic/Drag'
import motion from './Init/Motion';

export default () => {
  const blocks = []
  motion.forEach((json) => {
    const block = new Block();
    block.makeFromJSON(json)

    const [position, setPosition] = useState({ x: 0, y: 0 })
    const g = React.createElement("g", {
      onMouseDown: drag(setPosition),
      transform: `translate(${position.x},${position.y})`
    }, block.path, ...block.args);

    blocks.push(g)
  })

  return (
    <svg>
      {blocks.map((block) => { return block })}
    </svg>
  )
}