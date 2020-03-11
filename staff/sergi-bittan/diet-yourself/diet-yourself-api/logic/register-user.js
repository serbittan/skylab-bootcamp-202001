const { validate } = require('diet-yourself-utils')
const { models: { User } } = require('diet-yourself-data')
const { NotAllowedError } = require('diet-yourself-errors')
const bcrypt = require('bcryptjs')

module.exports = (username, email, password, goal, activity, gender, age, height, weight, city, finalWeight, points) => {
    validate.string(username, 'username')
    validate.string(email, 'email')
    validate.email(email)
    validate.string(password, 'password')
    validate.type(goal, 'goal', Number)
    validate.type(activity, "activity", Number)
    validate.string(gender, "gender")
    validate.type(age, "age", Number)
    validate.type(height, "height", Number)
    validate.type(weight, "weight", Number)
    validate.string(city, "city")
    validate.type(finalWeight, "finalWeight", Number)
    validate.type(points, "points", Number)

    return User.findOne({ email })
        .then(user => {
            if (user) throw new NotAllowedError(`user with email ${email} already exists`)

            return bcrypt.hash(password, 10)
        })
        .then(password => {
            user = new User({ username, email, password, goal, activity, gender, age, height, weight, city, finalWeight, points })

            return user.save()
        })
        .then(() => { })
}