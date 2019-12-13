import Utils from '../../../utils/utils';
/**
 * @param {Object} movement '{x, y} 좌표' or '{moving}(type undefined시)'
 * @param {String} type 'x', 'y','xy','locationX','locationY', default=> 현재 바라보는 방향에서 movement
 */
export default (movement, type) => {
  if (!type && !movement.moving) throw new Error('타입을 다시 입력해주세요');
  const { key, position, dispatch } = Utils.getPosition();
  let value;
  switch (type) {
    case 'x':
    case 'y':
    case 'xy':
      value = {
        x: Utils.parseInt10(position.x) + (movement.x || 0),
        y: Utils.parseInt10(position.y) + (movement.y || 0),
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
      value = Utils.straightSprite({ position, movement });
      break;
  }
  dispatch({ type: 'MOVE', key, value });
};
