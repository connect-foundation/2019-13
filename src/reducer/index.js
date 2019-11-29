import Workspace from '../Components/Block/workspace';
import CANVASCONSTANTS from '../Components/Canvas/constants';
import Utils from '../utils/utils';
/* eslint-disable import/prefer-default-export */

export const spritesReducer = (sprites, { type, coordinate, key, value }) => {
  const changeSprites = { ...sprites };
  const position = sprites[key];
  let eventValue = null;
  let inputEl = '';
  switch (type) {
    case 'CHANGE_POSITION':
      eventValue = value.charCodeAt(value.length - 1);
      if (eventValue === 45) {
        position[coordinate] = '-';
        changeSprites[key] = position;
        return changeSprites;
      }
      if (eventValue < 48 || eventValue > 57) return sprites;

      if (value[0] === '0' && value.length > 1) {
        inputEl = value.slice(1, value.length);
      } else {
        inputEl = value;
      }
      if (coordinate === 'x') {
        inputEl = Utils.checkRange(
          inputEl,
          -CANVASCONSTANTS.CANVAS.WIDTH / 2,
          CANVASCONSTANTS.CANVAS.WIDTH / 2,
        );
      } else if (coordinate === 'y') {
        inputEl = Utils.checkRange(
          inputEl,
          -CANVASCONSTANTS.CANVAS.HEIGHT / 2,
          CANVASCONSTANTS.CANVAS.HEIGHT / 2,
        );
      }
      position[coordinate] = inputEl;
      changeSprites[key] = position;
      return changeSprites;
    case 'CHANGE_SIZE':
      eventValue = value.charCodeAt(value.length - 1);
      if (eventValue < 48 || eventValue > 57 || value.includes('-')) return sprites;
      position.size = value;
      changeSprites[key] = position;
      return changeSprites;
    case 'CHANGE_DIRECTION':
      eventValue = value.charCodeAt(value.length - 1);
      if (eventValue < 48 || eventValue > 57 || value.includes('-')) return sprites;
      position.direction = value % 360;
      changeSprites[key] = position;
      return changeSprites;
    case 'DRAG_END':
    case 'MOVE':
      position.x = Utils.checkRange(
        value.x,
        -CANVASCONSTANTS.CANVAS.WIDTH / 2,
        CANVASCONSTANTS.CANVAS.WIDTH / 2,
      );
      position.y = Utils.checkRange(
        value.y,
        -CANVASCONSTANTS.CANVAS.HEIGHT / 2,
        CANVASCONSTANTS.CANVAS.HEIGHT / 2,
      );
      changeSprites[key] = position;
      return changeSprites;
    case 'ROTATE':
      position.direction = value.direction % 360;
      if (position.direction < 0) position.direction = 360 + position.direction;
      changeSprites[key] = position;
      return changeSprites;
    case 'BOUNCE':
      position.x = value.x;
      position.y = value.y;
      position.direction = value.direction;
      position.reversal = value.reversal;
      return changeSprites;
    case 'ADD_IMAGE':
      changeSprites[key] = value;
      return changeSprites;
    default:
      throw new Error('NOT FOUND TYPE');
  }
};
