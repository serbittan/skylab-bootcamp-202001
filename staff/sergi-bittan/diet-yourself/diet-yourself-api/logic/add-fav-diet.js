const { validate } = require("diet-yourself-utils")
const { NotFoundError } = require("diet-yourself-errors")

module.exports = (id) => {

    validate.string(id, "id")

    return (async () => {


        const user = await findById(id)

        if (!user) throw new NotFoundError(`user with id ${id} does not exist`)

        const diet = user.diet[0]
        
        user.favorites.push(diet)

        await user.save()
    
    })()


}