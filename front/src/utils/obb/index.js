import Vector2 from '../vector2';
import Utils from '../utils';

class Obb {
  /**
   * @constructor
   * @param {Vector2} pivot
   * @param {Vector2} size
   * @param {Number} direction
   */
  constructor(pivot, size, direction) {
    this.pivot = pivot;
    this.size = size;
    this.direction = direction;
  }

  local2World() {
    const verts = new Array(4);
    verts[0] = new Vector2(-this.size.x * 0.5, -this.size.y * 0.5);
    verts[1] = new Vector2(this.size.x * 0.5, -this.size.y * 0.5);
    verts[2] = new Vector2(this.size.x * 0.5, this.size.y * 0.5);
    verts[3] = new Vector2(-this.size.x * 0.5, this.size.y * 0.5);
    for (let i = 0; i < verts.length; i += 1) {
      const v = new Vector2(verts[i].x, verts[i].y);
      verts[i].x = v.x * Math.cos(Utils.radian(this.direction - 90))
        - v.y * Math.sin(Utils.radian(this.direction - 90))
        + this.pivot.x;
      verts[i].y = v.x * Math.sin(Utils.radian(this.direction - 90))
        + v.y * Math.cos(Utils.radian(this.direction - 90))
        + this.pivot.y;
    }
    return verts;
  }
}
export default Obb;
