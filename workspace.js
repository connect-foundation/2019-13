/* eslint-disable class-methods-use-this */
import Block from './block';
import Dragging from './dragging';
import ConnectionDB from './connection_db';

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
  
  getBlockById(blockId) {
    return this.blockDB[blockId];
  }

  extractCoreData() {
    return Object.values(this.blockDB).map(b => ({
      id: b.id,
      type: b.type,
      positionX: b.x,
      positionY: b.y,
      nextElementId: this.getBlockId(b.nextElement),
      firstChildElementId: this.getBlockId(b.firstchildElement),
      secondChildElementId: this.getBlockId(b.secondchildElement),
      inputElementId: b.inputElement.map(input => (input.id ? input.id : input.value.toString())),
    }));
  }

  getBlockId(block) {
    return block ? block.id : null;
  }
};

export default Workspace;
