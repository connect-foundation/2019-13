import Utils from '../../../utils/utils';


const haveIntersection = (r1, r2) => !(
  r2.x > r1.x + r1.width * (r1.size / 100)
        || r2.x + r2.width * (r2.size / 100) < r1.x
        || r2.y > r1.y + (r1.height * (r1.size / 100))
        || r2.y + (r2.height * (r2.size / 100)) < r1.y
);


export default (callback) => {
  const { key, position, dispatch, allsprites } = Utils.getPosition();
  Object.entries(allsprites).forEach((sprite) => {
    if (sprite[0] === key) return;
    if (haveIntersection(sprite[1], position)) {
      console.log('collision');
      // callback(); Callback 코드 완성시 console.log 지워주면됩니다.
    } else { console.log('not collision'); }
  });
};
