require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { expect } = require('chai')
const { random } = Math
const retrieveUser = require('./retrieve-user')
const { mongoose, models: { User } } = require('diet-yourself-data')
const { NotFoundError } = require('diet-yourself-errors')
const { calculateCalories } = require('./helpers')

describe('retrieveUser', () => {
    before(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => User.deleteMany())
    )

    //user
    let username, email, password, age, height, weight, city, finalWeight, points, id, goal, activity, gender, goalIndex, activityIndex, genderIndex
    let goals, activities, genders

    beforeEach(() => {
        goals = ["gain muscle mass", "maintain weight", "lose weight"]
        activities = ["sedentary", "mild activity", "moderate activity", "heavy activity"]
        genders = ["male", "female"]

        goalIndex = Math.floor(Math.random() * 3)
        activityIndex = Math.floor(Math.random() * 4)
        genderIndex = Math.floor(Math.random() * 2)

        //data to create user
        username = `username-${random()}`
        email = `email-${random()}@mail.com`
        password = `password-${random()}`
        goal = goals[goalIndex]
        activity = activities[activityIndex]
        gender = genders[genderIndex]
        age = (Math.floor(random() * 65) + 12)
        height = (Math.floor(random() * 200) + 120)
        weight = (Math.floor(random() * 200) + 30)
        city = `city-${random()}`
        finalWeight = (Math.floor(random() * 200) + 30)
        points = 0
        calories = calculateCalories(goal, age, weight, height, gender, activity)
    })

    describe('when user already exists', () => {
        let _id

        beforeEach(() =>
            User.create({ username, email, password, goal, activity, gender, age, height, weight, city, finalWeight, points, calories })

                .then(({ id }) => _id = id)
        )

        it('should succeed on correct and valid and right data', () =>
            retrieveUser(_id)
                .then(user => {
                    debugger
                    expect(user.constructor).to.equal(Object)
                    expect(user.username).to.equal(username)
                    expect(user.password).to.be.undefined
                    expect(user.goal).to.equal(goal)
                    expect(user.activity).to.equal(activity)
                    expect(user.gender).to.equal(gender)
                    expect(user.age).to.equal(age)
                    expect(user.height).to.equal(height)
                    expect(user.weight).to.equal(weight)
                    expect(user.city).to.equal(city)
                    expect(user.finalWeight).to.equal(finalWeight)
                    expect(user.calories).to.equal(calories)

                    //TODO more
                })
        )
    })

    describe('when user does not exist', () => {
        let _id

        beforeEach(() =>
            User.create({ username, email, password, goal, activity, gender, age, height, weight, city, finalWeight, points, calories })

                .then(({ id }) => _id = id)
        )

        it('should succeed on wrong data', () => {

            const wrongId = 'fhtujyi78uyi'

            retrieveUser(wrongId)
                .then(user => {
                    expect(user).to.not.exist

                })
                .catch((error) => {

                    expect(error).to.exist
                    expect(error.message).to.exist
                    expect(error).to.be.instanceOf(NotFoundError)
                    expect(error.message.length).to.be.greaterThan(0)
                    expect(error.message).to.equal(`user with id ${wrongId} does not exist`)
                })
        })
    })


    after(() => User.deleteMany().then(() => mongoose.disconnect()))
})