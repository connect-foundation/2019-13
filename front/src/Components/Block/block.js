import React from 'react';
import Path from './Path';
import Uid from '../../utils/uid';
import Connection from './connection';
import Constants from './constants';

const create = React.createElement;
const Block = function (workspace, usedId) {
  this.id = usedId;
  this.type = '';
  this.style = '';
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
  this.render = null;
};

Block.prototype.setNode = function (node) {
  this.node = node;
  this.getLengthOfArgs();
};

Block.prototype.getLengthOfArgs = function () {
  if (this.node) {
    let positionX = 6;
    this.node.childNodes.forEach((node) => {
      if (node.tagName !== 'path') {
        this.setArgsPosition(node, positionX);
        positionX += node.getBoundingClientRect().width;
      }
    });
    this.makeStyleFromJSON((this.node.lastChild.getBoundingClientRect().right - this.node.getBoundingClientRect().left) / 6 - 6 + 1);
    this.render(Math.random());
  }
};

Block.prototype.setArgsPosition = function (node, positionX) {
  if (node.tagName !== 'foreignObject') {
    node.setAttribute('transform', `translate(${positionX},23)`);
  } else {
    node.setAttribute('transform', `translate(${positionX + 3},8)`);
  }
};

Block.prototype.changeInputWidth = function (event) {
  const { target } = event;
  const { length } = target.value;
  if (length > 5) {
    const { lastChild } = target.parentNode;
    lastChild.innerHTML = target.value;
    target.parentNode.style.width = `${lastChild.clientWidth}px`;
    target.style.width = `${lastChild.clientWidth}px`;
  } else {
    target.parentNode.style.width = '30px';
    target.style.width = '30px';
  }
  this.getLengthOfArgs();
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

  this.style = json.style;
  this.makeStyleFromJSON();

  if (!this.workspace.getBlockById(this.id)) {
    this.workspace.blockDB[this.id] = this;
  }
};

Block.prototype.makeArgsFromJSON = function (json) {
  if (json.type === 'text') {
    this.args.push(create(json.type, { key: json.value }, json.value));
  } else if (json.type === 'input') {
    this.args.push(create('foreignObject', { key: 'foreign' },
      create(json.type, { key: json.value, onChange: this.changeInputWidth.bind(this) }, null),
      create('div', { key: 'hiddenText', style: { position: 'absolute', visibility: 'hidden', fontSize: '0.5rem' } }, null)));
  }
};

Block.prototype.makeStyleFromJSON = function (width, height, secondHeight) {
  switch (this.style) {
    case 'single':
      this.path = create(
        'path',
        {
          d: Path.single(width),
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
          d: Path.double(width, height),
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
          d: Path.triple(width, height, secondHeight),
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
          d: Path.variable(width),
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
          d: Path.event(width),
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
          d: Path.condition(width),
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
