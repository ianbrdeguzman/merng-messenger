import React, { useContext } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { UserContext } from './context/userContext';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';

const App = () => {
    const { user: isLoggedIn } = useContext(UserContext);

    return (
        <BrowserRouter>
            <Switch>
                <Route path='/register'>
                    {isLoggedIn ? <Redirect to='/t' /> : <Register />}
                </Route>
                <Route path='/t'>
                    {isLoggedIn ? <Home /> : <Redirect to='/' />}
                </Route>
                <Route path='/*'>
                    {isLoggedIn ? <Redirect to='/t' /> : <Login />}
                </Route>
            </Switch>
        </BrowserRouter>
    );
};

export default App;
