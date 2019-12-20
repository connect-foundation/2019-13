import React from 'react';
import styled from 'styled-components';
import GitHubIcon from '@material-ui/icons/GitHub';

export default () => (
  <Footer>
    <a href="https://github.com/connect-foundation/2019-13">
      <GitHubIcon />
    </a>
    <h5>
        더덕은 부스트캠프 2019 멤버십 그룹 프로젝트입니다.
    </h5>
    <h5>
        본 사이트의 소스코드는 모두 Github에 공개되어 있으며 자세한 사항은
      <a href="https://github.com/connect-foundation/2019-13/wiki"> Github 위키 </a>
        를 참조하시기 바랍니다.
    </h5>
    <h5>
        Copyright © 2019 Boostcamp.
    </h5>
  </Footer>
);

const Footer = styled.footer`
  position:relative;
  height: 150px;
  bottom: 0px;
  width:100%;
  text-align:center;
  color: #575e75;
  border-top: ${props => props.theme.mainBorder}
  background-color: ${props => props.theme.footerColor}
  padding: 20px;
  h5 {
    font-size: 14px;
    margin-top: 10px;
  }
`;
