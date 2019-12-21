import React from 'react';
import MaterialSnackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Snackbar = ({ snackbar, setSnackbar }) => {
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

const CustomSnackbar = styled(MaterialSnackbar)`
  & > div {
    background-color: ${props => props.theme[props.color]};
  }
  svg:hover {
    cursor: pointer;
  }
`;
Snackbar.propTypes = {
  snackbar: PropTypes.object.isRequired,
  setSnackbar: PropTypes.func.isRequired,
};
export default Snackbar;
