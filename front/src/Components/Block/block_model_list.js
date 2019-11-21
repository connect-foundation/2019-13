import Block from './block';

const BlockModelList = class {
  constructor(blockDB) {
    this.blockDB = blockDB || Object.create(null);
  }

  addBlock(usedId) {
    return new Block(this, usedId);
  }

  deleteBlock(usedId) {
    delete this.blockDB[usedId];
  }

  getBlockById(blockId) {
    return this.blockDB[blockId];
  }

  getAll() {
    return this;
  }
};

export default BlockModelList;
