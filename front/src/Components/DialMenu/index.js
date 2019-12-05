import React, { useContext, useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';
import SaveIcon from '@material-ui/icons/Save';
import { SpritesContext } from '../../Context';
import Utils from '../../utils/utils';

const imageRegExp = /image\/(bmp|jpg|jpeg|tiff|png|svg)$/i;

const useStyles = makeStyles(theme => ({
  speedDial: {
    position: 'absolute',
    '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  },
}));

const uploadHandler = () => {
  document.all.uploadImage.click();
};
const copyHandler = () => {};

const actions = [
  { icon: <FileCopyIcon />, name: '이미지 복사', clickHandlers: [copyHandler] },
  { icon: <SaveIcon />, name: '이미지 추가', clickHandlers: [uploadHandler] },
];

export default () => {
  const classes = useStyles();
  const image = useRef();
  const [direction] = useState('up');
  const [open, setOpen] = useState(false);
  const { spritesDispatch } = useContext(SpritesContext);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const changeHandler = (e) => {
    const { files } = e.target;
    const filesArr = Array.prototype.slice.call(files);
    filesArr.forEach((file) => {
      if (!file.type.match(imageRegExp)) {
        window.alert('이미지 파일이 아닙니다.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const value = {
          url: event.target.result,
          size: 100,
          direction: 90,
          x: 0,
          y: 0,
        };
        spritesDispatch({ type: 'ADD_IMAGE', key: Utils.uid(), value });
      };
      reader.readAsDataURL(file);
    });
  };
  const onClickhandlerFunction = (callbacks) => {
    const func = (e) => {
      callbacks.forEach((callback) => {
        callback(e);
      });
    };
    return func;
  };
  return (
    <>
      <SpeedDial
        ariaLabel="Image Block"
        className={classes.speedDial}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
        direction={direction}
      >
        {actions.map(action => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={onClickhandlerFunction([
              ...action.clickHandlers,
              handleClose,
            ])}
          />
        ))}
      </SpeedDial>
      <input
        type="file"
        ref={image}
        accept={['.png', '.jpg', '.jpeg', '.svg', '.bmp']}
        name="uploadImage"
        style={{ display: 'none' }}
        onChange={changeHandler}
      />
    </>
  );
};
