import BlockModel from './blockmodel';

const BlockModelList = class {
  constructor(blockDB = {}) {
    this.blockDB = blockDB;
  }

  addBlock(block) {
    this.blockDB[block.id] = block;
  }

  deleteBlock(usedId) {
    delete this.blockDB[usedId];
  }

  getBlockDB() {
    return this.blockDB;
  }
};

export default BlockModelList;
