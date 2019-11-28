
const BlockModelList = class {
  constructor(blockDB = new Map()) {
    this.blockDB = blockDB;
  }

  addBlock(blockmodel) {
    this.blockDB.set(blockmodel.id, blockmodel);
  }

  deleteBlock(usedId) {
    this.blockDB.delete(usedId);
  }

  getBlockDB() {
    return this.blockDB;
  }
};

export default BlockModelList;
