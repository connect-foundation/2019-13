/* eslint-disable import/no-cycle */
import { getPosition } from '../index';
import CANVASCONSTANTS from '../../Canvas/constants';
import Utils from '../../../utils/utils';
import { getCanvasSize } from '../../../utils/canvasSize';
/**
 * 문제점!!! => 모서리부분
 * param은 맨마지막에 움직일 값
 * @param {Number} x x 좌표이동 (선택)
 * @param {Number} y y 좌표이동 (선택)
 * @param {Number} moving 지금바라보는 방향으로 이동 (선택)
 * @param {Function} callback {move함수} => 모든 if을 통과할경우 move함수 실행하게 해놓음 //제일 마지막에 실행될 callback 함수
 */

const canvasSize = getCanvasSize();
export default ({ moving, x, y }, callback) => {
  const { key, position, dispatch } = getPosition();
  const width = canvasSize.WIDTH / 2;
  const height = canvasSize.HEIGHT / 2;
  const value = Utils.straightSprite({ position, movement: { moving } });
  let collisionX = width;
  let collisionY = height;
  let theta;
  let slope;
  if (value.x - Utils.parseInt10(position.x)) {
    slope = (value.y - Utils.parseInt10(position.y))
      / (value.x - Utils.parseInt10(position.x));
  }
  if (value.x >= width) {
    if (slope !== undefined) {
      collisionY = slope * (collisionX - Utils.parseInt10(position.x))
        + Utils.parseInt10(position.y);
    } else {
      collisionY = position.y;
    }
    if (value.y - Utils.parseInt10(position.y) === 0) {
      value.direction = 270;
    } else {
      theta = (Math.atan(
        (collisionY - Utils.parseInt10(position.y))
            / (collisionX - Utils.parseInt10(position.x)),
      )
          * 180)
        / Math.PI;
      value.direction = 270 - Math.round(theta) - 2;
    }
    value.x = width;
    value.y = collisionY;
    value.reversal = !position.reversal;
    dispatch({ type: 'BOUNCE', key, value });
  } else if (value.x <= -width) {
    if (slope !== undefined) {
      collisionY = slope * (collisionX - Utils.parseInt10(position.x))
        + Utils.parseInt10(position.y);
    } else {
      collisionY = position.y;
    }
    if (value.y - Utils.parseInt10(position.y) === 0) {
      value.direction = 90;
    } else {
      theta = (Math.atan(
        (collisionY - Utils.parseInt10(position.y))
            / (-collisionX - Utils.parseInt10(position.x)),
      )
          * 180)
        / Math.PI;
      value.direction = 90 - Math.round(theta) - 2;
    }
    value.x = -width;
    value.y = collisionY;
    value.reversal = !position.reversal;
    dispatch({ type: 'BOUNCE', key, value });
  } else if (value.y >= height) {
    if (slope !== undefined) {
      collisionX = (collisionY
          - Utils.parseInt10(position.y)
          + slope * Utils.parseInt10(position.x))
        / slope;
    } else {
      collisionX = position.x;
    }

    if (value.x - Utils.parseInt10(position.x) === 0) {
      value.direction = 0;
    } else {
      theta = (Math.atan(
        (collisionX - Utils.parseInt10(position.x))
            / (collisionY - Utils.parseInt10(position.y)),
      )
          * 180)
        / Math.PI;
      value.direction = (360 + Math.round(theta) + 2) % 360;
    }
    value.x = collisionX;
    value.y = height;
    value.reversal = !position.reversal;
    dispatch({ type: 'BOUNCE', key, value });
  } else if (value.y <= -height) {
    if (slope !== undefined) {
      collisionX = (collisionY
          - Utils.parseInt10(position.y)
          + slope * Utils.parseInt10(position.x))
        / slope;
    } else {
      collisionX = position.x;
    }
    if (value.x - Utils.parseInt10(position.x) === 0) {
      value.direction = 180;
    } else {
      theta = (Math.atan(
        (collisionX - Utils.parseInt10(position.x))
            / (-collisionY - Utils.parseInt10(position.y)),
      )
          * 180)
        / Math.PI;
      value.direction = (180 + Math.round(theta) + 2) % 360;
    }
    value.x = collisionX;
    value.y = -height;
    value.reversal = !position.reversal;
    dispatch({ type: 'BOUNCE', key, value });
  } else {
    let type;
    if (x && y) {
      type = 'xy';
    } else if (x) {
      type = 'x';
    } else if (y) {
      type = 'y';
    }
    callback({ x, y, moving }, type);
  }
};
