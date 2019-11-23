import ConnectionDB from './connection_db';

const Dragging = function () {
  this.connectionDB = new ConnectionDB();
  this.isDragging = false;
  this.draggedBlock = null;
  this.availableConnection = null;
  this.x = 0;
  this.y = 0;
  this.closetConnection = null;
  this.localConnection = null;
  this.lastBlock = null;
  this.lastBlockDiff = null;
};

Dragging.prototype.dragStart = function (sourceBlock, x, y) {
  this.isDragging = true;
  this.draggedBlock = sourceBlock;
  this.draggedBlock.disconnectBlock();
  this.availableConnection = sourceBlock.getAvailableConnection(true);
  this.lastBlock = this.availableConnection[this.availableConnection.length - 1].source;
  this.lastBlockDiff = { x: this.lastBlock.x - this.draggedBlock.x, y: this.lastBlock.y - this.draggedBlock.y };
  this.connectionDB.reset();
  this.connectionDB.setConnections(this.draggedBlock);
};

Dragging.prototype.updateDrag = function (movedX, movedY) {
  const maxRadious = 25;
  let bestRadious = maxRadious;
  this.x = movedX;
  this.y = movedY;
  this.lastBlock.x = this.x + this.lastBlockDiff.x;
  this.lastBlock.y = this.y + this.lastBlockDiff.y;
  this.availableConnection.forEach((conn) => {
    const result = this.connectionDB.findClosetConnection(conn, bestRadious);
    if (result.connection && result.radius < bestRadious) {
      bestRadious = result.radius;
      this.closetConnection = result.connection;
      this.localConnection = conn;
    }
  });
  if (bestRadious === maxRadious) {
    this.closetConnection = null;
    this.localConnection = null;
  }
};

Dragging.prototype.reset = function () {
  this.isDragging = false;
  this.draggedBlock.setDrag(false);
  this.draggedBlock = null;
  this.availableConnection = null;
  this.x = 0;
  this.y = 0;
  this.closetConnection = null;
  this.localConnection = null;
  this.lastBlock = null;
  this.lastBlockDiff = null;
};

Dragging.prototype.dragEnd = function (x, y) {
  const block = this.draggedBlock;
  if (this.closetConnection) {
    this.connectBlock();
  } else {
    this.draggedBlock.setNextElementPosition();
  }
  this.reset();
  return block;
};

Dragging.prototype.connectBlock = function () {
  this.localConnection.connectBlock(this.closetConnection);
};

export default Dragging;
