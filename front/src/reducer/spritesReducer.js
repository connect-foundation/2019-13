import Workspace from '../Components/Block/workspace';
import Utils from '../utils/utils';
import workspaceList from '../Components/Block/workspaceList';
import { getCanvasSize } from '../utils/canvasSize';
/* eslint-disable import/prefer-default-export */
const canvasSize = getCanvasSize();

export default (sprites, { type, coordinate, key, value, images, tempLocations }) => {
  const changeSprites = { ...sprites };
  const position = sprites[key];
  const curLocations = { ...tempLocations };
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
          -canvasSize.WIDTH / 2,
          canvasSize.WIDTH / 2,
        );
      } else if (coordinate === 'y') {
        inputEl = Utils.checkRange(
          inputEl,
          -canvasSize.HEIGHT / 2,
          canvasSize.HEIGHT / 2,
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
    case 'CHANGE_NAME':
      workspaceList.dropdownItems.sprite[key] = value;
      position.name = value;
      changeSprites[key] = position;
      return changeSprites;
    case 'DRAG_MOVE':
      position.x = Utils.checkRange(
        value.x,
        -canvasSize.WIDTH / 2,
        canvasSize.WIDTH / 2,
      );
      position.y = Utils.checkRange(
        value.y,
        -canvasSize.HEIGHT / 2,
        canvasSize.HEIGHT / 2,
      );
      changeSprites[key] = position;
      return changeSprites;
    case 'DRAG_END':
      position.x = Utils.checkRange(
        value.x,
        -canvasSize.WIDTH / 2 + 1,
        canvasSize.WIDTH / 2 - 1,
      );
      position.y = Utils.checkRange(
        value.y,
        -canvasSize.HEIGHT / 2 + 1,
        canvasSize.HEIGHT / 2 - 1,
      );
      return changeSprites;
    case 'BOUNCE':
      position.x = value.x;
      position.y = value.y;
      position.direction = value.direction;
      position.reversal = value.reversal;
      return changeSprites;
    case 'UPDATE_POSITION':
      return curLocations;
    case 'ADD_IMAGE':
      workspaceList.dropdownItems.sprite[key] = value.name;
      changeSprites[key] = value;
      workspaceList.images.push(key);
      workspaceList.workspaces.push(new Workspace(null, null, null, null, key));
      return changeSprites;
    case 'DELETE_IMAGE':
    { let { length } = workspaceList.workspaces;
      for (let i = 0; i < length; i += 1) {
        if (workspaceList.workspaces[i].imageId === key) {
          delete workspaceList.workspaces[i].dragging;
          delete workspaceList.workspaces[i].connectionDB;
          delete workspaceList.workspaces[i].blockDB;
          delete workspaceList.workspaces[i];
          workspaceList.workspaces.splice(i, 1);
          workspaceList.images.splice(i, 1);
          i -= 1;
          length -= 1;
        }
      }
      delete workspaceList.dropdownItems.sprite[key];
      delete changeSprites[key];
      return changeSprites; }
    case 'LOAD_PROJECT':
      return images.reduce((prev, curr) => {
        // eslint-disable-next-line no-param-reassign
        prev[curr.id] = { ...curr, x: curr.positionX, y: curr.positionY };
        return prev;
      }, {});
    default:
      throw new Error('NOT FOUND TYPE');
  }
};
