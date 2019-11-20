import React from 'react';
import Path from './Path';
import Uid from '../../utils/uid';
import Connection from './connection';
import Constants from './constants';

const create = React.createElement;
const Block = function (workspace, usedId) {
  this.id = usedId;
  this.type = '';
  this.workspace = workspace;
  this.parentBlock = null;
  this.childBlocks = [];
  this.x = 0;
  this.y = 0;
  this.args = [];
  this.color = '';
  this.strokeColor = '';
  this.previousConnection = null;
  this.nextConnection = null;
  this.previousElement = null;
  this.nextElement = null;
  this.path = null;
  this.motionIndex = -1;
};

Block.prototype.makeFromJSON = function (json) {
  this.type = json.type;
  this.color = json.color;
  this.strokeColor = json.stroke_color;
  this.x = json.x ? json.x : 0;
  this.y = json.y ? json.y : 0;
  this.motionIndex = json.motionIndex === 0 || Number(json.motionIndex) ? json.motionIndex : -1;

  if (!this.id) {
    this.id = Uid();
  }

  json.args.forEach((arg) => {
    this.makeArgsFromJSON(arg);
  });

  if (json.previousConnection && !this.previousConnection) {
    this.previousConnection = new Connection(
      Constants.PREVIOUS_CONNECTION,
      this,
    );
  }
  if (json.nextConnection && !this.nextConnection) {
    this.nextConnection = new Connection(Constants.NEXT_CONNECTION, this);
  }

  this.makeStyleFromJSON(json.style);

  if (!this.workspace.getBlockById(this.id)) {
    this.workspace.blockDB[this.id] = this;
  }
};

Block.prototype.makeArgsFromJSON = function (json) {
  if (json.type === 'text') {
    this.args.push(create(json.type, null, json.value));
  } else if (json.type === 'input') {
    this.args.push(create('foreignObject', null, create(json.type, {}, null)));
  }
};

Block.prototype.makeStyleFromJSON = function (style) {
  switch (style) {
    case 'single':
      this.path = create(
        'path',
        {
          d: Path.single(),
          fill: this.color,
          stroke: this.strokeColor,
          strokeWidth: 0.5,
        },
        null,
      );
      break;
    case 'double':
      this.path = create(
        'path',
        {
          d: Path.double(),
          fill: this.color,
          stroke: this.strokeColor,
          strokeWidth: 0.5,
        },
        null,
      );
      break;
    case 'triple':
      this.path = create(
        'path',
        {
          d: Path.triple(),
          fill: this.color,
          stroke: this.strokeColor,
          strokeWidth: 0.5,
        },
        null,
      );
      break;
    case 'variable':
      this.path = create(
        'path',
        {
          d: Path.variable(),
          fill: this.color,
          stroke: this.strokeColor,
          strokeWidth: 0.5,
        },
        null,
      );
      break;
    case 'event':
      this.path = create(
        'path',
        {
          d: Path.event(),
          fill: this.color,
          stroke: this.strokeColor,
          strokeWidth: 0.5,
        },
        null,
      );
      break;
    case 'condition':
      this.path = create(
        'path',
        {
          d: Path.condition(),
          fill: this.color,
          stroke: this.strokeColor,
          strokeWidth: 0.5,
        },
        null,
      );
      break;
    default:
      throw new Error("It's not a defined style!!");
  }
};

export default Block;
