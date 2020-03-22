const { models: { Diet } } = require("diet-yourself-data")
const { validate } = require("diet-yourself-utils")

module.exports =  (id)=> {
    validate.string(id, "id")

    return (async () => {
        const diet = await Diet.findById(id)
        if (!diet) throw new NotFoundError(`diet with id ${id}does not exist`)
        return diet 
    })()

}