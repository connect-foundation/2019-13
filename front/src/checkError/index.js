import { removeLocalStorageItem } from '../utils/storage';

const ALERT_ERROR_MESSAGE = {
  NOT_AUTHORIZATION: '다시 로그인 해주세요',
  NETWORK_ERROR: '네트워크에 문제가 발생했습니다.',
  DEFAULT: '오류가 발생했습니다.',
};
const ErrorType = {
  ServerError: (code) => {
    if (code === '401') {
      removeLocalStorageItem(['token', 'userImage']);
      return ALERT_ERROR_MESSAGE.NOT_AUTHORIZATION;
    } return ALERT_ERROR_MESSAGE;
  },
  TypeError: () => ALERT_ERROR_MESSAGE.NETWORK_ERROR,
  default: () => ALERT_ERROR_MESSAGE.DEFAULT,
};

/**
 * @param {String} networkError
 */
export default (networkError) => {
  const findingCode = networkError.message.split(' ');
  const code = findingCode[findingCode.length - 1];
  const errorMessage = (ErrorType[networkError.name] || ErrorType.default)(code);
  return errorMessage;
};
