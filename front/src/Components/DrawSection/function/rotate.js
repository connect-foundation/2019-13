import Utils from '../../../utils/utils';
/**
 * @param {Number} movement 회전반경(0~360)
 * @param {String} type 'clock' => 시계방향으로 movement만큼 회전, 'anticlock' 반시계방향으로 movement만큼 회전,  designation => movement각도로 지정
 *
 */
export default (movement, type) => {
  console.log(Utils.getPosition);
  const { key, position, dispatch } = Utils.getPosition();
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
  dispatch({ type: 'ROTATE', key, value });
};
