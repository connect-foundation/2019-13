import Init from '../Components/Block/Init';

const connectBlock = (connected, position, connect, i) => {
  const reverse = {
    nextElement: 'previousElement',
    firstChildElement: 'parentElement',
    secondChildElement: 'parentElement',
    inputElement: 'outputElement',
  };
  if (position === 'inputElement') {
    connect.arithmeticOrCompare(false);
    connected[position][i] = { type: 'block', id: connect.id };
  } else connected[position] = connect;
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
    if (blockData.inputElementId.length > 0) {
      blockData.inputElementId.forEach((v, i) => {
        if (workspace.getBlockById(v)) {
          connectBlock(block, 'inputElement', workspace.getBlockById(blockData.inputElementId), i);
        } else {
          block.inputElement[i] = { type: 'input', value: v };
        }
      });
    }
  });
  Blocks.forEach((blockData) => {
    const block = workspace.getBlockById(blockData.id);
    if (!block.parentElement && !block.previousElement) {
      workspace.addTopblock(block);
    }
  });
};
