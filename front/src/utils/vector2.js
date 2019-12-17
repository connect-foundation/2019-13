class Vector2 {
  /**
     * @constructor
     * @param {Number} x
     * @param {Number} y
     */
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  dot(v2) {
    return this.x * v2.x + this.y * v2.y;
  }
}

export default Vector2;
