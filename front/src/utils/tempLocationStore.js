import Utils from './utils';
import { getCanvasSize } from './canvasSize';

let tempLocation = Object.create(null);

export const getTempLocations = () => tempLocation;

export const getTempLocation = key => tempLocation[key];

export const setTempLocations = (locations) => {
  tempLocation = { ...locations };
};

const canvasSize = getCanvasSize();


export const setTempLocation = (key, value) => {
  if (value.x !== undefined) {
    tempLocation[key].x = Utils.checkRange(
      value.x,
      -canvasSize.WIDTH / 2,
      canvasSize.WIDTH / 2,
    );
  }
  if (value.y !== undefined) {
    tempLocation[key].y = Utils.checkRange(
      value.y,
      -canvasSize.HEIGHT / 2,
      canvasSize.HEIGHT / 2,
    );
  }
  if (value.direction !== undefined) {
    tempLocation[key].direction = value.direction > -1
      ? value.direction % 360
      : value.direction + 360;
  }
  console.log(tempLocation[key]);
};
