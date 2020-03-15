const { validate } = require("diet-yourself-utils")
const { errors } = require("diet-yourself-errors")
const { Diet, User } = require("diet-yourself-data")

module.exports = async (method, food, userId) => {
    
    const diet = new Diet({method, food})
    const saveData = await diet.save()
    await User.update({ _id: userId}, {$push:{favorites: saveData._id}})
    return saveData
}