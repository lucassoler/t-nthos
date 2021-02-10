import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import SignIn from '../../lib/adapters/primaries/react/identification/auth/signIn.container';
import IdentificationList from '../../lib/adapters/primaries/react/identification/identificationList.container';

function Router() {
  return (
    <BrowserRouter>
      <Switch>
          <Route exact path="/" component={SignIn} />
          <Route exact path="/identification" component={IdentificationList} />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;