import React, { useState } from 'react'
import { Switch, Route, withRouter, Redirect } from 'react-router-dom'
import { Login, Register } from '../components'
import { isLoggedIn } from '../logic'
import './App.sass'

export default withRouter(function ({ history }) {
    const handleRegister = async (email, password) => {
        try {

        } catch ({message}) {
            console.log(message);
        }
    }

    const handleLogin = async (email, password, username) => {
        try {

        } catch ({message}) {
            console.log(message);
        }
    }

    console.log(isLoggedIn());

    return (
        <div className="App">
            <Switch>
                <Route exact path="/" render={() => isLoggedIn() ? <Redirect to="/landing" /> : <Register onRegister={handleRegister} error={'error-test'} />} />
                <Route exact path="/login" render={() => isLoggedIn() ? <Redirect to="/landing" /> : <Login onLogin={handleLogin} error={'error-test'} />} />
                <Route exact path="/register" render={() => isLoggedIn() ? <Redirect to="/landing" /> : <Register onRegister={handleRegister} error={'error-test'} />} />
                
                <p>Route not found</p>
            </Switch>
        </div>
    );
})