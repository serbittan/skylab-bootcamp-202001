const { mongoose, models: { User, Diet } } = require('diet-yourself-data')
const { constants: { goals, activities, methods, foods } } = require('diet-yourself-utils')
const { random } = Math
const { addFavDiet } = require('.')
const jwt = require('jsonwebtoken')
import context from './context'

const { env: {
    REACT_APP_TEST_MONGODB_URL: TEST_MONGODB_URL,
    REACT_APP_TEST_JWT_SECRET: TEST_JWT_SECRET
} } = process

describe('addFavDiet', () => {
    beforeAll(async () => {
        await mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true , useUnifiedTopology: true })
        await User.deleteMany()
    })

    let username, email, password, goal, activity, gender, age, height, weight, city, finalWeight, calories, method, points
    let genderList = ['male','female']
    let goalIndex = Math.floor(Math.random() * 3)
    let activityIndex = Math.floor(Math.random() * 4)
    let genderIndex = Math.floor(Math.random() * 2)
    let methodIndex = Math.floor(Math.random() * 4)

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

    })

    describe('when user already exist', () => {
        let idDiet
        let _id
        beforeEach(async () => {
            const user = await User.create({ username, email, password, goal, activity, gender, age, height, weight, city, finalWeight })
            context.token = jwt.sign({ sub: user.id }, TEST_JWT_SECRET)
            _id = user.id
            
            const diet = new Diet({ method, foods, points, calories })
            idDiet = diet.id

            user.diet = diet
            await user.save()
        })

        it('should succeed on correct data', async() => {
            await addFavDiet()

            const user = await User.findById(_id)
            const addedDiet = user.favorites
            
            expect(addedDiet).toBeDefined()
            expect(addedDiet.length).toBeGreaterThan(0)
            expect(addedDiet[0].id).toBe(idDiet)
            expect(addedDiet[0].method).toBe(method)
            expect(addedDiet[0].points).toBe(points)
            expect(addedDiet[0].calories).toBe(calories)
            expect(addedDiet[0].foods).toBeDefined()
        })

        it('should fail on invalid token', async() => {
            try{
                await addFavDiet(`${token}-wrong`)
                throw new Error('should not reach this point')
            } catch(error) {
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