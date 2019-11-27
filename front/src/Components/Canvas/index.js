import React, { useContext } from 'react';
import { Stage, Layer } from 'react-konva';
import { SpritesContext } from '../../Context';
import URLImage from '../URLImage';
import CONSTANTS from './constants';

export default () => {
  const { sprites, spritesDispatch } = useContext(SpritesContext);

  return (
    <Stage width={CONSTANTS.CANVAS.WIDTH} height={CONSTANTS.CANVAS.HEIGHT}>
      <Layer>
        {Object.values(sprites).map((sprite, idx) => (
          <URLImage
            sprite={sprite}
            spritekey={Object.keys(sprites)[idx]}
            spritesDispatch={spritesDispatch}
          />
        ))}
      </Layer>
    </Stage>
  );
};