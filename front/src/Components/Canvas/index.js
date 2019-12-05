import React, { useContext } from 'react';
import { Stage, Layer } from 'react-konva';
import { SpritesContext, CurrentSpriteContext } from '../../Context';
import URLImage from '../URLImage';
import CONSTANTS from './constants';


export default () => {
  const { sprites, spritesDispatch } = useContext(SpritesContext);
  const { setCurrentSprite } = useContext(CurrentSpriteContext);
  return (
    <Stage width={CONSTANTS.CANVAS.WIDTH} height={CONSTANTS.CANVAS.HEIGHT}>
      <Layer>
        {Object.entries(sprites).map(sprite => (
          <URLImage
            key={sprite[0]}
            sprite={sprite[1]}
            spritekey={sprite[0]}
            spritesDispatch={spritesDispatch}
            setCurrentSprite={setCurrentSprite}
          />
        ))}
      </Layer>
    </Stage>
  );
};
