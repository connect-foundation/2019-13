import React from 'react';
import Path from './Path';

const create = React.createElement
const Block = function () {
  this.type = "";
  this.parentBlock = null;
  this.childBlocks = [];
  this.xy = "(0,0)";
  this.args = [];
  this.color = "";
  this.strokeColor = "";
  this.path = null;
}

Block.prototype.jsonInit = function (json) {
  this.type = json['type'];
  this.color = json['color'];
  this.strokeColor = json['stroke_color']

  let i = 0;
  while (json['args' + i] !== undefined) {
    this.jsonInitArgs(json['args' + i][0])
    i++;
  }

  this.jsonInitStyle(json['style'])
}

Block.prototype.jsonInitArgs = function (json) {
  if (json['type'] === "text")
    this.args.push(create(json['type'],null,json['value']))
  else if (json['type'] === "input")
    this.args.push(create("foreignObject", null, create(json['type'],{value:json['value']},null)))
}

Block.prototype.jsonInitStyle = function (style) {
  switch (style) {
    case "single":
      this.path = create("path", { d: Path.single(), fill: this.color, stroke: this.strokeColor, strokeWidth: 0.5 }, null)
      break;
    case "double":
      this.path = create("path", { d: Path.single(), fill: this.color, stroke: this.strokeColor, strokeWidth: 0.5 }, null)
      break;
    case "triple":
      this.path = create("path", { d: Path.single(), fill: this.color, stroke: this.strokeColor, strokeWidth: 0.5 }, null)
      break;
    case "variable":
      this.path = create("path", { d: Path.single(), fill: this.color, stroke: this.strokeColor, strokeWidth: 0.5 }, null)
      break;
    case "event":
      this.path = create("path", { d: Path.single(), fill: this.color, stroke: this.strokeColor, strokeWidth: 0.5 }, null)
      break;
    case "condition":
      this.path = create("path", { d: Path.single(), fill: this.color, stroke: this.strokeColor, strokeWidth: 0.5 }, null)
      break;
    default:
      throw new Error("It's not a defined style!!")
  }
}

Block.prototype.makeXY = function (x, y) {
  return `(${x},${y})`
}

export default Block;