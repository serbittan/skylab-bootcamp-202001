import React from 'react'
import Feedback from './Feedback'
import './Login.sass'


export default ({ onLogin, error }) => {
    return <div>
        <form className="login" onSubmit={event => {
            event.preventDefault()

            const email = event.target.email.value
            const password = event.target.password.value

            onLogin(email, password)
        }}>

            <input type="text" className="login__mail" name="email" placeholder="ejemplo@email.com" autoFocus="autofocus" />
            <input type="password" className="login__password" name="password" placeholder="password" />
            <button className="login__acces">Login</button>

        </form>
        {error && <Feedback message={error} level="error" />} 
    </div>
}