import Workspace from '../Components/Block/workspace';

/* eslint-disable import/prefer-default-export */

export const workspaceReducer = (workspace, { blockParams }) => {
  const block = workspace.addBlock();
  block.makeFromJSON(blockParams);
  return new Workspace(workspace.blockDB);
};
