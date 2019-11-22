import ConnectionDB from './connection_db';

const Dragging = class {
  constructor () {
    this.isDragging = false;
    this.draggedBlock = null;
    this.availableConnection = null;
    this.x = 0;
    this.y = 0;
    this.closetConnection = null;
    this.localConnection = null;
    this.connectionDB = new ConnectionDB();
  }

  dragStart (sourceBlock, x, y) {
    this.isDragging = true;
    this.draggedBlock = sourceBlock;
    this.draggedBlock.disconnectBlock();
    this.availableConnection = sourceBlock.getAvailableConnection(true);
    this.connectionDB.reset();
    this.connectionDB.setConnections(this.draggedBlock);
  };
  
  updateDrag (movedX, movedY) {
    const maxRadious = 50;
    let bestRadious = maxRadious;
    this.x = movedX;
    this.y = movedY;
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
  
  dragEnd (x, y) {
    const block = this.draggedBlock;
    if (this.closetConnection) {
      this.connectBlock();
    } else {
      this.draggedBlock.setNextElementPosition();
    }
    this.isDragging = false;
    this.draggedBlock = null;
    return block;
  };

  connectBlock () {
    this.localConnection.connectBlock(this.closetConnection);
  };
};



export default Dragging;
