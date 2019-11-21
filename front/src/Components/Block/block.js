import React from 'react';
import Path from './Path';
import Utils from '../../utils/utils';
import Connection from './connection';
import Constants from './constants';

const create = React.createElement;
const Block = function (workspace, usedId) {
  this.id = usedId;
  this.type = '';
  this.style = '';
  this.workspace = workspace;
  this.firstchildConnection = null;
  this.secondchildConnection = null;
  this.firstchildElement = null;
  this.secondchildElement = null;
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
  this.motionIndex = -1;
  this.isDragged = false;
  this.parentElement = null;
  this.parentConnection = null;
};

Block.prototype.setNode = function (node) {
  this.node = node;
  this.setArgs();
};

Block.prototype.setArgs = function () {
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
  this.setArgs();
};

Block.prototype.makeFromJSON = function (json) {
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

  if (json.previousConnection && !this.previousConnection) {
    this.previousConnection = new Connection(
      Constants.PREVIOUS_CONNECTION,
      this, 'previousPosition',
    );
  }

  if (json.nextConnection && !this.nextConnection) {
    this.nextConnection = new Connection(Constants.NEXT_CONNECTION, this, 'nextPosition');
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

Block.prototype.dragStart = function (x, y) {
  this.setDrag(true);
  this.workspace.dragStart(this, x, y);
};

Block.prototype.dragUpdate = function (x, y) {
  this.workspace.dragUpdate(x, y);
};

Block.prototype.dragEnd = function (x, y) {
  this.x = x;
  this.y = y;
  this.setDrag(false);
  this.workspace.dragEnd();
};

Block.prototype.getNextConnection = function (isDragged) {
  if (this.nextElement && isDragged) {
    return this.nextElement.getNextConnection();
  }

  return this.nextConnection;
};

Block.prototype.setDrag = function (isDragged) {
  this.isDragged = isDragged;

  if (this.nextElement) {
    this.nextElement.setDrag(isDragged);
  }

  if (this.firstchildElement) {
    this.firstchildConnection.setDrag(isDragged);
  }

  if (this.secondchildElement) {
    this.secondchildElement.setDrag(isDragged);
  }
};

Block.prototype.getAvailableConnection = function (isDragged = false) {
  const availableConnection = [];

  if (this.previousConnection) {
    availableConnection.push(this.previousConnection);
  }

  if (this.nextConnection) {
    const nextConn = this.getNextConnection(isDragged);
    if (nextConn) availableConnection.push(nextConn);
  }

  return availableConnection;
};

Block.prototype.connectBlock = function (type, conn) {
  switch (type) {
    case 'nextPosition':
      this.nextElement = conn.source;
      break;
    case 'previousPosition':
      this.previousElement = conn.source;
      break;

    case 'outputPosition':
      break;

    case 'inputPosition':

      break;

    default:
      throw new Error('잘못된 커넥션 타입입니다.');
  }
};

Block.prototype.disconnectBlock = function () {
  if (this.previousElement) {
    this.previousElement.nextElement = null;
    this.previousElement = null;
  }
};

export default Block;
