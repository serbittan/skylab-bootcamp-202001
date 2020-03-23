import React from 'react'
// import Feedback from './Feedback'


export default function ({ onRegister, error }) {
    return (
        <div>
            <form className="register" onSubmit={event => {
                event.preventDefault()

                const email = event.target.email.value
                const password = event.target.password.value
                const userName = event.targer.username.value

                onRegister(email, password, userName)
            }}>
                <input type="text" class="register__mail" name="mail" placeholder="exemple@mail.com" />
                <input type="text" class="register__password" name="password" placeholder="password" />
                <input type="text" class="register__username" name="username" placeholder="username" />
                <button class="register__acces">Register</button>

            </form>
            {/* {error && <Feedback message={error} level="error" />} */}
        </div>
    );
};