import Generator from '../Components/Block/generator';

let interval;
let isPlay = false;
const generator = new Generator();

export const getIsPlay = () => isPlay;

export const start = (workspace, isStartMode) => {
  if (isStartMode && isPlay) {
    clearInterval(interval);
    workspace.resetKey();
    isPlay = false;
  }
  const startCodes = isStartMode
    ? generator.workspaceToCode(workspace.getStartBlocks())
    : undefined;
  isPlay = true;
  const eventCodes = Object.entries(workspace.getEventBlocks())
    .reduce((pre, [key, value]) => pre.set(key, generator.workspaceToCode(value, true)), new Map());
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

    eventCodes.forEach((value, key) => {
      if (workspace.keyDown[key]) {
        const res = value.func.next();
        if (res) {
          if (res.value < value.limit) {
            isEnd = false;
          } else {
            workspace.setKeyDown(key, false);
          }
        }
      }
    });
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
