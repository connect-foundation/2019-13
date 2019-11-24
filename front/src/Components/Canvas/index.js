import React, { useContext } from 'react';
import { Stage, Layer } from 'react-konva';
import { SpriteCoordinateContext } from '../../Context';
import URLImage from '../URLImage';

export default () => {
  const { sprites } = useContext(SpriteCoordinateContext);

  return (
    <Stage width="600" height="400">
      <Layer>
        {Object.values(sprites).map(sprite => (
          <URLImage sprite={sprite} />
        ))}
      </Layer>
    </Stage>
  );
};
