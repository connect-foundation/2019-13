import React from 'react'
import Path from '../../../Block/Path';

const e = React.createElement
const Block = function (type, style, args) {
  this.type = type;
  this.style = style;
  this.args = args;
  this.parentBlock = null;
  this.childBlocks = [];
  this.inputList = [];
  this.xy = "(0,0)";
  this.color = "rgb(0,0,0)";
  this.previousConnection = null;
  this.nextConnection = null;
}

Block.prototype.width = 0
Block.prototype.height = 0
Block.prototype.dragStartPosition = ""

Block.prototype.initPath = function (width) {
  const path = e('path', { d: Path.single(width) }, null)
  return path
}

Block.prototype.initArguments = function () {
  const elementsArray = []
  elementsArray.push(this.initPath(14))
  this.args.forEach((arg) => {
    if (arg[0].type === "input") {
      const input = e('input', null, null)
      const foreignObject = e('foreignObject', { x: 0, y: 0 }, input)
      elementsArray.push(foreignObject)
      this.inputList.push(input)
    } else if (arg[0].type === "text"){
      const text = e('text', { transform: 'translate(0,0)' }, `${arg[0].message}`)
      elementsArray.push(text)
    }
  })
  return elementsArray
}

Block.prototype.initGroup = function (elementsArray) {
  const g = e('g', {},[elementsArray])
  return g
}

Block.prototype.makeXY = function (x, y) {
  return `(${x},${y})`
}

export default Block