import { validate } from 'diet-yourself-utils'
import { NotAllowedError } from 'diet-yourself-errors'
import context from './context'

const API_URL = process.env.REACT_APP_API_URL

const updateUser = function (user) {
    for (const key in user){
        if (!user[key])  delete user[key]
    
        if ( typeof user[key] === 'string') validate.string(user[key], `${user[key]}`)
        if (typeof user[key] === 'number') validate.type(user[key], `${user[key]}`, Number)
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