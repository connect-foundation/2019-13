import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

const dummyUser = {
  username: '더덕',
  profile_img: 'https://i.pinimg.com/originals/97/ac/84/97ac849c388fc421278ce5b43b8e572b.jpg',
};


export default ({ isLoggedIn = false }) => (
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
        ) : (undefined)}
      </div>
    </HeaderColumn>
    <HeaderColumn>
      {isLoggedIn
        ? (
          <div className="user_avatar">
            {/* 여기에 유저 정보 모달 이벤트 달기 */}
            <img className="user_avatar-img" src={dummyUser.profile_img} alt="user_avatar" />
            <FontAwesomeIcon icon={faCaretDown} />
          </div>
        )
        : (<button type="button"> 로그인 </button>)
        }
    </HeaderColumn>
  </Header>
);


const Header = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    top: 0px;
    left: 0px;
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
        display: flex;
        align-items: center;
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
