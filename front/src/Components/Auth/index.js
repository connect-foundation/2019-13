import React from 'react';
import { GoogleLogin } from 'react-google-login';
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';yar
import sendRequest from '../../utils/SendRequest';


export default () => {
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
    if (data) return true;
    return false;
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
