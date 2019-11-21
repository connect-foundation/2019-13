import Workspace from '../Components/Block/workspace';
/* eslint-disable import/prefer-default-export */

export const workspaceReducer = (workspace, { type, blockParams, id }) => {
  let block = null;
  switch (type) {
    case 'ADD_BLOCK':
      block = workspace.addBlock(id);
      block.makeFromJSON(blockParams);
      return new Workspace(workspace.blockDB);
    case 'DELETE_BLOCK':
      workspace.deleteBlock(id);
      return new Workspace(workspace.blockDB);
    default:
      throw new Error('NOT FOUND TYPE');
  }
};
