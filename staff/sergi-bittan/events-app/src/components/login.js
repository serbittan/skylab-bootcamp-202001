import React from "react"

export default function Login({ onLogin, onToRegister }) {
    return <form className="login" onSubmit={event => {
        event.preventDefault()

        const email = event.target.email.value
        const password = event.target.password.value

        onLogin(email, password)
    }}>

        <h2>Login</h2>
        <input type="text" name="email" placeholder="name" />
        <input type="password" name="password" placeholder="password" />
        <button>Login</button>
        <a href="" onClick={event => {
            event.preventDefault()

            onToRegister()
        }}>Go Register</a>
        </form>
}