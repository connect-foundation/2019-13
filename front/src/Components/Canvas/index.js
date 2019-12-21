import React, { useContext } from 'react';
import { Stage, Layer } from 'react-konva';
import PropTypes from 'prop-types';
import { SpritesContext } from '../../Context';
import URLImage from '../URLImage';
import { getCanvasSize } from '../../utils/canvasSize';

const canvasSize = getCanvasSize();
const Canvas = ({
  draggable,
  workspaceDispatch,
  setCurrentSprite,
}) => {
  const { sprites, spritesDispatch } = useContext(SpritesContext);
  return (
    <Stage width={canvasSize.WIDTH} height={canvasSize.HEIGHT}>
      <Layer>
        {Object.entries(sprites).map(sprite => (
          <URLImage
            draggable={draggable}
            key={sprite[0]}
            sprite={sprite[1]}
            spritekey={sprite[0]}
            spritesDispatch={spritesDispatch}
            setCurrentSprite={setCurrentSprite}
            workspaceDispatch={workspaceDispatch}
          />
        ))}
      </Layer>
    </Stage>
  );
};

Canvas.propTypes = {
  draggable: PropTypes.bool.isRequired,
  workspaceDispatch: PropTypes.func.isRequired,
  setCurrentSprite: PropTypes.func.isRequired,
};

export default Canvas;
