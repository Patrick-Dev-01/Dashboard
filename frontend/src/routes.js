import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import NewProject from './pages/NewProject';
import Indicators from './pages/Indicators';
import Reports from './pages/Reports';
import Profile from './pages/Profile';

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/" exact component={Home} />
                <Route path="/project/new" component={NewProject} />
                <Route path="/indicators" component={Indicators} />
                <Route path="/reports" component={Reports} />
                <Route path="/profile" component={Profile} />
            </Switch>
        </BrowserRouter>
    );
}