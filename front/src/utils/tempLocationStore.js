import Utils from './utils';
import CANVASCONSTANTS from '../Components/Canvas/constants';

let tempLocation = Object.create(null);

export const getTempLocations = () => tempLocation;

export const getTempLocation = key => tempLocation[key];

export const setTempLocations = (locations) => {
  tempLocation = { ...locations };
};


export const setTempLocation = (key, value) => {
  if (value.x) {
    tempLocation[key].x = Utils.checkRange(
      value.x,
      -CANVASCONSTANTS.CANVAS.WIDTH / 2,
      CANVASCONSTANTS.CANVAS.WIDTH / 2,
    );
  }
  if (value.y) {
    tempLocation[key].y = Utils.checkRange(
      value.y,
      -CANVASCONSTANTS.CANVAS.HEIGHT / 2,
      CANVASCONSTANTS.CANVAS.HEIGHT / 2,
    );
  }
  if (value.direction !== undefined) {
    tempLocation[key].direction = value.direction > -1
      ? value.direction % 360
      : value.direction + 360;
  }
};
