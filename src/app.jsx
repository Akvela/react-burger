import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AppHeader } from './components/app-header/app-header'
import { Home, Login, Register, ForgotPassword, ResetPassword } from './pages';

export default function App() {
  return (
    <>
      <AppHeader />
      <Router>
        <Switch>
          <Route path="/login" exact={true}>
            <Login />
          </Route>
          <Route path="/register" exact={true}>
            <Register />
          </Route>
          <Route path="/forgot-password" exact={true}>
            <ForgotPassword />
          </Route>
          <Route path="/reset-password" exact={true}>
            <ResetPassword />
          </Route>
          <Route path="/" exact={true}>
            <Home />
          </Route>
        </Switch>
      </Router>
    </>
    
  );
}
