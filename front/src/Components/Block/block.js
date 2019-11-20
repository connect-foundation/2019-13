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
  this.node = null;
  this.isChanged = true;
};

Block.prototype.changeInputWidth = function (event) {
  const { target } = event;
  const { length } = target.value;
  if (length > 3) {
    target.parentNode.style.width = `${length * 8 + 4}px`;
    target.style.width = `${length * 8 + 4}px`;
  } else {
    target.parentNode.style.width = '30px';
    target.style.width = '30px';
  }
};

Block.prototype.makeFromJSON = function (json) {
  this.type = json.type;
  this.color = json.color;
  this.strokeColor = json.stroke_color;

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
    this.args.push(create(json.type, { key: json.value }, json.value));
  } else if (json.type === 'input') {
    this.args.push(create('foreignObject', { key: 'foreign' }, create(json.type, { key: json.value, onChange: this.changeInputWidth }, null)));
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
          key: 'single',
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
          key: 'double',
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
          key: 'triple',
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
          key: 'variable',
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
          key: 'event',
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
          key: 'condition',
        },
        null,
      );
      break;
    default:
      throw new Error("It's not a defined style!!");
  }
};

export default Block;
