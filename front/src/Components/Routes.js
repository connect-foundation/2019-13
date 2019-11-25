import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import LoginMain from '../Routes/LoginMain';
import Main from '../Routes/Main';
import Project from '../Routes/Project';

const LoggedInRoutes = () => (
  <>
    <Route exact path="/" component={LoginMain} />
    <Route exact path="/project" component={Project} />
    <Route exact path="/mypage" component={Project}/>
  </>
);

const LoggedOutRoutes = () => (
  <>
    <Route exact path="/" component={LoginMain} />
    <Route exact path="/project" component={Project} />
    <Route exact path="/mypage" component={Project}/>
  </>
);

const AppRouter = ({ isLoggedIn = false }) => (
  <Switch>{isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />}</Switch>
);

AppRouter.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default AppRouter;
