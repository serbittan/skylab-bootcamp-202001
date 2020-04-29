import { validate } from 'diet-yourself-utils'
import { NotAllowedError } from 'diet-yourself-errors'
import context from './context'

const API_URL = process.env.REACT_APP_API_URL

/**
 * Create a new user's diet
 * 
 * @param {string} method - user's method
 * 
 * @throws {NotAllowedError} if status >= 400 && status < 500
 * @throws {Error} server error
 */


const createDiet = function (method) {
    validate.string(method, 'method')

    return (async () => {
        const response = await fetch(`${API_URL}/user/diet`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.token}`
            },
            body: JSON.stringify({method})
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

export default createDiet