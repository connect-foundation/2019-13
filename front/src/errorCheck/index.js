import { removeLocalStorageItem } from '../utils/storage';

const ALERT_ERROR_MESSAGE = {
  NOT_AUTHORIZATION: '다시 로그인 해주세요',
  DEFAULT: '오류가 발생했습니다.',
};
const ErrorType = {
  401: () => {
    removeLocalStorageItem(['token', 'userImage']);
    return ALERT_ERROR_MESSAGE.NOT_AUTHORIZATION;
  },
  default: () => ALERT_ERROR_MESSAGE.DEFAULT,
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
