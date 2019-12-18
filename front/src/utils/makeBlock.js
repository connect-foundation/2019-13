import Init from '../Components/Block/Init';

const connectBlock = (connected, position, connect) => {
  const reverse = {
    nextElement: 'previousElement',
    firstChildElement: 'parentElement',
    secondChildElement: 'parentElement',
  };
  connected[position] = connect;
  connect[reverse[position]] = connected;
};

export default (Blocks, workspace) => {
  const blockTypes = {};
  Init.forEach((data) => {
    data.forEach((datum) => { blockTypes[datum.type] = datum; });
  });
  Blocks.forEach((blockData) => {
    const block = workspace.addBlock(blockData.id);
    const dataJSON = blockTypes[blockData.type];
    dataJSON.x = blockData.positionX;
    dataJSON.y = blockData.positionY;
    block.x = blockData.positionX;
    block.y = blockData.positionY;
    block.makeFromJSON(dataJSON);
  });
  Blocks.forEach((blockData) => {
    const block = workspace.getBlockById(blockData.id);
    if (blockData.nextElementId) {
      connectBlock(block, 'nextElement', workspace.getBlockById(blockData.nextElementId));
    }
    if (blockData.firstChildElementId) {
      connectBlock(block, 'firstChildElement', workspace.getBlockById(blockData.firstChildElementId));
    }
    if (blockData.secondChildElementId) {
      connectBlock(block, 'secondChildElement', workspace.getBlockById(blockData.secondChildElementId));
    }
    if (blockData.inputElementId) {
      block.inputElement = blockData.inputElementId.map(v => ({ type: 'input', value: v }));
    }
  });
  Blocks.forEach((blockData) => {
    const block = workspace.getBlockById(blockData.id);
    if (!block.parentElement && !block.previousElement) {
      workspace.addTopblock(block);
    }
  });
};
