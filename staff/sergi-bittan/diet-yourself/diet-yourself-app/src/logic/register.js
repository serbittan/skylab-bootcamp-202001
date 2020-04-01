import { validate } from 'diet-yourself-utils'
const { NotAllowedError } = require('diet-yourself-errors')

//const { env: { REACT_APP_API_URL: API_URL } } = process

const API_URL = process.env.REACT_APP_API_URL

const register =  function (username, email, password, goal, activity, gender, age, height, weight, city, finalWeight) {
    validate.string(username, 'username')
    validate.string(goal, 'goal')
    validate.string(activity, 'activity')
    validate.string(gender, 'gender')
    validate.type(age, 'age', Number)
    validate.type(height, 'height', Number)
    validate.type(weight, 'weight', Number)
    validate.type(finalWeight, 'afinalWeight', Number)
    validate.string(city, 'city')
    validate.string(email, 'email')
    validate.email(email)
    validate.string(password, 'password')
   
    return (async () => {
        const response = await fetch(`${API_URL}/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password, goal, activity, gender, age, height, weight, city, finalWeight })
        })

        const { status } = response

        if (status === 201) return

        if (status >= 400 && status < 500) {
            const { error } = await response.json()

            if (status === 409) {
                throw new NotAllowedError(error)
            }

            throw new Error(error)
        }

        throw new Error('server error')
    })()
}

export default register