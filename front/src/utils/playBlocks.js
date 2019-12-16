import Generator from '../Components/Block/generator';
import WorkspaceList from '../Components/Block/workspaceList';


let interval;
let isPlay = false;
const generator = new Generator();
export const getIsPlay = () => isPlay;
const workspacelist = WorkspaceList.workspaces;


export const start = (isStartMode) => {
  if (isStartMode && isPlay) {
    clearInterval(interval);
    WorkspaceList.resetKey();
    isPlay = false;
  }
  isPlay = true;

  const startCodes = isStartMode
    ? workspacelist.reduce((pre, ws) => [...pre, ...generator.workspaceToCode(ws.getStartBlocks(ws),
      false, ws.imageId)], [])
    : undefined;

  const eventCodes = workspacelist.map(ws => Object.entries(ws.getEventBlocks())
    .reduce((pre, [key, value]) => {
      let data = value.map(block => generator.workspaceToCode(block, true, ws.imageId));
      const preData = pre.get(key);
      if (preData) {
        data = [...preData, ...data];
      }
      return pre.set(key, data);
    }, new Map()));
  interval = setInterval(() => {
    let isEnd = true;
    if (startCodes) {
      startCodes.forEach((code) => {
        const res = code.func.next();
        if (res && !res.done) {
          isEnd = false;
        }
      });
    }
    if (eventCodes) {
      eventCodes.forEach(ws => ws.forEach((value, key) => {
        if (WorkspaceList.keyDown[key]) {
          value.forEach((code) => {
            const res = code.func.next();
            if (res) {
              if (res.value < code.limit) {
                isEnd = false;
              } else {
                WorkspaceList.setKeyDown(key, false);
              }
            }
          });
        }
      }));
    }
    if (isEnd) {
      clearInterval(interval);
      isPlay = false;
    }
  }, 1000 / 30);
};

export const stop = () => {
  if (interval) {
    clearInterval(interval);
    isPlay = false;
  }
};
