import { validate } from 'diet-yourself-utils'
import { NotAllowedError } from 'diet-yourself-errors'
import context from './context'

const API_URL = process.env.REACT_APP_API_URL

const updateUser = function (user) {
    const { username, age, weight, height, goal, activity, city, finalWeight, password, oldPassword } = user
    for (const key in user){
        if (!user[key])  delete user[key]

        const stringKeys = ['username', 'goal', 'activity', 'city', 'password', 'oldPassword']
        const numberKeys = ['age', 'weight', 'height','finalWeight']
        
        if (stringKeys.includes(key)) validate.string(user[key], `${user[key]}`)
        if (numberKeys.includes(key)) validate.type(user[key], `${user[key]}`, Number)
        // if ( typeof user[key] === 'string') validate.string(user[key], `${user[key]}`)
        // if (typeof user[key] === 'number') validate.type(user[key], `${user[key]}`, Number)
    }
    
    if (password && !oldPassword) throw new Error('oldPassword is not defined')
    if (!password && oldPassword) throw new Error('password is not defined')

    const keys = Object.keys(user)

    const validKeys = ['username', 'age', 'weight', 'height', 'goal', 'activity', 'city', 'finalWeight', 'password', 'oldPassword']

    for (const key of keys){
        if (!validKeys.includes(key)) throw new NotAllowedError(`property ${key} is not allowed)`)
    }

    
    return (async () => {
        const response = await fetch(`${API_URL}/users`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.token}` 
            },
            body: JSON.stringify(user)
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