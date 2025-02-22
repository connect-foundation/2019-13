const DEFAULT_CANVAS = {
  WIDTH: 480,
  HEIGHT: 320,
};
const SCALE_CANVAS = {
  DEFAULT: 1,
  DETAIL: 1.75,
};
const canvasSize = {};

const setCanvasSize = (type) => {
  canvasSize.WIDTH = SCALE_CANVAS[type] * DEFAULT_CANVAS.WIDTH;
  canvasSize.HEIGHT = SCALE_CANVAS[type] * DEFAULT_CANVAS.HEIGHT;
  canvasSize.SCALE = SCALE_CANVAS[type];
  return canvasSize;
};
const getCanvasSize = () => canvasSize;

export {
  setCanvasSize,
  getCanvasSize,
  DEFAULT_CANVAS,
};
