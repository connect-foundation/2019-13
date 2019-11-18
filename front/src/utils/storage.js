/* eslint-disable import/prefer-default-export */
import PropTypes from 'prop-types';
/**
 *
 * @param {Array} options
 */
const setLocalStorageItem = (options) => {
  options.forEach((option) => {
    localStorage.setItem(option.key, option.value);
  });
};

/**
 *
 * @param {Array} keys
 */
const removeLocalStorageItem = (keys) => {
  keys.forEach((key) => {
    localStorage.removeItem(key);
  });
};
/**
 *
 * @param {Array} keys
 */
const getLocalStorageItem = keys => keys.map(key => localStorage.getItem(key));


setLocalStorageItem.propTypes = {
  options: PropTypes.array.isRequired,
};
removeLocalStorageItem.propTypes = {
  options: PropTypes.array.isRequired,
};
getLocalStorageItem.propTypes = {
  options: PropTypes.array.isRequired,
};
export {
  setLocalStorageItem,
  removeLocalStorageItem,
  getLocalStorageItem,
};
