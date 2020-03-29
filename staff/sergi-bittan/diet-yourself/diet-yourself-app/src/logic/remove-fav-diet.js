import { validate } from 'diet-yourself-utils'
import { NotAllowedError} from 'diet-yourself-errors'
import context from './context'

const API_URL = process.env.REACT_APP_API_URL

const removeFavDiet = function (idDiet) {
    validate.string(idDiet, 'idDiet')
debugger
    return ( async () => {
        const response = await fetch(`${API_URL}/user/diet/${idDiet}/delete`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.token}`
            }
        })

        const { status } = response
         if (status === 200) return

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

export default removeFavDiet