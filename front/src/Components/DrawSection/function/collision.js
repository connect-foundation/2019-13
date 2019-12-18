/* eslint-disable no-continue */
import Utils from '../../../utils/utils';
import Obb from '../../../utils/obb';
import isOBBOverlap from '../../../utils/obb/isOBBOverlap';
import Vector2 from '../../../utils/vector2';
import { getTempLocation, getTempLocations } from '../../../utils/tempLocationStore';

/**
 * @param {Array<String>} collisionSprites 충돌여부를 확인 할 sprite들
 * @returns {Boolean} 충돌했으면 True 충돌하지 않았으면 false
 */
export default (collisionSprites, spritekey) => {
  const { allsprites } = Utils.getSprite();
  const position = getTempLocation(spritekey);
  for (let i = 0; i < collisionSprites.length; i += 1) {
    if (collisionSprites[i] === spritekey) continue;
    const sprite = allsprites[collisionSprites[i]];
    const o1 = new Obb(
      new Vector2(sprite.x, sprite.y),
      new Vector2(
        (sprite.width * sprite.size) / 100,
        (sprite.height * sprite.size) / 100,
      ),
      sprite.direction,
    );
    const o2 = new Obb(
      new Vector2(position.x, position.y),
      new Vector2(
        (position.width * position.size) / 100,
        (position.height * position.size) / 100,
      ),
      position.direction,
    );
    if (isOBBOverlap(o1, o2)) {
      return true;
    }
  }
  return false;
};
