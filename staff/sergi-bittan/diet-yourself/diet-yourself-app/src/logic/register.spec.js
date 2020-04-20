const { random } = Math
const { mongoose, models: { User } } = require('diet-yourself-data')
const { register } = require('.')
const bcrypt = require('bcryptjs')

const { constants: { goals, activities } } = require("diet-yourself-utils")

const { env: { REACT_APP_TEST_MONGODB_URL: TEST_MONGODB_URL, REACT_APP_TEST_JWT_SECRET: TEST_JWT_SECRET } } = process

// const TEST_MONGODB_URL = process.env.REACT_APP_TEST_MONGODB_URL

describe('register', () => {
    let username, email, password, goal, activity, gender, age, height, weight, city, finalWeight
    const genderList = ['male', 'female']
    let goalIndex = Math.floor(Math.random() * 3)
    let genderIndex = Math.floor(Math.random() * 2)
    let activityIndex = Math.floor(Math.random() * 4)

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


    })

    it('should succeed on correct user data', async () => {
        const result = await register(username, email, password, goal, activity, gender, age, height, weight, city, finalWeight)

        expect(result).toBeUndefined()

        const user = await User.findOne({ email })

        expect(user).toBeDefined()
        expect(typeof user.id).toBe('string')
        expect(user.username).toBe(username)

        expect(user.goal).toBe(goal)
        expect(user.activity).toBe(activity)
        expect(user.gender).toBe(gender)
        expect(user.age).toBe(age)
        expect(user.height).toBe(height)
        expect(user.weight).toBe(weight)
        expect(user.city).toBe(city)
        expect(user.finalWeight).toBe(finalWeight)
        //expect(user.calories).toBe(calories)

        const validPassword = await bcrypt.compare(password, user.password)

        expect(validPassword).toBeTruthy()
    })

    it('should fail on non-string username', () => {
        username = 1
        expect(() =>
            register(username, email, password, goal, activity, gender, age, height, weight, city, finalWeight)
        ).toThrowError(TypeError, `username ${username} is not a string`)

        username = true
        expect(() =>
            register(username, email, password, goal, activity, gender, age, height, weight, city, finalWeight)
        ).toThrowError(TypeError, `username ${username} is not a string`)

        username = undefined
        expect(() =>
            register(username, email, password, goal, activity, gender, age, height, weight, city, finalWeight)
        ).toThrowError(TypeError, `username ${username} is not a string`)

        username = null
        expect(() =>
            register(username, email, password, goal, activity, gender, age, height, weight, city, finalWeight)
        ).toThrowError(TypeError, `username ${username} is not a string`)
    })

    it('should fail in non-string email', () => {
        email = 1
        expect(() =>
            register(username, email, password, goal, activity, gender, age, height, weight, city, finalWeight)
        ).toThrowError(TypeError, `email ${email} is not a string`)

        email = true
        expect(() =>
            register(username, email, password, goal, activity, gender, age, height, weight, city, finalWeight)
        ).toThrowError(TypeError, `email ${email} is not a string`)

        email = undefined
        expect(() =>
            register(username, email, password, goal, activity, gender, age, height, weight, city, finalWeight)
        ).toThrowError(TypeError, `email ${email} is not a string`)

        email = null
        expect(() =>
            register(username, email, password, goal, activity, gender, age, height, weight, city, finalWeight)
        ).toThrowError(TypeError, `email ${email} is not a string`)
    })

    it('should fail on non-string goal', () => {
        goal = 1
        expect(() =>
            register(username, email, password, goal, activity, gender, age, height, weight, city, finalWeight)
        ).toThrowError(TypeError, `goal ${goal} is not a string`)

        goal = true
        expect(() =>
            register(username, email, password, goal, activity, gender, age, height, weight, city, finalWeight)
        ).toThrowError(TypeError, `goal ${goal} is not a string`)

        goal = undefined
        expect(() =>
            register(username, email, password, goal, activity, gender, age, height, weight, city, finalWeight)
        ).toThrowError(TypeError, `goal ${goal} is not a string`)

        goal = null
        expect(() =>
            register(username, email, password, goal, activity, gender, age, height, weight, city, finalWeight)
        ).toThrowError(TypeError, `goal ${goal} is not a string`)
    })

    it('should fail on non-string activity', () => {
        activity = 1
        expect(() =>
            register(username, email, password, goal, activity, gender, age, height, weight, city, finalWeight)
        ).toThrowError(TypeError, `activity ${activity} is not a string`)

        activity = true
        expect(() =>
            register(username, email, password, goal, activity, gender, age, height, weight, city, finalWeight)
        ).toThrowError(TypeError, `activity ${activity} is not a string`)

        activity = undefined
        expect(() =>
            register(username, email, password, goal, activity, gender, age, height, weight, city, finalWeight)
        ).toThrowError(TypeError, `activity ${activity} is not a string`)

        activity = null
        expect(() =>
            register(username, email, password, goal, activity, gender, age, height, weight, city, finalWeight)
        ).toThrowError(TypeError, `activity ${activity} is not a string`)
    })

    it('should fail on non-string gender', () => {
        gender = 1
        expect(() =>
            register(username, email, password, goal, activity, gender, age, height, weight, city, finalWeight)
        ).toThrowError(TypeError, `gender ${gender} is not a string`)

        gender = true
        expect(() =>
            register(username, email, password, goal, activity, gender, age, height, weight, city, finalWeight)
        ).toThrowError(TypeError, `gender ${gender} is not a string`)

        gender = undefined
        expect(() =>
            register(username, email, password, goal, activity, gender, age, height, weight, city, finalWeight)
        ).toThrowError(TypeError, `gender ${gender} is not a string`)

        gender = null
        expect(() =>
            register(username, email, password, goal, activity, gender, age, height, weight, city, finalWeight)
        ).toThrowError(TypeError, `gender ${gender} is not a string`)
    })

    it('should fail on non-string city', () => {
        city = 1
        expect(() =>
            register(username, email, password, goal, activity, gender, age, height, weight, city, finalWeight)
        ).toThrowError(TypeError, `city ${city} is not a string`)

        city = true
        expect(() =>
            register(username, email, password, goal, activity, gender, age, height, weight, city, finalWeight)
        ).toThrowError(TypeError, `city ${city} is not a string`)

        city = undefined
        expect(() =>
            register(username, email, password, goal, activity, gender, age, height, weight, city, finalWeight)
        ).toThrowError(TypeError, `city ${city} is not a string`)

        city = null
        expect(() =>
            register(username, email, password, goal, activity, gender, age, height, weight, city, finalWeight)
        ).toThrowError(TypeError, `city ${city} is not a string`)
    })

    it('should fail on non-number age', () => {
        age = 'string'
        expect(() =>
            register(username, email, password, goal, activity, gender, age, height, weight, city, finalWeight)
        ).toThrowError(TypeError, `age ${age} is not a number`)

        age = true
        expect(() =>
            register(username, email, password, goal, activity, gender, age, height, weight, city, finalWeight)
        ).toThrowError(TypeError, `age ${age} is not a number`)

        age = undefined
        expect(() =>
            register(username, email, password, goal, activity, gender, age, height, weight, city, finalWeight)
        ).toThrowError(TypeError, `age ${age} is not a number`)

        age = null
        expect(() =>
            register(username, email, password, goal, activity, gender, age, height, weight, city, finalWeight)
        ).toThrowError(TypeError, `age ${age} is not a number`)
    })

    it('should fail on non-number height', () => {
        height = ''
        expect(() =>
            register(username, email, password, goal, activity, gender, age, height, weight, city, finalWeight)
        ).toThrowError(TypeError, `height ${height} is not a number`)

        height = true
        expect(() =>
            register(username, email, password, goal, activity, gender, age, height, weight, city, finalWeight)
        ).toThrowError(TypeError, `height ${height} is not a number`)

        height = undefined
        expect(() =>
            register(username, email, password, goal, activity, gender, age, height, weight, city, finalWeight)
        ).toThrowError(TypeError, `height ${height} is not a number`)

        height = null
        expect(() =>
            register(username, email, password, goal, activity, gender, age, height, weight, city, finalWeight)
        ).toThrowError(TypeError, `height ${height} is not a number`)
    })

    it('should fail on non-number weight', () => {
        weight = 'hello'
        expect(() =>
            register(username, email, password, goal, activity, gender, age, height, weight, city, finalWeight)
        ).toThrowError(TypeError, `weight ${weight} is not a number`)

        weight = true
        expect(() =>
            register(username, email, password, goal, activity, gender, age, height, weight, city, finalWeight)
        ).toThrowError(TypeError, `weight ${weight} is not a number`)

        weight = undefined
        expect(() =>
            register(username, email, password, goal, activity, gender, age, height, weight, city, finalWeight)
        ).toThrowError(TypeError, `weight ${weight} is not a number`)

        weight = null
        expect(() =>
            register(username, email, password, goal, activity, gender, age, height, weight, city, finalWeight)
        ).toThrowError(TypeError, `weight ${weight} is not a number`)
    })

    it('should fail on non-number finalWeight', () => {
        finalWeight = ''
        expect(() =>
            register(username, email, password, goal, activity, gender, age, height, weight, city, finalWeight)
        ).toThrowError(TypeError, `finalWeight ${finalWeight} is not a number`)

        finalWeight = true
        expect(() =>
            register(username, email, password, goal, activity, gender, age, height, weight, city, finalWeight)
        ).toThrowError(TypeError, `finalWeight ${finalWeight} is not a number`)

        finalWeight = undefined
        expect(() =>
            register(username, email, password, goal, activity, gender, age, height, weight, city, finalWeight)
        ).toThrowError(TypeError, `finalWeight ${finalWeight} is not a number`)

        finalWeight = null
        expect(() =>
            register(username, email, password, goal, activity, gender, age, height, weight, city, finalWeight)
        ).toThrowError(TypeError, `finalWeight ${finalWeight} is not a number`)
    })





    afterAll(async () => {
        await User.deleteMany()
        await mongoose.disconnect()
    })
})




