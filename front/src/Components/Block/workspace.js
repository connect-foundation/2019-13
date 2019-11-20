import Block from './block';
import Dragging from './dragging';
import ConnectionDB from './connection_db';

const Workspace = class {
  constructor(blockDB) {
    this.blockDB = blockDB || Object.create(null);
    this.connectionDB = new ConnectionDB(this);
    this.dragging = new Dragging(this.connectionDB);
  }

  addBlock(usedId) {
    return new Block(this, usedId);
  }

  dragStart(block, x, y) {
    this.dragging.dragStart(block, x, y);
  }

  dragUpdate(x, y) {
    this.dragging.updateDrag(x, y);
  }

  dragEnd() {
    this.dragging.dragEnd();
  }

  getBlockById(blockId) {
    return this.blockDB[blockId];
  }

  getAll() {
    return this;
  }
};

export default Workspace;
