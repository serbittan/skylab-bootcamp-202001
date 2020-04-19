const { mongoose, models: { User } } = require('diet-yourself-data')
const { constants: { goals, activities, methods } } = require('diet-yourself-utils')
const { random } = Math
const { createDiet } = require('.')
const jwt = require('jsonwebtoken')
import context from './context'
import retrieveUser from './retrieve-user'

const { env: {
    REACT_APP_TEST_MONGODB_URL: TEST_MONGODB_URL,
    REACT_APP_TEST_JWT_SECRET: TEST_JWT_SECRET
} } = process


describe('createDiet', () => {
    beforeAll(async () => {
        await mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })

        await User.deleteMany()
    })
    let username, email, password, goal, activity, gender, age, height, weight, city, finalWeight, calories, method, diet
    const genderList =['male', 'female']
    let goalIndex = Math.floor(Math.random() * 3)
    let genderIndex = Math.floor(Math.random() * 2)
    let activityIndex = Math.floor(Math.random() * 4)
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
        method = methods[methodIndex].name
    })
    describe('when user already exist', () => {
        beforeEach(async () => {
            const user = await User.create({ username, email, password, goal, activity, gender, age, height, weight, city, finalWeight, calories })
            context.token = jwt.sign({ sub: user.id }, TEST_JWT_SECRET)
        })
        it('should suceed on a correct and valid data', async () => {
            await createDiet(method)

            const user = await retrieveUser()

            expect(user).toBeDefined()
            expect(user.username).toBe(username)
            expect(user.password).toBeUndefined()
            expect(user.email).toBeUndefined()
            expect(user.goal).toBe(goal)
            expect(user.activity).toBe(activity)
            expect(user.gender).toBe(gender)
            expect(user.age).toBe(age)
            expect(user.height).toBe(height)
            expect(user.weight).toBe(weight)
            expect(user.city).toBe(city)
            expect(user.finalWeight).toBe(finalWeight)
            expect(user.calories).toBe(calories)
            expect(user.diet).toBeDefined()
        })
    })
    it('should fail on invalid token', async () => {
        try{
            await createDiet(`${token}-wrong`)
            throw new Error('should not reach this point')
            
        } catch(error) {
            expect(error).toBeDefined()
            expect(error.message).toBe(`token is not defined`)
        }
    })

    it('should fail on non-string method', () => {
        method = 1
        expect(()=> createDiet(method)).toThrowError(TypeError, `method ${method} is not a string`)
        
        method = true
        expect(() => createDiet(method)).toThrowError(TypeError, `method ${method} is not a string`)

        method = undefined
        expect(() => createDiet(method)).toThrowError(TypeError, `method ${method} is not a string`)

        method = null
        expect(() => createDiet(method)).toThrowError(TypeError, `method ${method} is not a string`)
    })

    afterAll( async () => {
        await User.deleteMany()
        await mongoose.disconnect()
    })
    
})


