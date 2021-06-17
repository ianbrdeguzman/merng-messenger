import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './pages/login/Login';
import Register from './pages/register/Register';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path='/register' component={Register} />
                <Route path='/' component={Login} />
            </Switch>
        </Router>
    );
};

export default App;
