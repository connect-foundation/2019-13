import React from 'react';
import { Image } from 'react-konva';
import Konva from 'konva';
import PropType from 'prop-types';
import useImage from '../../customHooks/useImage';
import Theme from '../../Styles/Theme';
import { getCanvasSize } from '../../utils/canvasSize';


const canvasSize = getCanvasSize();
const URLImage = ({
  draggable,
  sprite,
  spritekey,
  spritesDispatch,
  setCurrentSprite,
  workspaceDispatch,
}) => {
  const [image] = useImage(sprite);
  if (!draggable) {
    return (
      <Image
        x={canvasSize.WIDTH / 2 + Number(sprite.x)}
        y={canvasSize.HEIGHT / 2 + Number(sprite.y)}
        image={image}
        scale={canvasSize.SCALE}
        scaleY={sprite.reversal ? -1 : 1}
        rotation={(sprite.direction - 90) % 360}
        offsetX={image ? image.width / 2 : 0}
        offsetY={image ? image.height / 2 : 0}
      />
    );
  }

  const handleDragStart = (e) => {
    e.target.setAttrs({
      shadowOffset: {
        x: 15,
        y: 15,
      },
      shadowColor: Theme.shadowColor,
    });
  };
  const handleDragMove = (e) => {
    spritesDispatch({
      type: 'DRAG_MOVE',
      key: spritekey,
      value: {
        x: e.target.attrs.x - canvasSize.WIDTH / 2,
        y: e.target.attrs.y - canvasSize.HEIGHT / 2,
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
    spritesDispatch({
      type: 'DRAG_END',
      key: spritekey,
      value: {
        x: e.target.attrs.x - canvasSize.WIDTH / 2,
        y: e.target.attrs.y - canvasSize.HEIGHT / 2,
      },
    });
  };
  const handleMouseDown = () => {
    setCurrentSprite({ key: spritekey, position: sprite });
    workspaceDispatch({ type: 'CHANGE_WORKSPACE', id: spritekey });
  };
  return (
    <Image
      x={canvasSize.WIDTH / 2 + Number(sprite.x)}
      y={canvasSize.HEIGHT / 2 + Number(sprite.y)}
      image={image}
      onMouseDown={handleMouseDown}
      draggable
      scale={canvasSize.SCALE}
      scaleY={sprite.reversal ? -1 : 1}
      onDragStart={handleDragStart}
      onDragMove={handleDragMove}
      onDragEnd={handleDragEnd}
      rotation={(sprite.direction - 90) % 360}
      offsetX={image ? image.width / 2 : 0}
      offsetY={image ? image.height / 2 : 0}
    />
  );
};

URLImage.propTypes = {
  draggable: PropType.bool.isRequired,
  sprite: PropType.object.isRequired,
  spritekey: PropType.string.isRequired,
  spritesDispatch: PropType.func.isRequired,
  setCurrentSprite: PropType.func.isRequired,
  workspaceDispatch: PropType.func.isRequired,
};
export default URLImage;
