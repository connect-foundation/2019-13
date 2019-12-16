import Vector2 from '../vector2';
import Utils from '../utils';

export default (o1, o2) => {
  // find axes
  const axes = [];
  axes[0] = new Vector2(
    Math.cos(Utils.radian(o1.direction - 90)),
    Math.sin(Utils.radian(o1.direction - 90)),
  );
  axes[1] = new Vector2(
    -Math.sin(Utils.radian(o1.direction - 90)),
    Math.cos(Utils.radian(o1.direction - 90)),
  );
  axes[2] = new Vector2(
    Math.cos(Utils.radian(o2.direction - 90)),
    Math.sin(Utils.radian(o2.direction - 90)),
  );
  axes[3] = new Vector2(
    -Math.sin(Utils.radian(o2.direction - 90)),
    Math.cos(Utils.radian(o2.direction - 90)),
  );
  const verts1 = o1.local2World();
  const verts2 = o2.local2World();
  // project vertices to each axis
  for (let i = 0; i < axes.length; i += 1) {
    let min1 = Number.MAX_VALUE;
    let max1 = -Number.MAX_VALUE;
    let ret1;
    for (let j = 0; j < verts1.length; j += 1) {
      ret1 = verts1[j].dot(axes[i]);
      min1 = min1 > ret1 ? ret1 : min1;
      max1 = max1 < ret1 ? ret1 : max1;
    }
    let min2 = Number.MAX_VALUE;
    let max2 = -Number.MAX_VALUE;
    let ret2;
    for (let j = 0; j < verts2.length; j += 1) {
      ret2 = verts2[j].dot(axes[i]);
      min2 = min2 > ret2 ? ret2 : min2;
      max2 = max2 < ret2 ? ret2 : max2;
    }
    // overlap check
    const r1 = max1 - min1;
    const r2 = max2 - min2;
    const r = (max1 > max2 ? max1 : max2) - (min1 < min2 ? min1 : min2);
    if (r1 + r2 <= r) {
      return false;
    }
  }
  return true;
};
