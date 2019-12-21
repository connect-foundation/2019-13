import Workspace from '../core/blocks/workspace/workspace';
import workspaceList from '../core/blocks/workspace/workspaceList';

export default (workspace, { type, blockParams, id }) => {
  let block = null;
  switch (type) {
    case 'ADD_BLOCK':
    { block = workspace.addBlock(id);
      workspace.addTopblock(block);
      block.makeFromJSON(blockParams);
      const nWorkspace = new Workspace({
        blockDB: workspace.blockDB,
        topblocks: workspace.topblocks,
        setRender: workspace.setRender,
        id: workspace.id,
        imageId: workspace.imageId,
      });
      workspaceList.workspaces.splice(
        workspaceList.getWorkspaceIdxById(workspace.id),
        1,
        nWorkspace,
      );
      return nWorkspace; }
    case 'DELETE_BLOCK':
    { workspace.deleteBlock(id);
      const nWorkspace = new Workspace({
        blockDB: workspace.blockDB,
        topblocks: workspace.topblocks,
        setRender: workspace.setRender,
        id: workspace.id,
        imageId: workspace.imageId,
      });
      workspaceList.workspaces.splice(
        workspaceList.getWorkspaceIdxById(workspace.id),
        1,
        nWorkspace,
      );
      return nWorkspace; }
    case 'SCROLL_END':
    { workspace.deleteBlockInModelList();
      const nWorkspace = new Workspace({
        blockDB: workspace.blockDB,
        topblocks: workspace.topblocks,
        setRender: workspace.setRender,
        id: workspace.id,
        imageId: workspace.imageId,
      });
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
          changedWorkspace = new Workspace({
            blockDB: ws.blockDB,
            topblocks: ws.topblocks,
            setRender: workspace.setRender,
            id: ws.id,
            imageId: ws.imageId,
          });
        }
      });
      workspaceList.currentImageId = changedWorkspace.imageId;
      return changedWorkspace; }
    case 'SELECTED_WORKSPACE_DELETED':
      workspaceList.currentImageId = workspaceList.workspaces[id].imageId;
      return new Workspace({
        blockDB: workspaceList.workspaces[id].blockDB,
        topblocks: workspaceList.workspaces[id].topblocks,
        setRender: workspace.setRender,
        id: workspaceList.workspaces[id].id,
        imageId: workspaceList.workspaces[id].imageId,
      });
    default:
      throw new Error('NOT FOUND TYPE');
  }
};
