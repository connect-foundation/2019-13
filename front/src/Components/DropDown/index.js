import React, { useContext } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { LoggedInContext } from '../../Context';
import { removeLocalStorageItem } from '../../utils/storage';

const DropDown = ({ type = null }) => {
  const { setLoggedIn } = useContext(LoggedInContext);
  const logOutHandler = () => {
    localStorage.clear();
    setLoggedIn(false);
    window.location.href = '/';
  };
  const myPageHandler = () => {
    window.location.href = '/mypage';
  };

  const dropDownData = {
    Header: [
      {
        content: '마이페이지',
        onClick: myPageHandler,
      },
      {
        content: '로그아웃',
        onClick: logOutHandler,
      },
    ],
  };

  return (
    <DropDownContainer>
      {dropDownData[type].map(menu => (
        <DropDownMenuButton key={`${type}-${menu.content}`} onClick={menu.onClick}>
          {menu.content}
        </DropDownMenuButton>
      ))}
    </DropDownContainer>
  );
};

DropDown.propTypes = {
  type: PropTypes.string.isRequired,
};

export default DropDown;

const DropDownContainer = styled.div`
  position: absolute;
  top: 28;
  border: 1px solid gray;
  border-radius: 10px;
  width: 100%;
  margin-top: 20px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const DropDownMenuButton = styled.div`
  font-size: 20px;
  padding: 5px;
  margin: 5px;
  cursor: pointer;
`;
