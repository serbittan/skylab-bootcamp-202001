const { validate } = require("diet-yourself-utils")
const { NotFoundError } = require("diet-yourself-errors")
const { models: { Diet, User }, constants: { methods, foods } } = require("diet-yourself-data")
const { calculatePoints } = require('./helpers')

module.exports = (userId, method) => {
    validate.string(userId, "userId")
    validate.string(method, "method")
    

    return (async () => {
        const user = await User.findById(userId)

        if (!user) throw new NotFoundError(`user with id ${userId} does not exist`)

        const { weight, height, age, gender, activity, method } = user

        const points = calculatePoints(weight, height, age, gender, activity)

        const { proportions: { protein, carbs, fat } } = methods.find(_method => _method.name === method)

        const proteinPoints = points * protein / 100
        const carbsPoints = points * carbs / 100
        const fatPoints = points * fat / 100

        const proteinFoods = foods.find(food => food.domain === 'protein')
        const carbsFoods = foods.find(food => food.domain === 'carbs')
        const fatFoods = foods.find(food => food.domain === 'fat')

        let proteinFoodPoints = proteinFoods.random().points

        if (proteinFoodPoints < proteinPoints) ...

        // TODO calculate quantities for the foods
        // TODO create the foods

        const diet = new Diet({ method, foods })
        
        user.diet = diet

        await user.save()
    })()

}
