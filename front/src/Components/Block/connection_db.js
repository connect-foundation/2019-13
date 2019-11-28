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

const ConnectionDB = function () {
  this.connections = [];
};

ConnectionDB.prototype.reset = function () {
  this.connections = [];
};

ConnectionDB.prototype.setConnections = function (block) {
  Object.values(block.workspace.blockDB).forEach((b) => {
    if (!b.isDragged) {
      this.connections.push(...b.getAvailableConnection());
    }
  });
  this.sortAxisY();
};

ConnectionDB.prototype.addConnection = function (connection) {
  this.connections.push(connection);
};

ConnectionDB.prototype.isInYRange = function (connectIdx, y, maxRadius) {
  return Math.abs(this.connections[connectIdx].Y_() - y) < maxRadius;
};

ConnectionDB.prototype.findClosetConnection = function (connect, maxRadius) {
  const startIdx = this.findStartIdxForConnection(connect.Y_());
  let closetConnection = null;
  let bestRadius = maxRadius;
  let temp;
  let findBackword = startIdx - 1;
  let findForward = startIdx;

  if (startIdx >= this.connections.length) {
    return -1;
  }
  while (
    findBackword >= 0
    && this.isInYRange(findBackword, connect.Y_(), bestRadius)
  ) {
    temp = this.connections[findBackword];
    if (connect.canConnect(temp, bestRadius)) {
      closetConnection = temp;
      bestRadius = temp.distanceFrom(connect);
    }
    findBackword -= 1;
  }

  while (
    findForward < this.connections.length
    && this.isInYRange(findForward, connect.Y_(), bestRadius)
  ) {
    temp = this.connections[findForward];
    if (connect.canConnect(temp, bestRadius)) {
      closetConnection = temp;
      bestRadius = temp.distanceFrom(connect);
    }
    findForward += 1;
  }

  return { connection: closetConnection, radius: bestRadius };
};


ConnectionDB.prototype.findStartIdxForConnection = function (Y) {
  let positionMin = 0;
  let positionMax = this.connections.length;
  if (!this.connections.length) {
    return 0;
  }

  while (positionMin < positionMax) {
    const postionMid = Math.floor((positionMin + positionMax) / 2);
    if (this.connections[postionMid].Y_() < Y) {
      positionMin = postionMid + 1;
    } else if (this.connections[postionMid].Y_() > Y) {
      positionMax = postionMid;
    } else {
      positionMin = postionMid;
      break;
    }
  }
  if (positionMin >= this.connections.length) {
    positionMin = this.connections.length - 1;
  }
  return positionMin;
};

ConnectionDB.prototype.sortAxisY = function () {
  this.connections.sort((a, b) => a.Y_() - b.Y_());
};

export default ConnectionDB;
