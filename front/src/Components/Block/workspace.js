import Block from './block';
import Dragging from './dragging';
import ConnectionDB from './connection_db';
import Utils from '../../utils/utils';
import CONSTANTS from './constants';

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
    const deleteBlock = this.getBlockById(usedId);
    if (!deleteBlock) return;
    if (deleteBlock.nextElement) {
      this.deleteBlock(deleteBlock.nextElement.id);
    }
    if (deleteBlock.firstChildElement) {
      this.deleteBlock(deleteBlock.firstChildElement.id);
    }
    if (deleteBlock.secondChildElement) {
      this.deleteBlock(deleteBlock.secondChildElement.id);
    }
    Utils.arrayRemove(this.topblocks, deleteBlock);
    delete this.blockDB[usedId];
  }

  deleteBlockInModelList() {
    console.log(this.blockDB, this.topblocks);
    Object.values(this.blockDB).forEach((block) => {
      if (block.x < CONSTANTS.DELETE_AREA_X) delete this.blockDB[block.id];
    });
    this.topblocks = this.topblocks.filter(block => block.x > CONSTANTS.DELETE_AREA_X);
  }

  getStartBlocks() {
    return this.topblocks.reduce((prev, cur) => {
      if (cur.type === 'event_start' && cur.nextElement) prev.push(cur.nextElement);
      return prev;
    }, []);
  }

  addTopblock(block) {
    if (this.topblocks.some(b => b.id === block.id)) return;
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
    this.topblocks.forEach((topblock) => {
      if (topblock !== block) { topblock.setAllBlockPosition(); }
    });
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
