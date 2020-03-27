import context from './context'
import { NotAllowedError } from 'diet-yourself-errors'

const API_URL = process.env.REACT_APP_API_URL

const retrieveUserDiet = function () {
    return ( async () => {
        const response = await fetch(`${API_URL}/user/diet`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.token}`
            }
        })

        const { status } = response
        if (status === 200) {
            const userDiet = await response.json()

            return userDiet
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

export default retrieveUserDiet