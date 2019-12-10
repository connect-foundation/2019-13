import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import LoginMain from '../Routes/LoginMain';
import Main from '../Routes/Main';
import Project from '../Routes/Project';
import Mypage from '../Routes/Mypage';
import Details from '../Routes/Details';

const LoggedInRoutes = () => (
  <>
    <Route exact path="/" component={LoginMain} />
    <Route exact path="/project" component={Project} />
    <Route path="/Project/:name" component={Project} />
    <Route exact path="/mypage" component={Mypage} />
    <Route exact path="/details/:name" component={Details} />
  </>
);

const LoggedOutRoutes = () => (
  <>
    <Route exact path="/" component={Main} />
    <Route exact path="/project" component={Project} />
    <Route path="/Project/:name" component={Project} />
    <Route exact path="/mypage" component={Mypage} />
    <Route exact path="/details/:name" component={Details} />
  </>
);

const AppRouter = ({ isLoggedIn = false }) => (
  <Switch>{isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />}</Switch>
);

AppRouter.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default AppRouter;
