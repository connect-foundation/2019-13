import Utils from './utils';
import { DEFUALT_CANVAS } from './canvasSize';

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
      -DEFUALT_CANVAS.WIDTH / 2,
      DEFUALT_CANVAS.WIDTH / 2,
    );
  }
  if (value.y !== undefined) {
    tempLocation[key].y = Utils.checkRange(
      value.y,
      -DEFUALT_CANVAS.HEIGHT / 2,
      DEFUALT_CANVAS.HEIGHT / 2,
    );
  }
  if (value.direction !== undefined) {
    tempLocation[key].direction = value.direction > -1
      ? value.direction % 360
      : value.direction + 360;
  }
};
