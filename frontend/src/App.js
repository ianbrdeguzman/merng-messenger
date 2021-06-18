import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import { UserContextProvider } from './context/userContext';

const App = () => {
    return (
        <UserContextProvider>
            <Router>
                <Switch>
                    <Route path='/register' component={Register} />
                    <Route exact path='/t' component={Home} />
                    <Route exact path='/*' component={Login} />
                </Switch>
            </Router>
        </UserContextProvider>
    );
};

export default App;
