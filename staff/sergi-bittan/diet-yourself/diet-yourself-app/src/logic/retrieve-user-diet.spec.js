const { mongoose, models: { User, Diet } } = require('diet-yourself-data')
const { retrieveUserDiet } = require('.')
const { random } = Math
import context from './context'
const jwt = require('jsonwebtoken')


const { constants: { goals, activities, methods, foods } } = require('diet-yourself-utils')

const { env: {
    REACT_APP_TEST_MONGODB_URL: TEST_MONGODB_URL,
    REACT_APP_TEST_JWT_SECRET: TEST_JWT_SECRET
} } = process


describe('retrieveUserDiet', () => {
    let username, email, password, goal, activity, gender, age, height, weight, city, finalWeight, calories, points, method, food
    let genderList = ['male', 'female']
    let goalIndex = Math.floor(Math.random() * 3)
    let genderIndex = Math.floor(Math.random() * 2)
    let activityIndex = Math.floor(Math.random() * 4)
    let methodIndex = Math.floor(Math.random() * 4)
    let foodIndex = Math.floor(Math.random() * 20)

    beforeAll(async () => {
        await mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        await User.deleteMany()
    })

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
        points = Math.floor(Math.random() * 40)
        method = methods[methodIndex].name
        food = foods[foodIndex]
    })
    describe('when user already exist', () => {
        beforeEach(async () => {
            const diet = new Diet({ method, foods, points, calories })
            const user = await User.create({ username, email, password, goal, activity, gender, age, height, weight, city, finalWeight, calories, diet })
            context.token = jwt.sign({ sub: user.id }, TEST_JWT_SECRET)
        })

        it('should suceed on correct and valid data', async () => {
            // await createDiet(method)

            const userDiet = await retrieveUserDiet()

            expect(userDiet).toBeDefined()
            expect(userDiet.method).toBe(method)
            expect(typeof method).toBe('string')
            expect(userDiet.foods).toBeDefined()
            expect(userDiet.foods[0].name).toBeDefined()
            expect(typeof userDiet.foods[0].name).toBe('string')
            expect(userDiet.foods[0].quantity).toBeDefined()
            expect(typeof userDiet.foods[0].quantity).toBe('number')
            expect(userDiet.points).toBeDefined()
            expect(userDiet.points).toBe(points)
            expect(typeof userDiet.points).toBe('number')
            expect(userDiet.foods.length).toBeGreaterThan(0)
            expect(userDiet.foods[foodIndex].name).toBe(food.name)
            //expect(userDiet.calories).toBe(calories)
        })
        it('should fail on invalid token', async () => {
            try {
                await retrieveUserDiet(`${token}-wrong`)
                throw new Error('should not reach this point')

            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe('token is not defined')
            }
        })
    })

    afterAll(async () => {
        await User.deleteMany()
        await mongoose.disconnect()
    })
})