const { mongoose, models: { User } } = require('diet-yourself-data')
const { random } = Math
const { retrieveUser } = require('.')
import context from './context'
const jwt = require('jsonwebtoken')

const { constants: { goals, activities } } = require("diet-yourself-utils")

const { env: {
    REACT_APP_TEST_MONGODB_URL: TEST_MONGODB_URL,
    REACT_APP_TEST_JWT_SECRET: TEST_JWT_SECRET
} } = process

describe('retrieveUser', () => {

    beforeAll(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => User.deleteMany())

    )

    let username, email, password, goal, activity, gender, age, height, weight, city, finalWeight, calories
    const genderList = ['male', 'female']
    const goalIndex = Math.floor(Math.random() * 3)
    const activityIndex = Math.floor(Math.random() * 4)
    const genderIndex = Math.floor(Math.random() * 2)

    beforeEach(() => {
        username = `username-${random()}`
        email = `email-${random()}@mail.com`
        goal = goals[goalIndex]
        password = `password-${random()}`
        activity = activities[activityIndex]
        gender = genderList[genderIndex]
        age = Math.floor(Math.random() * 53) + 17
        height = Math.floor(Math.random() * 80) + 120
        weight = Math.floor(Math.random() * 110) + 40
        city = `city-${random()}`
        finalWeight = Math.floor(Math.random() * 110) + 40
        calories = Math.floor(Math.random() * 7000) + 1000
    })

    describe('when user already exist', () => {
        beforeEach(() =>
            User.create({ username, email, password, goal, activity, gender, age, height, weight, city, finalWeight, calories })
                .then(({ id }) => context.token = jwt.sign({ sub: id }, TEST_JWT_SECRET))
        )
       

        it('should succeed on a correct and valid data', () =>
            retrieveUser()
                .then(user => {
                    expect(user).toBeDefined()
                    expect(user.username).toBe(username) 
                    //mail is not returned
                    expect(user.password).toBeUndefined()
                    expect(user.goal).toBe(goal)
                    expect(user.activity).toBe(activity)
                    expect(user.gender).toBe(gender)
                    expect(user.age).toBe(age)
                    expect(user.height).toBe(height)
                    expect(user.weight).toBe(weight)
                    expect(user.city).toBe(city)
                    expect(user.finalWeight).toBe(finalWeight)
                    expect(user.calories).toBe(calories)
                })
        )

        it('should fail on invalid token', async () => {
            try{
                await retrieveUser(`${token}-wrong`)

                throw new Error('you should not reach this point')

            } catch(error) {
                expect(error).toBeDefined()
                expect(error.message).toBe('token is not defined')
            }
        })
    })

    afterAll(() => User.deleteMany().then(() => mongoose.disconnect()))

})
