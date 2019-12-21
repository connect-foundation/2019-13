/**
 * @license
 * Copyright 2011 Google LLC
 * 참고: https://github.com/google/blockly
 * goolge blockly을 참고하여 개발.
 *
 * boostcamp the duck
 *
 *
 * */

import CONSTANTS from '../constants';

const Connection = function (type, source, positiontype) {
  this.type = type;
  this.source = source;
  this.positiontype = positiontype;
  this.diffX = 0;
  this.diffY = 0;
  this.positionSetting = {};
  this.isSelected = false;
};

Connection.prototype.setPositions = function (inputX) {
  this.positionSetting = {
    previousPosition: { x: CONSTANTS.PREVIOUS_NEXT_POS_X, y: CONSTANTS.PIXEL },
    nextPosition: { x: CONSTANTS.PREVIOUS_NEXT_POS_X, y: this.source.height },
    firstChildPosition: { x: CONSTANTS.CHILD_NEXT_POS_X,
      y: CONSTANTS.BLOCK_HEAD_HEIGHT + CONSTANTS.PIXEL },
    inputPosition: { x: inputX, y: CONSTANTS.SMALL_BLOCK_HEIGHT / 2 },
    outputPosition: { x: 0, y: CONSTANTS.SMALL_BLOCK_HEIGHT / 2 },
  };
  this.setDiff();
};

Connection.prototype.setDiff = function () {
  this.diffX = this.positionSetting[this.positiontype].x;
  this.diffY = this.positionSetting[this.positiontype].y;
};

Connection.prototype.getType = function () {
  return this.type;
};

Connection.prototype.revertType = function (type) {
  return (type + 2) % 4;
};

Connection.prototype.X_ = function () {
  return this.source.x + this.diffX;
};

Connection.prototype.Y_ = function () {
  return this.source.y + this.diffY;
};

Connection.prototype.canConnect = function (connect, radius) {
  return (
    Math.abs(connect.X_() - this.X_()) <= radius
    && connect.type === this.revertType(this.type)
  );
};

Connection.prototype.distanceFrom = function (connect) {
  return Math.sqrt(
    ((this.X_() - connect.X_()) ** 2)
      + ((this.Y_() - connect.Y_()) ** 2),
  );
};

Connection.prototype.connectBlock = function (conn) {
  this.source.connectBlock(this.positiontype, conn);
};

export default Connection;
