const { models: { User } } = require("diet-yourself-data")
const { validate } = require("diet-yourself-utils")
const { NotFoundError } = require("diet-yourself-errors")

module.exports = (id) => {
    
    validate.string(id, "id")

    return (async () => {debugger

        const user = await User.findById(id)
        
        if (!user) throw new NotFoundError(`user with id ${id} not found`)
        

        const diet = user.diet

        if(!diet) throw new NotFoundError(`there are no diets`)

        const { method, foods, points } = diet
        
        return { method, foods, points }

    })()

}
