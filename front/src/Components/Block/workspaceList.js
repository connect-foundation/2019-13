const workspaceList = {
  workspaces: [],
  images: [],
  keyDown: Object.create(null),
  setKeyDown(keyNum, condition) {
    this.keyDown[keyNum] = condition;
  },
  resetKey() {
    workspaceList.keyDown = Object.create(null);
    return true;
  },
  getWorkspaceIdxById(id) {
    return workspaceList.workspaces.findIndex((ws) => {
      if (ws.id === id) return true; return false;
    });
  },
};

export default workspaceList;
