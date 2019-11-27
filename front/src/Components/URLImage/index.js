import React from 'react';
import { Image } from 'react-konva';
import Konva from 'konva';
import PropType from 'prop-types';
import useImage from '../../custom_hooks/useImage';
import CANVASCONSTANTS from '../Canvas/constants';

const URLImage = ({ sprite, spritekey, spritesDispatch }) => {
  const [image] = useImage(sprite);
  const handleDragStart = (e) => {
    e.target.setAttrs({
      shadowOffset: {
        x: 15,
        y: 15,
      },
    });
  };
  const handleDragMove = (e) => {
    spritesDispatch({
      type: 'DRAG_END',
      key: spritekey,
      value: {
        x: e.target.attrs.x - CANVASCONSTANTS.CANVAS.WIDTH / 2,
        y: e.target.attrs.y - CANVASCONSTANTS.CANVAS.HEIGHT / 2,
      },
    });
  };
  const handleDragEnd = (e) => {
    e.target.to({
      duration: 0.5,
      easing: Konva.Easings.ElasticEaseOut,
      scaleX: 1,
      scaleY: 1,
      shadowOffsetX: 0,
      shadowOffsetY: 0,
    });
  };
  return (
    <Image
      x={CANVASCONSTANTS.CANVAS.WIDTH / 2 + Number(sprite.x)}
      y={CANVASCONSTANTS.CANVAS.HEIGHT / 2 + Number(sprite.y)}
      image={image}
      draggable
      onDragStart={handleDragStart}
      onDragMove={handleDragMove}
      onDragEnd={handleDragEnd}
      rotation={sprite.direction}
      offsetX={image ? image.width / 2 : 0}
      offsetY={image ? image.height / 2 : 0}
    />
  );
};

URLImage.propTypes = {
  sprite: PropType.object.isRequired,
  spritekey: PropType.string.isRequired,
  spritesDispatch: PropType.func.isRequired,
};
export default URLImage;