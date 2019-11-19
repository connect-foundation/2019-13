import Block from './block';

const Workspace = class {
  constructor() {
    this.blockDB = Object.create(null);
  }

  addBlock(usedId) {
    return new Block(this, usedId);
  }

  getBlockById(blockId) {
    return this.blockDB[blockId];
  }

  getAll() {
    return this;
  }
};

export default Workspace;
