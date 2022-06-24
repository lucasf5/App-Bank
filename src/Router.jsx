import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

const Router = () => (
  <Switch>
    <Route path="/" component={ Login } />
    <Route path="/carteira" component={ Wallet } />
  </Switch>
);

export default Router;
