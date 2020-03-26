require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { mongoose, models: { User } } = require('diet-yourself-data')
const { expect } = require('chai')
const { random } = Math
const authenticateUser = require('./authenticate-user')
const bcrypt = require('bcryptjs')
const { ContentError } = require("diet-yourself-errors")

describe('authenticateUser', () => {
    before(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => User.deleteMany())
    )

     //user
     let username, email, password, age, height, weight, city, finalWeight, points, id, goal, activity, gender, goalIndex, activityIndex, genderIndex



    beforeEach( () => {

        goal = ["gain muscle mass", "maintain weight", "lose weight"]
        activity = ["sedentary", "mild activity", "moderate activity", "heavy activity"]
        gender = ["male", "female"]

        goalIndex = Math.floor(Math.random() * 3)
        activityIndex = Math.floor(Math.random() * 4)
        genderIndex = Math.floor(Math.random() * 2)

        //data to create user
        username = `username-${random()}`
        email = `email-${random()}@mail.com`
        password = `password-${random()}`
        goal = goal[goalIndex]
        activity = activity[activityIndex]
        gender = gender[genderIndex]
        age = (Math.floor(random() * 65) + 12)
        height = (Math.floor(random() * 200) + 120)
        weight = (Math.floor(random() * 200) + 30)
        city = `city-${random()}`
        finalWeight = (Math.floor(random() * 200) + 30)
        points = 0
    })

    describe('when user does not exist', () => {
        let _id

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(password =>
                    User.create({ username, email, password })
                )
                .then(user => _id = user.id)
        )

        it('should succeed on correct and valid and right credentials', () =>
            authenticateUser(email, password)
                .then(id => {
                    expect(id).to.be.a('string')
                    expect(id.length).to.be.greaterThan(0)
                    expect(id).to.equal(_id)
                })
        )
        it('should fail on incorrect email', async () => {
            email = `email-${random()}@mail.com`

            try {
                await authenticateUser(email, password)

                throw new Error('you should not reach this point')
            } catch (error) {
                expect(error).to.exist
                expect(error.message).to.equal(`wrong credentials`)
            }
        })

        it('should fail on incorrect password', async () => {
            password = `password-${random()}`

            try {
                await authenticateUser(email, password)

                throw new Error('you should not reach this point')
            } catch (error) {
                expect(error).to.exist
                expect(error.message).to.equal(`wrong credentials`)
            }
        })

        it('should fail when user does not exist', async () => {
            email = `email-${random()}@mail.com`
            password = `password-${random()}`

            try {
                await authenticateUser(email, password)

                throw new Error('you should not reach this point')
            } catch (error) {
                expect(error).to.exist
                expect(error.message).to.equal(`wrong credentials`)
            }
        })

    })
    describe('unhappy paths', () => {

        it('should fail on a non-string and non-valid email', () => {
            email = 1
            expect(() =>
                authenticateUser(email, password)
            ).to.throw(TypeError, `email ${email} is not a string`)

            email = false
            expect(() =>
                authenticateUser(email, password)
            ).to.throw(TypeError, `email ${email} is not a string`)

            email = undefined
            expect(() =>
                authenticateUser(email, password)
            ).to.throw(TypeError, `email ${email} is not a string`)

            email = []
            expect(() =>
                authenticateUser(email, password)
            ).to.throw(TypeError, `email ${email} is not a string`)

            email = 'kfjsnfksdn'
            expect(() =>
                authenticateUser(email, password)
            ).to.throw(ContentError, `${email} is not an e-mail`)

            email = 'kfjsnfksdn@123'
            expect(() =>
                authenticateUser(email, password)
            ).to.throw(ContentError, `${email} is not an e-mail`)
        })

        it('should fail on a non-string password', () => {
            password = 1
            expect(() =>
                authenticateUser(email, password)
            ).to.throw(TypeError, `password ${password} is not a string`)

            password = false
            expect(() =>
                authenticateUser(email, password)
            ).to.throw(TypeError, `password ${password} is not a string`)

            password = undefined
            expect(() =>
                authenticateUser(email, password)
            ).to.throw(TypeError, `password ${password} is not a string`)

            password = []
            expect(() =>
                authenticateUser(email, password)
            ).to.throw(TypeError, `password ${password} is not a string`)
        })
    })

    after(async () => {
        await Promise.resolve(User.deleteMany())
        return await mongoose.disconnect()
    })



})















