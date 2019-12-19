import Workspace from '../Components/Block/workspace';
import workspaceList from '../Components/Block/workspaceList';

export default (workspace, { type, blockParams, id }) => {
  let block = null;
  switch (type) {
    case 'ADD_BLOCK':
    { block = workspace.addBlock(id);
      workspace.addTopblock(block);
      block.makeFromJSON(blockParams);
      const nWorkspace = new Workspace(
        workspace.blockDB,
        workspace.topblocks,
        workspace.setRender,
        workspace.id,
        workspace.imageId,
      );
      workspaceList.workspaces.splice(
        workspaceList.getWorkspaceIdxById(workspace.id),
        1,
        nWorkspace,
      );
      return nWorkspace; }
    case 'DELETE_BLOCK':
    { workspace.deleteBlock(id);
      const nWorkspace = new Workspace(
        workspace.blockDB,
        workspace.topblocks,
        workspace.setRender,
        workspace.id,
        workspace.imageId,
      );
      workspaceList.workspaces.splice(
        workspaceList.getWorkspaceIdxById(workspace.id),
        1,
        nWorkspace,
      );
      return nWorkspace; }
    case 'SCROLL_END':
    { workspace.deleteBlockInModelList();
      const nWorkspace = new Workspace(
        workspace.blockDB,
        workspace.topblocks,
        workspace.setRender,
        workspace.id,
        workspace.imageId,
      );
      workspaceList.workspaces.splice(
        workspaceList.getWorkspaceIdxById(workspace.id),
        1,
        nWorkspace,
      );
      return nWorkspace; }
    case 'CHANGE_WORKSPACE':
    { let changedWorkspace;
      workspace.deleteBlockInModelList();
      workspaceList.workspaces.forEach((ws) => {
        if (ws.imageId === id) {
          changedWorkspace = new Workspace(
            ws.blockDB,
            ws.topblocks,
            workspace.setRender,
            ws.id,
            ws.imageId,
          );
        }
      });
      workspaceList.currentImageId = changedWorkspace.imageId;
      return changedWorkspace; }
    case 'SELECTED_WORKSPACE_DELETED':
      workspaceList.currentImageId = workspaceList.workspaces[id].imageId;
      return new Workspace(
        workspaceList.workspaces[id].blockDB,
        workspaceList.workspaces[id].topblocks,
        workspace.setRender,
        workspaceList.workspaces[id].id,
        workspaceList.workspaces[id].imageId,
      );
    default:
      throw new Error('NOT FOUND TYPE');
  }
};
