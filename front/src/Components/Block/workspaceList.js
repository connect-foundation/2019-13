const workspaceList = {
  workspaces: [],
  images: [],
  getWorkspaceIdxById: id => workspaceList.workspaces.findIndex((ws) => { if (ws.id === id) return true; return false; }),
};

export default workspaceList;
