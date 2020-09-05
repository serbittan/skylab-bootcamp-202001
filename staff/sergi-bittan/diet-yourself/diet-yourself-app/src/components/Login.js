import React from 'react'
import Feedback from './Feedback'
import './Login.sass'


export default ({ onLogin, goToRegister, error }) => {
    return <div className="log">
        <header className="header-log">
            <a href="!#" onClick={event => {
                    event.preventDefault()
                    goToRegister()
                }}><i className="header-log__log fas fa-angle-left"></i></a>
            <h3 className="header-log__tt">Diet Yourself</h3>
        </header>

             
        <form className="login" onSubmit={event => {
            event.preventDefault()

            const email = event.target.email.value
            const password = event.target.password.value

            onLogin(email, password)
        }}>

            <input type="text" autoComplete="off" className="login__ac" name="email" placeholder="ejemplo@email.com" autoFocus="autofocus" />
            <input type="password" autoComplete="off" className="login__ac" name="password" placeholder="password" />
            <button className="login__in">Login</button>

        {error && <Feedback message={error} level="error" />} 
        
        </form>
    </div>
}