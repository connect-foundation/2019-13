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

const ConnectionDB = class {
  constructor() {
    this.connections = [];
  }

  reset = () => {
    this.connections = [];
  };

  setConnections = (block) => {
    Object.values(block.workspace.blockDB).forEach((b) => {
      if (!b.isDragged) {
        this.connections.push(...b.getAvailableConnection());
      }
    });
    this.sortAxisY();
  };

  addConnection = (connection) => {
    this.connections.push(connection);
  };

  isInYRange = (idx, y, maxRadius) => Math.abs(this.connections[idx].Y_() - y) < maxRadius;

  findClosetConnection = (connect, maxRadius) => {
    const startIdx = this.findStartIdxForConnection(connect.Y_());
    let closestConnection = null;
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
        closestConnection = temp;
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
        closestConnection = temp;
        bestRadius = temp.distanceFrom(connect);
      }
      findForward += 1;
    }

    return { connection: closestConnection, radius: bestRadius };
  };


  findStartIdxForConnection = (Y) => {
    let positionMin = 0;
    let positionMax = this.connections.length;
    if (!this.connections.length) {
      return 0;
    }

    while (positionMin < positionMax) {
      const positionMid = Math.floor((positionMin + positionMax) / 2);
      if (this.connections[positionMid].Y_() < Y) {
        positionMin = positionMid + 1;
      } else if (this.connections[positionMid].Y_() > Y) {
        positionMax = positionMid;
      } else {
        positionMin = positionMid;
        break;
      }
    }
    if (positionMin >= this.connections.length) {
      positionMin = this.connections.length - 1;
    }
    return positionMin;
  };

  sortAxisY = () => {
    this.connections.sort((a, b) => a.Y_() - b.Y_());
  };
};
export default ConnectionDB;
