import * as React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {Typography} from "./domain";
import {App} from "./App";

export default (
    <Switch>
        <Route path="/typography" component={() => <Typography/>}/>
        <Route path="/" component={() => <App/>}/>

        <Redirect to="/"/>
    </Switch>
);
