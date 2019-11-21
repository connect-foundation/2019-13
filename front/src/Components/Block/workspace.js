import Block from './block';
import Dragging from './dragging';
import ConnectionDB from './connection_db';
import Utils from '../../utils/utils';

const Workspace = class {
  constructor(blockDB, topblocks, setRender) {
    this.blockDB = blockDB || Object.create(null);
    this.connectionDB = new ConnectionDB(this);
    this.dragging = new Dragging(this.connectionDB);
    this.topblocks = topblocks || [];
    this.setRender = setRender || null;
  }

  addBlock(usedId) {
    return new Block(this, usedId);
  }

  deleteBlock(usedId) {
    Utils.arrayRemove(this.topblocks, this.getBlockById(usedId));
    delete this.blockDB[usedId];
  }

  addTopblock(block) {
    for (const a of this.topblocks) {
      if (a.id === block.id) {
        return;
      }
    }
    this.topblocks.push(block);
  }

  removeTopblock(block) {
    if (!Utils.arrayRemove(this.topblocks, block)) {
      throw Error('탑블록 어레이 내에 없음! ㅜㅜ');
    }
  }

  dragStart(block, x, y) {
    this.addTopblock(block);
    this.dragging.dragStart(block, x, y);
  }

  dragUpdate(x, y) {
    this.dragging.updateDrag(x, y);
  }

  dragEnd() {
    const block = this.dragging.dragEnd();
    if (block.parentElement || block.previousElement) {
      this.removeTopblock(block);
    }
    this.setRender(Math.random());
  }

  getBlockById(blockId) {
    return this.blockDB[blockId];
  }

  getAll() {
    return this;
  }
};

export default Workspace;
