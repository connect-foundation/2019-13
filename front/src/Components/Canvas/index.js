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
        {Object.values(sprites).map(sprite => (
          <URLImage sprite={sprite} />
        ))}
      </Layer>
    </Stage>
  );
};
