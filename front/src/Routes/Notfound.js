import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Notfound = ({ history }) => {
  const backhandler = () => {
    history.push('/');
  };
  return (
    <Wrapper>
      <img src="/404theduck.png" alt="404image" />
      <h1>
        페이지를 찾을 수 없습니다.
      </h1>
      <h3>
        잘못된 url 주소입니다. 주소를 다시 확인하여 주세요.
      </h3>
      <button type="button" onClick={backhandler}>
        홈으로
      </button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 200px;
  display: flex;
  flex-direction: column;
  & > * {
    width:fit-content;
  }
  align-items: center;
  
  h1 {
    font-size: 60px;
  }
  h3 {
    margin-top: 25px;
    font-size: 20px;
  }
  button {
    cursor: pointer;
    margin-top: 30px;
    font-size: 15px;
    padding: 10px 18px;
    border-radius: 5px;
    border: none;
    font-weight:bold;
    color: white;
    background-color: ${props => props.theme.alertColor}
  }
`;

export default Notfound;


Notfound.propTypes = {
  history: PropTypes.object.isRequired,
};
