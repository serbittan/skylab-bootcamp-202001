require('dotenv').config()

const { expect } = require('chai')
const { random, floor } = Math
const { mongoose, models: { User } } = require('diet-yourself-data')
const { NotAllowedError } = require('diet-yourself-errors')
const registerUser = require('./register-user')
const bcrypt = require('bcryptjs')

const { env: { TEST_MONGODB_URL } } = process

describe('registerUser', () => {
    let username, email, password, age, height, weight, city, finalWeight, points, id, goal, activity, gender, goalIndex, activityIndex, genderIndex
    let goals, activities, genders

    before(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => User.deleteMany())
    )

    beforeEach(async () => {
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


    })

    describe('when user already exists', () => {

        it('should succeed on correct user data', async () => {
            debugger

            const user = await registerUser(username, email, password, goal, activity, gender, age, height, weight, city, finalWeight)

            expect(user).to.exist
            expect(user.id).to.be.a('string')
            expect(user.username).to.equal(username)
            //expect(user.surname).to.equal(surname)
            expect(user.email).to.equal(email)
            expect(user.goal).to.equal(goal)
            expect(user.activity).to.equal(activity)
            expect(user.gender).to.equal(gender)
            expect(user.age).to.equal(age)
            expect(user.height).to.equal(height)
            expect(user.weight).to.equal(weight)
            expect(user.city).to.equal(city)
            expect(user.finalWeight).to.equal(finalWeight)
            // expect(user.points).to.equal(points)
            //expect(user.created).to.be.instanceOf(Date)

        })

    })

    describe('when user already exists', () => {

        beforeEach(() =>
            User.create({ username, email, password, goal, activity, gender, age, height, weight, city, finalWeight, points, calories })

                .then(({ id }) => _id = id)
        )

        it('should fail on already existing user', async () => {
            try {
                await registerUser(username, email, password, goal, activity, gender, age, height, weight, city, finalWeight)

                throw Error('should not reach this point')

            } catch (error) {
                expect(error).to.exist

                expect(error.message).to.exist
                expect(typeof error.message).to.equal('string')
                expect(error.message.length).to.be.greaterThan(0)
                expect(error.message).to.equal(`user with email ${email} already exists`)
            }
        })
    })

    // it('should fail on incorrect name, surname, email, password, or expression type and content', () => {
    //     expect(() => registerUser(1)).to.throw(TypeError, '1 is not a string')
    //     expect(() => registerUser(true)).to.throw(TypeError, 'true is not a string')
    //     expect(() => registerUser([])).to.throw(TypeError, ' is not a string')
    //     expect(() => registerUser({})).to.throw(TypeError, '[object Object] is not a string')
    //     expect(() => registerUser(undefined)).to.throw(TypeError, 'undefined is not a string')
    //     expect(() => registerUser(null)).to.throw(TypeError, 'null is not a string')

    //     expect(() => registerUser('')).to.throw(ContentError, 'name is empty')
    //     expect(() => registerUser(' \t\r')).to.throw(ContentError, 'name is empty')

    //     expect(() => registerUser(name, 1)).to.throw(TypeError, '1 is not a string')
    //     expect(() => registerUser(name, true)).to.throw(TypeError, 'true is not a string')
    //     expect(() => registerUser(name, [])).to.throw(TypeError, ' is not a string')
    //     expect(() => registerUser(name, {})).to.throw(TypeError, '[object Object] is not a string')
    //     expect(() => registerUser(name, undefined)).to.throw(TypeError, 'undefined is not a string')
    //     expect(() => registerUser(name, null)).to.throw(TypeError, 'null is not a string')

    //     expect(() => registerUser(name, '')).to.throw(ContentError, 'surname is empty')
    //     expect(() => registerUser(name, ' \t\r')).to.throw(ContentError, 'surname is empty')

    //     expect(() => registerUser(name, surname, 1)).to.throw(TypeError, '1 is not a string')
    //     expect(() => registerUser(name, surname, true)).to.throw(TypeError, 'true is not a string')
    //     expect(() => registerUser(name, surname, [])).to.throw(TypeError, ' is not a string')
    //     expect(() => registerUser(name, surname, {})).to.throw(TypeError, '[object Object] is not a string')
    //     expect(() => registerUser(name, surname, undefined)).to.throw(TypeError, 'undefined is not a string')
    //     expect(() => registerUser(name, surname, null)).to.throw(TypeError, 'null is not a string')

    //     expect(() => registerUser(name, surname, '')).to.throw(ContentError, 'email is empty')
    //     expect(() => registerUser(name, surname, ' \t\r')).to.throw(ContentError, 'email is empty')

    //     expect(() => registerUser(name, surname, email, 1)).to.throw(TypeError, '1 is not a string')
    //     expect(() => registerUser(name, surname, email, true)).to.throw(TypeError, 'true is not a string')
    //     expect(() => registerUser(name, surname, email, [])).to.throw(TypeError, ' is not a string')
    //     expect(() => registerUser(name, surname, email, {})).to.throw(TypeError, '[object Object] is not a string')
    //     expect(() => registerUser(name, surname, email, undefined)).to.throw(TypeError, 'undefined is not a string')
    //     expect(() => registerUser(name, surname, email, null)).to.throw(TypeError, 'null is not a string')

    //     expect(() => registerUser(name, surname, email, '')).to.throw(ContentError, 'password is empty')
    //     expect(() => registerUser(name, surname, email, ' \t\r')).to.throw(ContentError, 'password is empty')



    // })




    after(() => User.deleteMany().then(() => mongoose.disconnect()))

})