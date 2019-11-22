import Constants from './constants';

const Connection = function (type, source, positiontype) {
  this.type = type;
  this.source = source;
  this.positiontype = positiontype;
  this.diffX = 0;
  this.diffY = 0;
  this.positionSetting = {
    previousPosition: { x: Constants.PREVIOUS_NEXT_POS_X, y: 6 },
    nextPosition: { x: Constants.PREVIOUS_NEXT_POS_X, y: 42 },
  };
  this.isSelected = false;
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
  if (this.source.isDragged) {
    return this.source.workspace.dragging.x + this.diffX;
  }

  return this.source.x + this.diffX;
};

Connection.prototype.Y_ = function () {
  if (this.source.isDragged) {
    return this.source.workspace.dragging.y + this.diffY;
  }

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
