import Block from './block';

const Workspace = class {
  constructor() {
    this.WorkspaceDB = Object.create(null);
  }

  addBlock(usedId) {
    return new Block(this, usedId);
  }

  getBlockById(blockId) {
    return this.WorkspaceDB[blockId];
  }

  getAll() {
    return this;
  }
};

export default Workspace;
