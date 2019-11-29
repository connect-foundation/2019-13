const Workspace = class {
  constructor(topblocks) {
    this.topblocks = topblocks || [];
  }
  getStartBlocks() {
    const blocks = [];
    this.topblocks.forEach((block) => {
      if (block.type === 'event_start' && block.nextElement) blocks.push(block.nextElement);
    });
    return blocks;
  }
};

export default Workspace;
