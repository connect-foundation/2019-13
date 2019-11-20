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
  this.motionIndex = -1;
  this.isDragged = false;
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
      this, 'previousPosition',
    );
  }

  if (json.nextConnection && !this.nextConnection) {
    this.nextConnection = new Connection(Constants.NEXT_CONNECTION, this, 'nextPosition');
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

export default Block;
