import React from 'react';
import {render} from 'react-dom';
import '@babel/polyfill';
import appRoutes from './App/App.routes';
import {BrowserRouter} from 'react-router-dom';
import {Root} from "./App/domain";

const Application = (): React.ReactElement => {
    return (
        <React.StrictMode>
            <BrowserRouter>
                <Root>
                    {appRoutes}
                </Root>
            </BrowserRouter>
        </React.StrictMode>
    )
}

render(<Application/>, document.getElementById('root'));
