import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { ClickAwayListener } from '@material-ui/core';
import Modal from './Modal';
import { ModalContext, LoggedInContext } from '../Context';
import DropDown from './DropDown';

export default () => {
  const { isLoggedIn } = useContext(LoggedInContext);
  const [dropMenu, setDropMenu] = useState(false);
  const [open, setOpen] = useState(false);
  const ModalHandler = () => {
    setOpen(!open);
  };
  const dropMenuHandler = () => {
    setDropMenu(!dropMenu);
  };
  return (
    <ModalContext.Provider value={{ open, setOpen }}>
      <Header>
        <HeaderColumn>
          <Link to="/">
            <img src="/logo.png" alt="logo" className="Header-icon logo" />
          </Link>
          <div className="header-link">
            <Link to="/project">
              <span> 프로젝트 만들기</span>
            </Link>
            {isLoggedIn ? (
              <Link to="/project">
                <span> 내 작품</span>
              </Link>
            ) : (
              undefined
            )}
          </div>
        </HeaderColumn>
        <HeaderColumn>
          {isLoggedIn ? (
            <ClickAwayListener
              onClickAway={() => {
                setDropMenu(false);
              }}
            >
              <div role="button" tabIndex="0" className="user_avatar" onClick={dropMenuHandler} onKeyPress={() => {}}>
                <img
                  className="user_avatar-img"
                  src={localStorage.getItem('userImage')}
                  alt="user_avatar"
                />
                <FontAwesomeIcon icon={faCaretDown} />
                {dropMenu && <DropDown type="Header" />}
              </div>
            </ClickAwayListener>
          ) : (
            <button type="button" onClick={ModalHandler}>
              로그인
            </button>
          )}
          {open && <Modal open={open} setOpen={setOpen} />}
        </HeaderColumn>
      </Header>
    </ModalContext.Provider>
  );
};

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index:23;
  padding: 0px 32px;
  width: 100%;
  height: 72px;
  background-color: ${props => props.theme.headerColor};
`;

const HeaderColumn = styled.div`
  display: flex;
  align-items: center;
  .logo {
    border-radius: 50%;
    width: 50px;
  }
  .header-link {
    margin-left: 30px;
    font-size: 18px;
  }
  .header-link > * {
    color: white;
    margin-right: 18px;
  }
  .user_avatar {
    flex-direction : column;
    min-width: 120px;
    text-align: right;
    position: relative;
    vertical-align: text-bottom;
  }
  .user_avatar > svg {
    margin-left: 10px;
    color: white;
  }
  .user_avatar-img {
    width: 40px;
    height: 40px;
    background: grey;
    object-fit: cover;
    border-radius: 10px;
  }
  button {
    background: none;
    border: none;
    color: white;
    font-size: 18px;
  }
`;
