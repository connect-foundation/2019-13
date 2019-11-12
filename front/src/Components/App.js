import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router } from 'react-router-dom';
import GlobalStyles from '../Styles/GlobalStyles';
import Theme from '../Styles/Theme';
import Routes from './Routes';
import Header from './Header';

const Wrapper = styled.div`
    margin-top: 72px;
`;

export default () => {
  const isLoggedIn = true;
  return (
    <ThemeProvider theme={Theme}>
      <>
        <GlobalStyles />
        <Router>
          <Header isLoggedIn={isLoggedIn} />
          <Wrapper>
            <Routes isLoggedIn={isLoggedIn} />
          </Wrapper>
        </Router>
      </>
    </ThemeProvider>
  );
};
