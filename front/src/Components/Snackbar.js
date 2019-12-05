import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import styled from 'styled-components';

export default ({ snackbar, setSnackbar }) => {
  const { vertical, horizontal, open, message, color } = snackbar;
  const handleClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };
  return (
    <CustomSnackbar
      color={color}
      anchorOrigin={{ vertical, horizontal }}
      key={`${vertical},${horizontal}`}
      open={open}
      onClose={handleClose}
      autoHideDuration={2000}
      ContentProps={{
        'aria-describedby': 'message-id',
      }}
      message={<span id="message-id">{message}</span>}
      action={[<CloseIcon onClick={handleClose} />]}
    />
  );
};

const CustomSnackbar = styled(Snackbar)`
  & > div {
    background-color: ${props => props.theme[props.color]};
  }
  svg:hover {
    cursor: pointer;
  }
`;