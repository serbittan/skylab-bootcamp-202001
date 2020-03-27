import { validate } from 'diet-yourself-utils'
import { NotAllowedError } from 'diet-yourself-errors'
import context from './context'

const API_URL = process.env.REACT_APP_API_URL

const updateUser = function (username, age, weight, height, goal, activity, city , finalWeight , password, oldPassword) {
    validate.string(username, 'username')
    validate.type(age, 'age', Number)
    validate.type(weight, 'weight', Number)
    validate.type(height, 'height', Number)
    validate.string(goal, 'goal')
    validate.string(activity, 'activity')
    validate.string(city, 'city')
    validate.type(finalWeight, 'finalWeight')
    validate.string(password, 'password')
    validate.string(oldPassword, 'oldPassword')

    return (async () => {
        const response = await fetch(`${API_URL}/users`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.token}` 
            },
            body: JSON.stringify({ username, age, weight, height, goal, activity, city, finalWeight , password , oldPassword })
        })

        const { status } = response

        if (status === 201) return

        if (status >= 400 && status < 500) {
            const { error } = await response.json()

            if (status === 401) {
                throw new NotAllowedError(error)
            }

            throw new Error(error)
        }

        throw new Error('server error')
    })()

    
}.bind(context)

export default updateUser