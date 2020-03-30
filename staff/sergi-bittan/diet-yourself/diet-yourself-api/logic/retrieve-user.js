const { validate } = require('diet-yourself-utils')
const { models: { User } } = require('diet-yourself-data')
const { NotFoundError, NotAllowedError } = require('diet-yourself-errors')

module.exports = id => {
    validate.string(id, 'id')

    return User.findById(id)
        .then(user => {
            if (!user) throw new NotFoundError(`user with id ${id} does not exist`)

            if (user.deactivated) throw new NotAllowedError(`user with id ${id} is deactivated`)

            user.retrieved = new Date

            return user.save()
        })
        .then(({ username, age, weight, height, goal, activity, city, finalWeight, diet, favorites, calories }) => ({ username, age, weight, height, goal, activity, city, finalWeight, diet, favorites, calories }))
        //.then(user => { user })
}