const { validate } = require("diet-yourself-utils")
const { models: { User } } = require('diet-yourself-data')
const { NotFoundError } = require("diet-yourself-errors")

module.exports = (id) => {

    validate.string(id, "id")

    return (async () => {


        const user = await User.findById(id)

        if (!user) throw new NotFoundError(`user with id ${id} does not exist`)

        const diet = user.diet
        
        user.favorites.push(diet)

        await user.save()
    
    })()


}