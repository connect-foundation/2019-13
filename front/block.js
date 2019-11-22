import React from 'react';
import Path from './Path';
import Utils from '../../utils/utils';
import Connection from './connection';
import Constants from './constants';

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

Block.prototype.getNextConnection = function (goEndPoint = false) {
  if (this.nextElement && goEndPoint) {
    return this.nextElement.getNextConnection(goEndPoint);
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

Block.prototype.setNextElementPosition = function () {
  if (this.nextElement) {
    this.nextElement.y = this.y + 36;
    this.nextElement.x = this.x;
    this.nextElement.setNextElementPosition();
  }
};

Block.prototype.connectBlock = function (type, conn) {
  switch (type) {
    case 'nextPosition':
      Utils.arrayRemove(this.workspace.topblocks, conn.source);
      if (conn.source.previousElement) {
        this.previousElement = conn.source.previousElement;
        conn.source.previousElement.nextElement = this;
      }
      if (this.nextElement) {
        const lastElement = this.getNextConnection(true).source;
        lastElement.nextElement = conn.source;
        conn.source.previousElement = lastElement;
      } else {
        conn.source.previousElement = this;
        this.nextElement = conn.source;
      }
      this.setNextElementPosition();
      break;
    case 'previousPosition':
      if (conn.source.nextElement) {
        const lastBlock = this.getNextConnection(true).source;
        conn.source.nextElement.previousElement = lastBlock;
        lastBlock.nextElement = conn.source.nextElement;
      }
      this.previousElement = conn.source;
      conn.source.nextElement = this;
      this.previousElement.setNextElementPosition();
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