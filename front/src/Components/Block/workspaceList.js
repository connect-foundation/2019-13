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
  setInsertMarker: null,
  showInsertMarker(type, x, y) {
    if (this.setInsertMarker) {
      this.setInsertMarker({ type, x, y });
    }
  },
  hideInsertMarker() {
    this.showInsertMarker('', 0, 0);
  },
};

export default workspaceList;
