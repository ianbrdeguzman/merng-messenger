import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path='/register' component={Register} />
                <Route path='/login' component={Login} />
                <Route exact path='/' component={Home} />
            </Switch>
        </Router>
    );
};

export default App;
