const { mongoose, models: { User } } = require('diet-yourself-data')
const { constants: { activities, goals, methods, foods } } = require('diet-yourself-utils')
const { random } = Math
const { updateUser } = require('.')
const bcrypt = require('bcryptjs')
const { env: {
    REACT_APP_TEST_MONGODB_URL: TEST_MONGODB_URL,
    REACT_APP_TEST_JWT_SECRET: REACT_APP_TEST_JWT_SECRET
} } = process

describe('updateUser', () => {
    beforeAll(async () => {
        await mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        await User.deleteMany()
    })

    let username, age, weight, height, goal, activity, city, finalWeight, password, oldPassword 
    let goalIndex = Math.floor(Math.random() * 3)
    let activityIndex = Math.floor(Math.random() * 4)

    beforeEach(() => {
        username = `username-${random()}`
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

    describe('when user already exist', async () => {
        beforeAll(async () => {
            const _password = await bcrypt.hash(password, 10)

            const user = await User.create({ username, email, password: _password, goal, activity, gender, age, height, weight, city, finalWeight })
            const _id = await user.id

            await login(email, password)
            const { token } = content

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
            goal = 'update'
            activity = 'update'
            age = Math.floor(Math.random() * 53) + 17
            weight = Math.floor(Math.random() * 110) + 40
            height = Math.floor(Math.random() * 80) + 120
            city = 'update'
            finalWeight = Math.floor(Math.random() * 110) + 40

            await updateUser({ username, age, weight, height, goal, activity, city, finalWeight, password, oldPassword })

            const _user = await User.findById(_id)

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
})