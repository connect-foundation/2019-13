import Utils from './utils';
import { DEFAULT_CANVAS } from './canvasSize';

let tempLocation = Object.create(null);

export const getTempLocations = () => tempLocation;

export const getTempLocation = key => tempLocation[key];

export const setTempLocations = (locations) => {
  tempLocation = { ...locations };
};


export const setTempLocation = (key, value) => {
  if (value.x !== undefined) {
    tempLocation[key].x = Utils.checkRange(
      value.x,
      -DEFAULT_CANVAS.WIDTH / 2,
      DEFAULT_CANVAS.WIDTH / 2,
    );
  }
  if (value.y !== undefined) {
    tempLocation[key].y = Utils.checkRange(
      value.y,
      -DEFAULT_CANVAS.HEIGHT / 2,
      DEFAULT_CANVAS.HEIGHT / 2,
    );
  }
  if (value.direction !== undefined) {
    tempLocation[key].direction = value.direction > -1
      ? value.direction % 360
      : value.direction + 360;
  }
};
