import single_blocks from './Init/Single';
import Block from './Prototype'

export default () => {
  const blockArray = [];
  single_blocks.forEach((object) => {
    const args = []
    Object.keys(object).forEach((key) => {
      if (key.includes("args"))
        args.push(object[key])
    })
    const block = new Block(object.type, object.style, args)
    blockArray.push(block)
  })
  return blockArray
}