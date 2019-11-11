import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginMain from '../Routes/LoginMain';
import Main from '../Routes/Main';

const LoggedInRoutes = () => (
  <>
    <Route exact path="/" component={LoginMain} />
  </>
);

const LoggedOutRoutes = () => (
  <>
    <Route exact path="/" component={Main} />
  </>
);

const AppRouter = ({ isLoggedIn = false }) => (
  <Router>
    <Switch>{isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />}</Switch>
  </Router>
);

AppRouter.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default AppRouter;
