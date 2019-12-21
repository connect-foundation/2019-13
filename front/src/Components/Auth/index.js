import React, { useContext, useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import FaceBookLogin from 'react-facebook-login';
import styled from 'styled-components';
import sendRequest from '../../utils/SendRequest';
import { LoggedInContext, ModalContext } from '../../Context';
import { setLocalStorageItem } from '../../utils/storage';
import Snackbar from '../Snackbar';
import useSnackbar from '../../custom_hooks/useSnackbar';

const AUTH_ERROR = {
  NOT_LOGIN: '로그인이 되지 않았습니다. 다시 로그인 해주세요',
  NETWORT_ERROR: '서버와 통신이 되지 않습니다. 다시 시도해주세요',
};

export default () => {
  const { setLoggedIn } = useContext(LoggedInContext);
  const { setOpen } = useContext(ModalContext);
  const [snackbar, setSnackbar] = useSnackbar();
  const responseGoogle = async (response) => {
    const tokenBlob = new Blob(
      [JSON.stringify({ access_token: response.Zi.access_token }, null, 2)],
      { type: 'application/json' },
    );
    try {
      const data = await sendRequest({
        url: process.env.REACT_APP_AUTH_GOOGLE,
        method: 'post',
        body: tokenBlob,
      });
      if (!data.result) {
        setSnackbar({ ...snackbar, open: true, message: AUTH_ERROR.NOT_LOGIN });
        return;
      }
      setLocalStorageItem([
        { key: 'token', value: data.token },
        { key: 'userImage', value: response.profileObj.imageUrl },
      ]);
      setLoggedIn(data.result);
      setOpen(!data.result);
    } catch (error) {
      setSnackbar({
        ...snackbar,
        open: true,
        message: AUTH_ERROR.NETWORT_ERROR,
        color: 'alertColor',
      });
    }
  };
  const responseFacebook = async (response) => {
    const body = JSON.stringify({
      access_token: response.accessToken,
    });
    try {
      const data = await sendRequest({
        url: process.env.REACT_APP_AUTH_FACEBOOK,
        method: 'post',
        body,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!data.result) {
        setSnackbar({ ...snackbar, open: true, message: AUTH_ERROR.NOT_LOGIN, color: 'alertColor' });
        return;
      }
      setLocalStorageItem([
        { key: 'token', value: data.token },
        { key: 'userImage', value: response.picture.data.url },
      ]);
      setLoggedIn(data.result);
      setOpen(!data.result);
    } catch (e) {
      setSnackbar({
        ...snackbar,
        message: AUTH_ERROR.NETWORT_ERROR,
      });
    }
  };
  return (
    <AuthWrapper>
      <GoogleLogin
        style={{ border: '1px solid black' }}
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        buttonText="구글 계정으로 로그인하기"
        onSuccess={responseGoogle}
        cookiePolicy="single_host_origin"
      />
      <FaceBookLogin
        appId={process.env.REACT_APP_FACEBOOK_CLIENT_ID}
        fields="name,email,picture"
        callback={responseFacebook}
        icon="fa-facebook"
        textButton="페이스북 계정으로 로그인하기"
      />
      <Snackbar snackbar={snackbar} setSnackbar={setSnackbar} />
    </AuthWrapper>
  );
};
const AuthWrapper = styled.div`
  display : flex;
  flex-direction: column;
  button {
    width : 100%;
    height : 100%;
    margin-bottom : 15px;
    .fa.fa-facebook {
      padding-right : 10px;
    }
  }
  button:nth-child(1){
    border: 1px solid black !important;
    div {
      margin-left : 5px;
      padding : 6px 10px 0px 10px !important;
     
    }
    span {
        color: black;
        font-size : calc(.27548vw + 12.71074px) !important;
        font-weight:bold !important;
    }
  }
  
`;
