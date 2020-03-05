import React from "react"



export default function Register({onRegister, onToLogin}) {
    return <form className="register" onSubmit={event => {
        event.preventDefault()

        const name = event.target.name.value
        const surname = event.target.surname.value
        const email = event.target.email.value
        const password = event.target.password.value

        onRegister(name, surname, email, password)

    }}>
         <h2>Sing-in</h2>

        <input type="text" name="name" placeholder="name" />
        <input type="text" name="surname" placeholder="surname" />
        <input type="text" name="email" placeholder="email" />
        <input type="password" name="password" placeholder="password" />
        <button>Register</button>
        <a href="" onClick={event => {
            event.preventDefault()

            onToLogin()
        }}>Login</a>
    </form>

}







