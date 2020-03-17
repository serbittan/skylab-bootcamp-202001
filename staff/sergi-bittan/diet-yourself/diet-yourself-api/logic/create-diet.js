const { validate } = require("diet-yourself-utils")
const { errors } = require("diet-yourself-errors")
const { models: {Diet, User} } = require("diet-yourself-data")


module.exports = (method, food, userId) => {
    validate.string(method, "method")
    validate.string(userId, "userId")
    validate.string(description, "description")
    validate.string(quantity, "quantity")
    validate.type(points, "points", Number)


    return (async () => {
        const newDiet = new Diet({ method, food })
        const saveData = await newDiet.save()
        await User.update({ _id: userId}, {$push:{favorites: saveData._id}})  //???????
        return 
    })()

}
        