const { models: { User } } = require("diet-yourself-data")
const { validate } = require("diet-yourself-utils")
const { NotFoundError } = require("diet-yourself-errors")

module.exports = (id) => {
    
    validate.string(id, "id")

    return (async () => {debugger

        const user = await User.findById(id)

        if (!user) throw new NotFoundError(`user with id ${id} not found`)
        debugger
        
        const _diet = await User.findOne({_id: id}, {diet: 1})

        

        if (!_diet) throw new NotFoundError(`user does not have any diet`)

        const { method, foods, points } = _diet

        return { method, foods, points }

    })()

}
