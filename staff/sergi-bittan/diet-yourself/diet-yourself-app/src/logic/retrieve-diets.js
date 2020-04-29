import { NotAllowedError } from 'diet-yourself-errors'
import context from './context'

const API_URL = process.env.REACT_APP_API_URL

/**
 * Show all diets from favorites
 * 
 * @returns {Promise<Object[]>} array with all diets included in favorites
 * 
 * @throws {NotAllowedError} if there are not diets in favorites
 * @throws {Error} server error
 */


const retrieveDiets = function () {
    return (async () => {
        const response = await fetch(`${API_URL}/user/diets`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.token}`
            }
        })

        const { status } = response

        if (status === 200) {
            const userDiets = await response.json()
            
            return userDiets
        }

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

export default retrieveDiets