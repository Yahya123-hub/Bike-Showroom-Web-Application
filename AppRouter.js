import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Dashboard from './flatpanel_UI/src/App';
import SignUpSignIn from './sign-in-sign-up-app/src/App';


function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/signup" component={SignUp} />
        <Route path="/signin" component={SignIn} />
      </Switch>
    </Router>
  );
}

export default AppRouter;
