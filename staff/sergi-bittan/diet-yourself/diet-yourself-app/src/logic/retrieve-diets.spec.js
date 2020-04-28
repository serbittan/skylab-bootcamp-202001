const { mongoose, models: { User, Diet } } = require('diet-yourself-data')
const { constants: { method, foods, points, calories } } = require('diet-yourself-utils')
const { random } = Math
const { retrieveDiets } = require('.')
const jwt = require('jsonwebtoken')
import context from './context'

const { env: {
    REACT_APP_TEST_MONGODB_URL: TEST_MONGODB_URL,
    REACT_APP_TEST_JWT_SECRET: TEST_JWT_SECRET
} } = process

describe('retrieveDiets', () => {
    let username, email, password, goal, activity, gender, age, height, weight, city, finalWeight, calories, points, method 
    let genderList = ['male','female']
    let goalIndex = Math.floor(Math.random() * 3)
    let activityIndex = Math.floor(Math.random() * 4)
    let genderIndex = Math.floor(Math.random() * 2)

    beforeAll(async () => {
        await mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        await User.deleteMany()
    })

    beforeEach(() => {
        username = `username-${random()}`
        email = `email-${random()}@mail.com`
        password = `password-${random()}`
        goal = goals[goalIndex]
        activity = activities[activityIndex]
        gender = genderList[genderIndex]
        age = Math.floor(Math.random() * 53) + 17
        height = Math.floor(Math.random() * 80) + 120
        weight = Math.floor(Math.random() * 110) + 40
        city = `city-${random()}`
        finalWeight = Math.floor(Math.random() * 110) + 40
        calories = Math.floor(Math.random() * 7000) + 1000
        points = Math.floor(Math.random() * 30) + 10
        method = methods[methodIndex].name
    })

    describe('when user and diets exits', () => {
        let _id

        beforeEach(async () => {
            const user = await User.create({ username, email, password, goal, activity, gender, age, height, weight, city, finalWeight })
            context.token = jwt.sign({ sub: user.id }, TEST_JWT_SECRET)
            _id = user.id

            
            const diet1 = new Diet({ method, foods, points, calories })
            const diet2 = new Diet({ method, foods, points, calories })
            const diet3 = new Diet({ method, foods, points, calories })

            user.favorites.unshift(diet1, diet2, diet3)

            await user.save()
            
        })
        
        it('should suceed on valid data', async () => {
            const user = await User.findById(_id)
            const diets = await retrieveDiets()

            expect(diets).toBeDefined()
            expect(diets.length).toBeGreaterThan(0)

        })
    })
})