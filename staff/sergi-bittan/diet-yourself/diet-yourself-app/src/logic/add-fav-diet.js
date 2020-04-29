import { NotAllowedError } from 'diet-yourself-errors'
import context from './context'

const API_URL = process.env.REACT_APP_API_URL

/**
 * add diets to favorites
 * 
 * @throws {NotAllowedError} if status >= 400 && status < 500
 * @throws {Error} server error
 */

const addFavDiet = function () {
    return ( async () => {
        const response = await fetch(`${API_URL}/user/favs`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.token}`
            }
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

export default addFavDiet