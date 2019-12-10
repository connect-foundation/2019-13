import Workspace from '../Components/Block/workspace';
import CANVASCONSTANTS from '../Components/Canvas/constants';
import Utils from '../utils/utils';
/* eslint-disable import/prefer-default-export */

export const workspaceReducer = (workspace, { type, blockParams, id }) => {
  let block = null;
  switch (type) {
    case 'ADD_BLOCK':
      block = workspace.addBlock(id);
      workspace.addTopblock(block);
      block.makeFromJSON(blockParams);
      return new Workspace(
        workspace.blockDB,
        workspace.topblocks,
        workspace.setRender,
      );
    case 'DELETE_BLOCK':
      workspace.deleteBlock(id);
      return new Workspace(
        workspace.blockDB,
        workspace.topblocks,
        workspace.setRender,
      );
    case 'SCROLL_END':
      workspace.deleteBlockInModelList();
      return new Workspace(
        workspace.blockDB,
        workspace.topblocks,
        workspace.setRender,
      );
    default:
      throw new Error('NOT FOUND TYPE');
  }
};

export const spritesReducer = (sprites, { type, coordinate, key, value, images }) => {
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
    case 'DRAG_MOVE':
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
    case 'DRAG_END':
      position.x = Utils.checkRange(
        value.x,
        -CANVASCONSTANTS.CANVAS.WIDTH / 2 + 1,
        CANVASCONSTANTS.CANVAS.WIDTH / 2 - 1,
      );
      position.y = Utils.checkRange(
        value.y,
        -CANVASCONSTANTS.CANVAS.HEIGHT / 2 + 1,
        CANVASCONSTANTS.CANVAS.HEIGHT / 2 - 1,
      );
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
    case 'LOAD_PROJECT':
      return images.reduce((prev, curr) => {
        // eslint-disable-next-line no-param-reassign
        prev[curr.id] = { ...curr, x: curr.positionX, y: curr.positionY };
        return prev;
      }, {});
      // changeSprites[key] = value;
    default:
      throw new Error('NOT FOUND TYPE');
  }
};
