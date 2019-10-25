import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Login from './components/Login'
import Dashboard from "./components/Dashboard";
import {Provider} from 'react-redux';
import getStore from './store';
import PrivateRoute from './components/private/PrivateRoute'


const store = getStore();

store.subscribe(() => {
    if(store.getState().auth.token){
        localStorage.setItem('token', store.getState().auth.token);
    }
});

function App() {
    return (
        <div className="App">
            <Provider store={store}>
                <BrowserRouter>
                    <Switch>
                        <PrivateRoute exact path="/" component={Dashboard} />
                        <Route exact path="/login" component={Login}/>
                        <PrivateRoute exact path="/dashboard" component={Dashboard}/>
                    </Switch>
                </BrowserRouter>
            </Provider>
        </div>
    );
}

export default App;
