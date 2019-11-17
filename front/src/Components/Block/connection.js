/**
 * @license
 * Copyright 2011 Google LLC
 * 참고: https://github.com/google/blockly
 * goolge blockly을 참고하여 개발.
 *
 * boostcamp the duck
 *
 *
 **/

import { dragging } from "./block_manager";

const Connection = function(type, source, diff_x, diff_y) {
  this.type = type;
  this.source = source;
  this.diff_x = 0;
  this.diff_y = 0;
  this.isSelected = false;
};

Connection.prototype.getType = function() {
  return this.type;
};

Connection.prototype.revertType = function(type) {
  return (type + 2) % 4;
};

Connection.prototype.X_ = function() {
  if (this.source.isDragging) {
    return dragging.getCurrentBlockX() + this.diff_x;
  }
  return this.source.X + this.diff_x;
};

Connection.prototype.Y_ = function() {
  if (this.source.isDragging) {
    return dragging.getCurrentBlockY() + this.diff_y;
  }
  return this.source.Y + this.diff_y;
};

Connection.prototype.canConnect = function(connect, radius) {
  return (
    Math.abs(connect.X_() - this.X_()) <= radius &&
    connect.source !== this.source &&
    connect.type === this.revertType(this.type)
  );
};

Connection.prototype.distanceFrom = function(connect) {
  return Math.sqrt(
    Math.pow(this.X_() - connect.X_(), 2) +
      Math.pow(this.X_() - connect.X_(), 2)
  );
};

export default Connection;
