import { useState } from 'react';

const defaultState = {
  open: false,
  vertical: 'top',
  horizontal: 'center',
};

export default (option) => {
  const [snackbar, setSnackbar] = useState({
    ...defaultState,
    ...option,
  });
  return [snackbar, setSnackbar];
};
