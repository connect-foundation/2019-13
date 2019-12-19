/* eslint-disable class-methods-use-this */
import Block from './block';
import Dragging from './dragging';
import ConnectionDB from './connection_db';
import Utils from '../../utils/utils';
import CONSTANTS from './constants';

const Workspace = class {
  constructor({ blockDB, topblocks, setRender, id, imageId }) {
    this.id = id || Utils.uid();
    this.imageId = imageId || '';
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
    deleteBlock.inputElement.forEach((input) => { if (input.type === 'block') this.deleteBlock(input.id); });
    Utils.arrayRemove(this.topblocks, deleteBlock);
    delete this.blockDB[usedId];
  }

  deleteBlockInModelList() {
    let { length } = this.topblocks;
    for (let i = 0; i < length; i += 1) {
      if (this.topblocks[i].x < CONSTANTS.DELETE_AREA_X) {
        this.deleteBlock(this.topblocks[i].id);
        i -= 1;
        length -= 1;
      }
    }
  }

  getStartBlocks() {
    return this.topblocks.reduce((prev, cur) => {
      if (cur.type === 'event_start' && cur.nextElement) prev.push(cur.nextElement);
      return prev;
    }, []);
  }

  getEventBlocks() {
    return this.topblocks.reduce((prev, cur) => {
      if (cur.type === 'event_key_pressed' && cur.nextElement) {
        prev[cur.value] = (prev[cur.value])
          ? [...prev[cur.value], cur.nextElement]
          : [cur.nextElement];
      }
      return prev;
    }, {});
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
    if (block.parentElement || block.previousElement || block.outputElement) {
      this.removeTopblock(block);
    }
    this.renderTopblocks();
    this.setRender(Math.random());
    this.renderTopblocks();
  }

  getBlockById(blockId) {
    return this.blockDB[blockId];
  }

  getAll() {
    return this;
  }

  extractCoreData() {
    const blocks = Object.values(this.blockDB).map(b => ({
      id: b.id,
      type: b.type,
      positionX: b.x,
      positionY: b.y,
      nextElementId: this.getBlockId(b.nextElement),
      firstChildElementId: this.getBlockId(b.firstChildElement),
      secondChildElementId: this.getBlockId(b.secondChildElement),
      inputElementId: b.inputElement.map(input => (input.id ? input.id : input.value.toString())),
    }));
    return {
      id: this.id,
      blocks,
      imageId: this.imageId,
    };
  }

  getBlockId(block) {
    return block ? block.id : null;
  }

  matchInputValues() {
    Object.values(this.blockDB).forEach((block) => { if (block.style === 'condition' || block.style === 'variable') block.arithmeticOrCompare(false); });
  }

  renderTopblocks() {
    this.topblocks.forEach((topblock) => {
      topblock.setAllBlockPosition();
    });
  }
};

export default Workspace;
