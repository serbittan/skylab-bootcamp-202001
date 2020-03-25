require('dotenv').config()

const { expect } = require('chai')
const { random, floor } = Math
const { mongoose, models: { User } } = require('diet-yourself-data')
const { NotAllowedError } = require('diet-yourself-errors')
const registerUser = require('./register-user')
const bcrypt = require('bcryptjs')

const { env: { TEST_MONGODB_URL } } = process

describe('registerUser', () => {
    let username, email, password, age, height, weight, city, finalWeight, points
    let goal = ["gain muscle mass","maintain weight","lose weight"]
    goalIndex = Math.floor(Math.random() * 3)
    let activity = ["sedentary","mild activity","moderate activity", "heavy activity"]
    activityIndex = Math.floor(Math.random() * 4)
    let gender = ["male", "female"]
    genderIndex= Math.floor(Math.random() * 2)

    before(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => User.deleteMany())
    )

    beforeEach(async () => {
        username = `username-${random()}`
        email = `email-${random()}@mail.com`
        password = `password-${random()}`
        debugger
        goal = goal[goalIndex]
        activity = activity[activityIndex]
        gender = gender[genderIndex]
        age = (Math.floor(random() * 65) + 12)
        height = (Math.floor(random() * 200) + 120)
        weight = (Math.floor(random() * 200) + 30)
        city = `city-${random()}`
        finalWeight = (Math.floor(random() * 200) + 30)
        points = Math.floor(random() * 100)

        // const user = await User.create({ username, email, password, goal, activity, gender, age, height, weight, city, finalWeight, points })

        // id = user.id
        // _email = user.email
        // await user.save()
    })

    it('should succeed on correct user data', async () => {debugger
        await registerUser(username, email, password, goal, activity, gender, age, height, weight, city, finalWeight)
            .then(result => {
                expect(result).not.to.exist
                expect(result).to.be.undefined

                return User.findOne({ email })
            })
            .then(user => {
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

                return bcrypt.compare(password, user.password)
            })
            .then(validPassword => expect(validPassword).to.be.true)
        })

    // it('should fail on existing username', async () => {
        
    //     try {
    //         await registerUser(username, email, password, goal, activity, gender, age, height, weight, city, finalWeight)

    //         throw Error('should not reach this point')
    //     } catch (error) {
    //         expect(error).to.exist
    //         expect(error.toString()).to.be.an.instanceOf(NotAllowedError)
    //         expect(error.message).to.equal(`user with email ${email} already exists`)
    //     }
    // })

    // TODO unhappy paths and other happies if exist

    after(() => User.deleteMany().then(() => mongoose.disconnect()))
})