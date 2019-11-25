import React from 'react';
import Path from './Path';
import Utils from '../../utils/utils';
import Connection from './connection';
import Constants from './constants';

const create = React.createElement;
const BlockModel = function (workspace, usedId) {
  this.id = usedId;
  this.type = '';
  this.style = '';
  this.workspace = workspace;
  this.x = 0;
  this.y = 0;
  this.args = [];
  this.color = '';
  this.strokeColor = '';
  this.path = null;
  this.node = null;
  this.render = null;
  this.motionIndex = -1;
};

BlockModel.prototype.setNode = function (node) {
  this.node = node;
  this.setArgs();
};

BlockModel.prototype.setArgs = function () {
  if (this.node) {
    let positionX = Constants.PIXEL;
    let lastChild;
    this.node.childNodes.forEach((node) => {
      if (node.tagName !== 'path' && node.tagName !== 'g') {
        this.setArgsPosition(node, positionX);
        positionX += node.getBoundingClientRect().width;
        lastChild = node;
      }
    });
    this.makeStyleFromJSON(
      (lastChild.getBoundingClientRect().right
      - this.node.getBoundingClientRect().left
      - Constants.PIXEL * 5)
      / Constants.PIXEL,
    );
    this.render(Math.random());
  }
};

BlockModel.prototype.setArgsPosition = function (node, positionX) {
  if (node.tagName !== 'foreignObject') {
    node.setAttribute('transform', `translate(${positionX},23)`);
  } else {
    node.setAttribute('transform', `translate(${positionX + 3},8)`);
  }
};

BlockModel.prototype.changeInputWidth = function (event) {
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
  this.setArgs();
};

BlockModel.prototype.makeFromJSON = function (json) {
  this.type = json.type;
  this.color = json.color;
  this.strokeColor = json.stroke_color;
  this.x = json.x ? json.x : 0;
  this.y = json.y ? json.y : 0;
  this.motionIndex = json.motionIndex === 0 || Number(json.motionIndex) ? json.motionIndex : -1;

  if (!this.id) {
    this.id = Utils.uid();
  }

  json.args.forEach((arg) => {
    this.makeArgsFromJSON(arg);
  });

  this.style = json.style;
  this.makeStyleFromJSON();
  return this;
};

BlockModel.prototype.makeArgsFromJSON = function (json) {
  if (json.type === 'text') {
    this.args.push(create(json.type, { key: json.value }, json.value));
  } else if (json.type === 'input') {
    this.args.push(create('foreignObject', { key: 'foreign' },
      create(json.type, { key: json.value, onChange: this.changeInputWidth.bind(this) }, null),
      create('div', { key: 'hiddenText', style: { position: 'absolute', visibility: 'hidden', fontSize: '0.5rem' } }, null)));
  }
};

BlockModel.prototype.makeStyleFromJSON = function (width, height, secondHeight) {
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


export default BlockModel;
