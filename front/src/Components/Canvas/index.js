import React, { useContext } from 'react';
import { Stage, Layer } from 'react-konva';
import { SpriteCoordinateContext } from '../../Context';
import URLImage from '../URLImage';
import CONSTANTS from './constants';

export default () => {
  const { sprites } = useContext(SpriteCoordinateContext);

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
