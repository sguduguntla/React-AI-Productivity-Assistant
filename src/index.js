import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Container } from 'reactstrap';
import RequireAuth from './components/RequireAuth';

import store from './reducers';

import App from './components/App';
import StartupScreen from './screens/StartupScreen';
import DashboardScreen from './screens/DashboardScreen';
import ProfileScreen from './screens/ProfileScreen';

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
        <App>
            <Switch>
                <Route path="/profile" component={RequireAuth(ProfileScreen)} />
                <Route path="/dashboard" component={RequireAuth(DashboardScreen)} />
                <Route exact path="/" component={StartupScreen} />
            </Switch>
        </App>
  </HashRouter>
  </Provider>,
  document.getElementById('root')
);