import ConnectionDB from './connection_db';

const Dragging = function () {
  this.isDragging = false;
  this.draggedBlock = null;
  this.availableConnection = null;
  this.x = 0;
  this.y = 0;
  this.closetConnection = null;
  this.connectionDB = new ConnectionDB();
};

Dragging.prototype.dragStart = function (sourceBlock, x, y) {
  this.isDragging = true;
  this.draggedBlock = sourceBlock;
  this.availableConnection = sourceBlock.getAvailableConnection(true);
  this.connectionDB.reset();
  this.connectionDB.setConnections(this.draggedBlock);
};

Dragging.prototype.updateDrag = function (movedX, movedY) {
  const maxRadious = 50;
  let bestRadious = maxRadious;
  this.x = movedX;
  this.y = movedY;
  this.availableConnection.forEach((conn) => {
    const result = this.connectionDB.findClosetConnection(conn, bestRadious);
    if (result.connection && result.radius < bestRadious) {
      bestRadious = result.radius;
      this.closetConnection = result.connection;
    }
  });
  if (bestRadious === maxRadious) {
    this.closetConnection = null;
  }
};

Dragging.prototype.dragEnd = function (x, y) {
  this.isDragging = false;
  this.draggedBlock = null;
};

export default Dragging;
