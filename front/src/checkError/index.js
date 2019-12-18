import { removeLocalStorageItem } from '../utils/storage';

const ALERT_ERROR_MESSAGE = {
  NOT_AUTHORIZATION: '다시 로그인 해주세요',
};
const ErrorType = {
  401: () => {
    removeLocalStorageItem(['token', 'userImage']);
    return ALERT_ERROR_MESSAGE.NOT_AUTHORIZATION;
  },
  default: () => null,
};

/**
 * @param {String} message
 */
export default (message) => {
  const splits = message.split(' ');
  const ErrorCode = splits[splits.length - 1];
  const errorMessage = (ErrorType[ErrorCode] || ErrorType.default)();
  return errorMessage;
};
