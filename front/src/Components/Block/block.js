import React from 'react';
import Path from './Path';

const create = React.createElement
const Block = function () {
  this.id = "";
  this.type = "";
  this.parentBlock = null;
  this.childBlocks = [];
  this.x = 0;
  this.y = 0;
  this.args = [];
  this.color = "";
  this.strokeColor = "";
  this.path = null;
}

Block.prototype.makeFromJSON = function (json) {
  this.type = json['type'];
  this.color = json['color'];
  this.strokeColor = json['stroke_color']

  json['args'].forEach((arg)=>{
    this.makeArgsFromJSON(arg)
  })

  this.makeStyleFromJSON(json['style'])
}

Block.prototype.makeArgsFromJSON = function (json) {
  if (json['type'] === "text")
    this.args.push(create(json['type'],null,json['value']))
  else if (json['type'] === "input")
    this.args.push(create("foreignObject", null, create(json['type'],{},null)))
}

Block.prototype.makeStyleFromJSON = function (style) {
  switch (style) {
    case "single":
      this.path = create("path", { d: Path.single(), fill: this.color, stroke: this.strokeColor, strokeWidth: 0.5 }, null)
      break;
    case "double":
      this.path = create("path", { d: Path.double(), fill: this.color, stroke: this.strokeColor, strokeWidth: 0.5 }, null)
      break;
    case "triple":
      this.path = create("path", { d: Path.triple(), fill: this.color, stroke: this.strokeColor, strokeWidth: 0.5 }, null)
      break;
    case "variable":
      this.path = create("path", { d: Path.variable(), fill: this.color, stroke: this.strokeColor, strokeWidth: 0.5 }, null)
      break;
    case "event":
      this.path = create("path", { d: Path.event(), fill: this.color, stroke: this.strokeColor, strokeWidth: 0.5 }, null)
      break;
    case "condition":
      this.path = create("path", { d: Path.condition(), fill: this.color, stroke: this.strokeColor, strokeWidth: 0.5 }, null)
      break;
    default:
      throw new Error("It's not a defined style!!")
  }
}

export default Block;