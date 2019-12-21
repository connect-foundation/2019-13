import React, { useContext, useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';
import SaveIcon from '@material-ui/icons/Save';
import { SpritesContext } from '../../Context';
import Utils from '../../utils/utils';
import { getIsPlay } from '../../utils/playBlocks';
import Snackbar from '../Snackbar';
import useSnackbar from '../../custom_hooks/useSnackbar';

const imageRegExp = /image\/(bmp|jpg|jpeg|tiff|png|svg\+xml)$/i;

const useStyles = makeStyles(theme => ({
  speedDial: {
    position: 'absolute',
    '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  },
}));

const uploadHandler = ({ snackbar, setSnackbar }) => {
  if (getIsPlay()) {
    setSnackbar({
      ...snackbar,
      open: true,
      message: '실행시 이미지를 업로드 할 수 없습니다.',
      color: 'alertColor',
    });
    return;
  }
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
  const [snackbar, setSnackbar] = useSnackbar();

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
        setSnackbar({
          ...snackbar,
          open: true,
          message: '이미지 파일이 아닙니다.',
          color: 'alertColor',
        });
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const loadImage = new Image();
        loadImage.src = reader.result;
        loadImage.onload = () => {
          const size = Utils.checkImageSize({ width: loadImage.width, height: loadImage.height });
          const value = {
            name: file.name,
            type: file.type,
            url: event.target.result,
            size,
            direction: 90,
            width: loadImage.width,
            height: loadImage.height,
            x: 0,
            y: 0,
            file,
          };
          spritesDispatch({ type: 'ADD_IMAGE', key: Utils.uid(), value });
        };
      };
      reader.readAsDataURL(file);
      image.current.value = '';
    });
  };
  const onClickhandlerFunction = (callbacks) => {
    const func = (e) => {
      callbacks.forEach((callback) => {
        callback({ e, snackbar, setSnackbar });
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
      <Snackbar snackbar={snackbar} setSnackbar={setSnackbar} />
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
