import React, { useContext } from 'react';
import { Stage, Layer, Group } from 'react-konva';
import PropTypes from 'prop-types';
import { SpritesContext, CurrentSpriteContext } from '../../Context';
import URLImage from '../URLImage';
import CONSTANTS from './constants';

const Canvas = ({ WIDTH = CONSTANTS.CANVAS.WIDTH, HEIGHT = CONSTANTS.CANVAS.HEIGHT }) => {
  const { sprites, spritesDispatch } = useContext(SpritesContext);
  const { setCurrentSprite } = useContext(CurrentSpriteContext);
  return (
    <Stage width={WIDTH} height={HEIGHT}>
      <Layer>
        {Object.entries(sprites).map(sprite => (
          <Group>
            <URLImage
              key={sprite[0]}
              sprite={sprite[1]}
              spritekey={sprite[0]}
              spritesDispatch={spritesDispatch}
              setCurrentSprite={setCurrentSprite}
            />
          </Group>
        ))}
      </Layer>
    </Stage>
  );
};

Canvas.propTypes = {
  WIDTH: PropTypes.number.isRequired,
  HEIGHT: PropTypes.number.isRequired,
};

export default Canvas;
