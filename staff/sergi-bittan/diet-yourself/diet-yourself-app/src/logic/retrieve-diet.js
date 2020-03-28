import { validate } from 'diet-yourself-utils'
import { NotAllowedError } from 'diet-yourself-errors'
import context from './context'

const API_URL = process.env.REACT_APP_API_URL

const retrieveDiet = function (idDiet) {
    validate.string(idDiet, 'idDiet')
    debugger
    return (async () => {
        const response = await fetch(`${API_URL}/user/diet/:${idDiet}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.token}``Authorization: Bearer ${this.tolken}`
            } 
            
        })

        const { status } = response

        if (status === 200) {
            const diet = await response.json()

            return diet
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

export default retrieveDiet