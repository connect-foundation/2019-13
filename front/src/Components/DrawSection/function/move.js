import { getPosition } from '../index';
import Utils from '../../../utils/utils';
/**
 * @param {Object} movement '{x, y} 좌표' or '{moving}(type undefined시)'
 * @param {String} type 'x', 'y','xy','locationX','locationY', default=> 현재 바라보는 방향에서 movement
 */
export default (movement, type) => {
  if (!type && !movement.moving) throw new Error('타입을 다시 입력해주세요');
  const { key, position, dispatch } = getPosition();
  let value;
  switch (type) {
    case 'x':
    case 'y':
    case 'xy':
      value = {
        x: Utils.parseInt10(position.x) + movement.x || 0,
        y: Utils.parseInt10(position.y) + movement.y || 0,
      };
      break;
    case 'locationX':
      value = {
        x: movement.x || 0,
        y: Utils.parseInt10(position.y),
      };
      break;
    case 'locationY':
      value = {
        x: Utils.parseInt10(position.x),
        y: movement.y || 0,
      };
      break;
    default:
      value = {
        x:
          Utils.parseInt10(position.x)
          + Utils.parseInt10(
            movement.moving
              * Math.cos((Math.PI) * (position.direction - 90) / 180).toFixed(4),
          ),
        y:
          Utils.parseInt10(position.y)
          + Utils.parseInt10(
            movement.moving
              * Math.sin((Math.PI / 180) * (position.direction - 90)).toFixed(4),
          ),
      };
      break;
  }
  dispatch({ type: 'MOVE', key, value });
};
