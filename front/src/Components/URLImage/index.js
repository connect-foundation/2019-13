import React from 'react';
import { Image } from 'react-konva';
import Konva from 'konva';
import PropType from 'prop-types';
import useImage from '../../custom_hooks/useImage';
import CANVASCONSTANTS from '../Canvas/constants';

const URLImage = ({ sprite }) => {
  const [image] = useImage(sprite);
  const handleDragStart = (e) => {
    e.target.setAttrs({
      shadowOffset: {
        x: 15,
        y: 15,
      },
      scaleX: 1.1,
      scaleY: 1.1,
    });
  };
  const handleDragEnd = (e) => {
    e.target.to({
      duration: 0.5,
      easing: Konva.Easings.ElasticEaseOut,
      scaleX: 1,
      scaleY: 1,
      shadowOffsetX: 5,
      shadowOffsetY: 5,
    });
  };
  return (
    <Image
      x={CANVASCONSTANTS.CANVAS.WIDTH / 2 + Number(sprite.x)}
      y={CANVASCONSTANTS.CANVAS.HEIGHT / 2 + Number(sprite.y)}
      image={image}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      rotation={sprite.direction}
      offsetX={image ? image.width / 2 : 0}
      offsetY={image ? image.height / 2 : 0}
    />
  );
};


URLImage.propTypes = {
  sprite: PropType.object.isRequired,
};
export default URLImage;
