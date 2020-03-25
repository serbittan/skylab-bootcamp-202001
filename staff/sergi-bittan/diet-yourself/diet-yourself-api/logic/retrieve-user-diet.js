const { models: { User } } = require("diet-yourself-data")
const { validate } = require("diet-yourself-utils")
const { NotFoundError } = require("diet-yourself-errors")

module.exports = (id) => {
    
    validate.string(id, "id")

    return (async () => {

        const user = await User.findById(id)

        if (!user) throw new NotFoundError(`user with id ${id} not found`)
        debugger
        
        const diet = user.diet._doc[0]

        if (!diet) throw new NotFoundError(`user does not have any diet`)

        const { method, foods } = diet

        return { method, foods }

    })()

}
