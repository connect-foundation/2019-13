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

ConnectionDB.prototype.addConnection = function (connection) {
  this.connections.push(connection);
};

ConnectionDB.prototype.isInYRange = function (connectIdx, y, maxRadius) {
  return Math.abs(this.connections[connectIdx].test_y - y) <= maxRadius;
};

ConnectionDB.prototype.findClosetConnection = function (connect, maxRadius) {
  const startIdx = this.findStartIdxForConnection(connect.X_(), connect.Y_());
  let closetConnection = null;
  let bestRadius = maxRadius;
  let temp;
  let findBackword = startIdx - 1;
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
    findBackword--;
  }
  let findForward = startIdx;
  while (
    findForward < this.connections.length
    && this.isInYRange(findForward, connect.Y_(), bestRadius)
  ) {
    temp = this.connections[findForward];
    if (connect.canConnect(temp, bestRadius)) {
      closetConnection = temp;
      bestRadius = temp.distanceFrom(connect);
    }
    findForward++;
  }
  return { connection: closetConnection, radius: bestRadius };
};

ConnectionDB.prototype.findStartIdxForConnection = function (test_x, test_y) {
  if (!this.connections.length) {
    return 0;
  }
  let positionMin = 0;
  let positionMax = this.connections.length;
  while (positionMin < positionMax) {
    const postionMid = Math.floor((positionMin + positionMax) / 2);
    if (this.connections[postionMid].test_y < test_y) {
      positionMin = postionMid + 1;
    } else if (this.connections[postionMid].test_y > test_y) {
      positionMax = postionMid;
    } else {
      positionMin = postionMid;
      break;
    }
  }
  return positionMin;
};

ConnectionDB.prototype.sortAxisY = function () {
  this.connections.sort((a, b) => {
    return a.Y_() - b.Y_();
  });
};

export default ConnectionDB;
