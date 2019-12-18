import React, { useContext } from 'react';
import { Stage, Layer, Group } from 'react-konva';
import PropTypes from 'prop-types';
import { SpritesContext } from '../../Context';
import URLImage from '../URLImage';
import CONSTANTS from './constants';

const Canvas = ({
  draggable,
  workspaceDispatch,
  setCurrentSprite,
  WIDTH = CONSTANTS.CANVAS.WIDTH,
  HEIGHT = CONSTANTS.CANVAS.HEIGHT,
}) => {
  const { sprites, spritesDispatch } = useContext(SpritesContext);
  return (
    <Stage width={WIDTH} height={HEIGHT}>
      <Layer>
        {Object.entries(sprites).map(sprite => (
          <Group>
            <URLImage
              draggable={draggable}
              key={sprite[0]}
              sprite={sprite[1]}
              spritekey={sprite[0]}
              spritesDispatch={spritesDispatch}
              setCurrentSprite={setCurrentSprite}
              workspaceDispatch={workspaceDispatch}
            />
          </Group>
        ))}
      </Layer>
    </Stage>
  );
};

Canvas.propTypes = {
  draggable: PropTypes.bool.isRequired,
  workspaceDispatch: PropTypes.func.isRequired,
  setCurrentSprite: PropTypes.func.isRequired,
  WIDTH: PropTypes.number.isRequired,
  HEIGHT: PropTypes.number.isRequired,
};

export default Canvas;
