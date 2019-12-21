import Utils from '../../utils/utils';
import { getTempLocation, setTempLocation } from '../../utils/tempLocationStore';
/**
 * @param {String} spritekey spritekey
 * @param {Number} movement 회전반경(0~360)
 * @param {String} type 'clock' 시계방향으로 movement만큼 회전,
 *                      'anticlock' 반시계방향으로 movement만큼 회전,  'designation' movement로 지정
 *
 */
export default ({ spritekey, movement }, type) => {
  const position = getTempLocation(spritekey);
  let value;
  switch (type) {
    case 'clock':
      value = {
        direction: Utils.parseInt10(position.direction) + movement,
      };
      break;
    case 'anticlock':
      value = {
        direction: Utils.parseInt10(position.direction) - movement,
      };
      break;
    case 'designation':
      value = {
        direction: movement,
      };
      break;
    default:
      throw new TypeError('NOT FOUND TYPE');
  }
  setTempLocation(spritekey, value);
};
