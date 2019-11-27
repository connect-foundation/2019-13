import { getPosition } from '../index';
import Utils from '../../../utils/utils';
/**
 * @param {Number} movement 회전반경(0~360)
 * @param {Boolean} type 시계방향(true), 반시계방향(false)
 *
 */
export default (movement, type) => {
  const { key, position, dispatch } = getPosition();
  const value = {
    direction: Utils.parseInt10(position.direction) + (type ? movement : -movement),
  };
  dispatch({ type: 'ROTATE', key, value });
};
