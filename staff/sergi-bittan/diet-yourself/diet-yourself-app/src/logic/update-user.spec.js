const { mongoose, models: { User } } = require('diet-yourself-data')
const { constants: { activities, goals, methods, foods } } = require('diet-yourself-utils')
const { random } = Math
const { updateUser, login } = require('.')
const bcrypt = require('bcryptjs')
const { NotAllowedError } = require('diet-yourself-errors')

import context from './context'



const { env: {
    REACT_APP_TEST_MONGODB_URL: TEST_MONGODB_URL,
    REACT_APP_TEST_JWT_SECRET: TEST_JWT_SECRET
} } = process

describe('updateUser', () => {
    beforeAll(async () => {
        await mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        await User.deleteMany()
    })

    let username, email, gender, age, weight, height, goal, activity, city, finalWeight, password, oldPassword
    let goalIndex = Math.floor(Math.random() * 3)
    let activityIndex = Math.floor(Math.random() * 4)
    let genderList = ['male', 'female']
    let genderIndex = Math.floor(Math.random() * 2)

    beforeEach(() => {
        username = `username-${random()}`
        email = `email-${random()}@mail.com`
        gender = genderList[genderIndex]
        age = Math.floor(Math.random() * 53) + 17
        weight = Math.floor(Math.random() * 110) + 40
        height = Math.floor(Math.random() * 80) + 120
        goal = goals[goalIndex]
        activity = activities[activityIndex]
        city = `city-${random()}`
        finalWeight = Math.floor(Math.random() * 110) + 40
        password = `password-${random()}`
        oldPassword = `oldPassword-${random()}`
    })

    describe('when user already exist', () => {
        let _id
        beforeEach(async () => {
            
            const _password = await bcrypt.hash(password, 10)

            const user = await User.create({ username, email, password: _password, goal, activity, gender, age, height, weight, city, finalWeight })
            _id = user.id

            await login(email, password)
            const { token } = context

            expect(typeof token).toBe('string')
            expect(token.length).toBeGreaterThan(0)

            const { sub } = JSON.parse(atob(token.split('.')[1]))

            expect(sub).toBe(_id)

        })

        it('should succeed on valid id and credentials', async () => {
            username += '-update'
            //email = 'update-@mail.com'
            oldPassword = password
            password += '-update'
            goal = goals[goalIndex]
            activity = activities[activityIndex]
            age = Math.floor(Math.random() * 53) + 17
            weight = Math.floor(Math.random() * 110) + 40
            height = Math.floor(Math.random() * 80) + 120
            city += '-update'
            finalWeight = Math.floor(Math.random() * 110) + 40

            await updateUser({ username, age, weight, height, goal, activity, city, finalWeight, password, oldPassword })

            const _user = await User.findById(_id).lean()

            expect(_user.username).toBe(username)
            expect(_user.goal).toBe(goal)
            expect(_user.activity).toBe(activity)
            expect(_user.age).toBe(age)
            expect(_user.weight).toBe(weight)
            expect(_user.height).toBe(height)
            expect(_user.city).toBe(city)
            expect(_user.finalWeight).toBe(finalWeight)

            const validPassword = await bcrypt.compare(password, _user.password)

            expect(validPassword).toBeTruthy()

        })
    })

    it('should fail and invalid password', async () => {
        username += '-update'
        oldPassword = `${password}-wrong`
        password += '-update'
        goal = goals[goalIndex]
        activity = activities[activityIndex]
        age = Math.floor(Math.random() * 53) + 17
        weight = Math.floor(Math.random() * 110) + 40
        height = Math.floor(Math.random() * 80) + 120
        city = 'update'
        finalWeight = Math.floor(Math.random() * 110) + 40

        try {
            await updateUser({ username, age, weight, height, goal, activity, city, finalWeight, password, oldPassword })
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).toBeDefined()
            //expect(error).toBeInstanceOf(NotAllowedError)
            expect(error.message).toBe('wrong credentials')
        }
    })

    it('should fail on incorrect data property types or content', () => {
        let data = { username: 1 }
        expect(() => 
            updateUser(data)
        ).toThrowError(TypeError,`username ${data.username} is not a string`)

        data = { age: 'string' }
        expect(() =>
            updateUser(data)
        ).toThrowError(TypeError, `age ${data.age} is not a number`)

        data = { weight: 'string'}
        expect(() =>
            updateUser(data)
        ).toThrowError(TypeError, `weight ${data.weight} is not a number`)

        data = { height: 'string'}
        expect(() =>
            updateUser(data)
        ).toThrowError(TypeError, `height ${data.height} is not a number`)

        data = { goal: 1 }
        expect(() => 
            updateUser(data)
        ).toThrowError(TypeError, `goal ${data.goal} is not a string`)

        data = { activity: 1 }
        expect(() =>
            updateUser(data)
        ).toThrowError(TypeError, `activity ${data.activity}is not a string`)

        data = { city: 1 }
        expect(() =>
            updateUser(data)
        ).toThrowError(TypeError, `city ${data.city} is not a string`)

        data = { finalWeight: 'string' }
        expect(() => 
            updateUser(data)
        ).toThrowError(TypeError, `finalWeight ${data.finalWeight} is not a number`)

        data = { password: 1 }
        expect(() =>
            updateUser(data)
        ).toThrowError(TypeError, `password ${data.password} is not a string`)

        data = { oldPassword: 1 }
        expect(() =>
            updateUser(data)
        ).toThrowError(TypeError, `oldPassword ${data.oldPassword} is not a string`)
    })

    it('should fail on unsatisfying password and oldPassword pair', () => {
        let data = { password: '123' }
        expect(() =>
            updateUser(data)
        ).toThrowError(Error, `oldPassword is not defined`)

        data = { oldPassword: '123' }
        expect(() =>
            updateUser(data)
        ).toThrowError(Error, `password is not defined`)
    })

    it('should fail on non-familiar property', () => {
        const property = 'pokemon'

        let data = { [property]: 'yellow'}

        expect(() => 
            updateUser(data)
        ).toThrowError(Error, `property ${property} is not allowed`)
    })

    afterAll(async () => {
        await User.deleteMany()
        await mongoose.disconnect()
    })

})


