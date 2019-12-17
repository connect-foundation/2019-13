import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';
import LoginMain from '../Routes/LoginMain';
import Main from '../Routes/Main';
import Project from '../Routes/Project';
import Mypage from '../Routes/Mypage';
import Details from '../Routes/Details';
import NotFound from '../Routes/Notfound';

const LoggedInRoutes = () => (
  <Switch>
    <Route exact path="/" component={LoginMain} />
    <Route exact path="/project" component={Project} />
    <Route path="/Project/:name" component={Project} />
    <Route exact path="/mypage" component={Mypage} />
    <Route exact path="/details/:name" component={Details} />
    <Route path="*" component={NotFound} />
  </Switch>
);

const LoggedOutRoutes = () => (
  <Switch>
    <Route exact path="/" component={Main} />
    <Route exact path="/project" component={Project} />
    <Route path="/Project/:name" component={Project} />
    <Redirect from="/mypage" to="/" />
    <Route exact path="/mypage" component={Mypage} />
    <Route exact path="/details/:name" component={Details} />
    <Route path="*" component={NotFound} />
  </Switch>
);

const AppRouter = ({ isLoggedIn = false }) => (
  <>
    {isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />}
  </>
);

AppRouter.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default AppRouter;
