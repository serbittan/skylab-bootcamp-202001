const { mongoose, models: { User } } = require('diet-yourself-data')
const { random } = Math
const { login } = require('.')
const bcript = require('bcryptjs')
import context from './context'

const { constants: { goals, activities } } = require("diet-yourself-utils")

const { env: { REACT_APP_TEST_MONGODB_URL: TEST_MONGODB_URL, REACT_APP_TEST_JWT_SECRET: TEST_JWT_SECRET } } = process

describe('login', () => {
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

    describe('when user already exists', () => {
        let _id

        beforeEach(async () => {
            const _password = await bcript.hash(password, 10)

            await User.create({ username, email, password: _password, goal, activity, gender, age, height, weight, city, finalWeight })
                .then(({ id }) => _id = id)
        })

        it('should succeed on correct credentials', () =>
            login(email, password)
                .then(() => {
                    const { token } = context

                    expect(typeof token).toBe('string')
                    expect(token.length).toBeGreaterThan(0)

                    const { sub } = JSON.parse(atob(token.split('.')[1]))

                    expect(sub).toBe(_id)

                })
        )
    })

    it('should fail when user does not exist', async () => {
        try {
            await login(email, password)
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).toBeInstanceOf(Error)
            expect(error.message).toBe('wrong credentials')
        }
    })

    it('should fail on wrong email', async () => {
        try {
            await login(`wrong-${email}`, password)
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).toBeInstanceOf(Error)
            expect(error.message).toBe('wrong credentials')
        }
    })

    it('should fail on wrong password', async () => {
        try {
            await login(email, `wrong-${password}`)
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).toBeInstanceOf(Error)
            expect(error.message).toBe('wrong credentials')
        }
    })

    it('should fail on non-string password', () => {
        password = 1111
        expect(() =>
            login(email, password)
        ).toThrowError(TypeError, `password ${password} in not a string`)

        password = true
        expect(() =>
            login(email, password)
        ).toThrowError(TypeError, `password ${password} is not a string`)

        password = undefined
        expect(() =>
            login(email, password)
        ).toThrowError(TypeError, `password ${password} is not a string`)

        password = null
        expect(() =>
            login(email, password)
        ).toThrowError(TypeError, `password ${password} is not a string`)
    })

    it('should fail on non-string email', () => {
        email = 1
        expect(() =>
            login(email, password)
        ).toThrowError(TypeError, `email ${email} is not a string`)

        email = true
        expect(() =>
            login(email, password)
        ).toThrowError(TypeError, `email ${email} is not a string`)

        email = undefined
        expect(() =>
            login(email, password)
        ).toThrowError(TypeError, `email ${email} is not a string`)
    })

    afterAll(() => User.deleteMany().then(() => mongoose.disconnect()))
})




// afterAll(async () => {
//     await Promise.resolve(User.deleteMany())
//     return await mongoose.disconnect()
// })














