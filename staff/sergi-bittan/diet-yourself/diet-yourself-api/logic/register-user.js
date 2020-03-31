//@ts-check
const { validate } = require('diet-yourself-utils')
const { models: { User } } = require('diet-yourself-data')
const { NotAllowedError } = require('diet-yourself-errors')
const { calculateCalories } = require('./helpers')
const bcrypt = require('bcryptjs')

module.exports = (username, email, password, goal, activity, gender, age, height, weight, city, finalWeight) => {
    validate.string(username, 'username')
    validate.string(email, 'email')
    validate.email(email)
    validate.string(password, 'password')
    validate.string(goal, 'goal')
    validate.string(activity, "activity")
    validate.string(gender, "gender")
    validate.type(age, "age", Number)
    validate.type(height, "height", Number)
    validate.type(weight, "weight", Number)
    validate.string(city, "city")
    validate.type(finalWeight, "finalWeight", Number)


    return User.findOne({ email })
        .then(user => {
            if (user) throw new NotAllowedError(`user with email ${email} already exists`)

            return bcrypt.hash(password, 10)
        })
        .then(password => {
            const user = new User({ username, email, password, goal, activity, gender, age, height, weight, city, finalWeight })

            return user.save()

        })
        .then(() => {
            return User.findOne({ email })
         })
        .then(user => {
            // @ts-ignore
            const { goal, weight, height, age, gender, activity } = user

            const calories = Math.round(calculateCalories(goal, weight, height, age, gender, activity))

            // @ts-ignore
            user.calories = calories

            return user.save()
        })

}




//     //const {  goal, activity, gender, age, height, weight } = user
//     const calories = Math.round(calculateCalories(goal, age, height, weight, gender, activity))
//     user.calories = calories

