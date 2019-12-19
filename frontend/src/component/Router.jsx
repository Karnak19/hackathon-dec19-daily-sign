import React from 'react';
import { BrowserRouter, Switch, Route} from "react-router-dom";

import GoogleLogin from './GoogleLogin';
import Formpage from './Formpage';


function Router() {
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={GoogleLogin} />
                <Route path="/Formpage" component={Formpage} />
            </Switch>
        </BrowserRouter>
    )
};

export default Router;