class Login extends Interactive {
    constructor(props) {
        super(document.createElement('form'))

        const login = this.container

        login.classList.add('login')

        login.innerHTML = `<h2>Sign-in</h2>
            <input type="text" name="username" placeholder="username" value="ericaig">
            <input type="password" name="password" placeholder="password" value="123">
            <button>Login</button>
            <a href="">Register</a>`

        login.addEventListener('submit', function (event) {
            event.preventDefault()

            const username = this.username.value
            const password = this.password.value

            props.onSubmit(username, password)
        })

        const register = login.querySelector('a')

        register.addEventListener('click', event => {
            event.preventDefault()

            props.onToRegister()
        })
    }

    __locateFeedbackInContainer__(feedback) {
        const button = this.container.querySelector('button')
        this.container.insertBefore(feedback.container, button)
    }
}