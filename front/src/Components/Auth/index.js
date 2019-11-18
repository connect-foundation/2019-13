/* eslint-disable no-alert */
import React, { useContext } from 'react';
import { GoogleLogin } from 'react-google-login';
import sendRequest from '../../utils/SendRequest';
import { LoggedInContext, ModalContext } from '../../Context';
import { setLocalStorageItem } from '../../utils/storage';

export default () => {
  const { setLoggedIn } = useContext(LoggedInContext);
  const { setOpen } = useContext(ModalContext);
  const responseGoogle = async (response) => {
    const tokenBlob = new Blob(
      [JSON.stringify({ access_token: response.Zi.access_token }, null, 2)],
      { type: 'application/json' },
    );
    const data = await sendRequest({
      url: process.env.REACT_APP_AUTH_GOOGLE,
      method: 'post',
      body: tokenBlob,
    });
    if (!data.result) {
      alert('로그인이 되지 않았습니다. 다시 로그인해주세요');
      return;
    }
    setLocalStorageItem([{ key: 'token', value: data.token }, { key: 'userImage', value: response.profileObj.imageUrl }]);
    setLoggedIn(data.result);
    setOpen(!data.result);
  };
  return (
    <>
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        buttonText="구글계정으로 로그인하기"
        onSuccess={responseGoogle}
        // onFailure={responseGoogle}
        cookiePolicy="single_host_origin"
      />

    </>
  );
};
