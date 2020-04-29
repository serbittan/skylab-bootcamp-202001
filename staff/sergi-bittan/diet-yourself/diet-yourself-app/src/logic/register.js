import { validate } from 'diet-yourself-utils'
const { NotAllowedError } = require('diet-yourself-errors')

//const { env: { REACT_APP_API_URL: API_URL } } = process

const API_URL = process.env.REACT_APP_API_URL

/**
 * Register user
 * 
 * @param {string} username user's username
 * @param {string} email user's email
 * @param {string} password user's password
 * @param {string} goal user's goal
 * @param {string} activity user's activity
 * @param {string} gender user's gender
 * @param {number} age user's age
 * @param {number} height user's height
 * @param {number} weight user's weight
 * @param {string} city user's city
 * @param {number} finalWeight user's finalWeight
 * 
 * @throws {NotAllowedError} if status >= 400 && status < 500
 * @throws {Error} server error
 */



const register =  function (username, email, password, goal, activity, gender, age, height, weight, city, finalWeight) {
    validate.string(username, 'username')
    validate.string(goal, 'goal')
    validate.string(activity, 'activity')
    validate.string(gender, 'gender')
    validate.type(age, 'age', Number)
    validate.type(height, 'height', Number)
    validate.type(weight, 'weight', Number)
    validate.type(finalWeight, 'finalWeight', Number)
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