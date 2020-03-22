import React from 'react'
// import Feedback from './Feedback'
// import './Login.sass'


export default ({ onLogin, error }) => {
    return <div>
        <form onSubmit={event => {
            event.preventDefault()

            const email = event.target.email.value
            const password = event.target.password.value

            onLogin(email, password)
        }}>

            <input type="text" class="login__mail" name="mail" placeholder="ejemplo@mail.com" />
            <input type="text" class="login__password" name="password" placeholder="password" />
            <button class="login__acces">Login</button>

        </form>
        {/* {error && <Feedback message={error} level="error" />} */}
    </div>
}