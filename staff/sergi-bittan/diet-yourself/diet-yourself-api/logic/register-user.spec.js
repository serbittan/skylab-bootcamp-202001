require('dotenv').config()

const { expect } = require('chai')
const { random } = Math
const { mongoose, models: { User } } = require('diet-yourself-data')
const registerUser = require('./register-user')
const bcrypt = require('bcryptjs')

const { env: { TEST_MONGODB_URL } } = process

describe('registerUser', () => {
    let username, email, password, goal, activity, gender, age, height, weight, city, finalWeight, points
    //let patron = /^\d*$/
    before(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => User.deleteMany())
    )

    beforeEach(() => {
        username = `username-${random()}`
        email = `email-${random()}@mail.com`
        password = `password-${random()}`
        goal = `goal-${random()}`
        activity = `activity-${random()}`
        gender = `gender-${random()}`
        //age = `age-${float(random())}`
        //height = `height-${random()}`
        //weight = `weight-${random()}`
        city = `city-${random()}`
        //finalWeight = `finalWeight-${random()}`
        //points = `points-${random()}`
    })

    it('should succeed on correct user data', () =>
        registerUser(username, email, password, goal, activity, gender, age, height, weight, city, finalWeight, points)
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
                expect(user.points).to.equal(points)
                expect(user.created).to.be.instanceOf(Date)

                return bcrypt.compare(password, user.password)
            })
            .then(validPassword => expect(validPassword).to.be.true)
    )

    // TODO unhappy paths and other happies if exist

    after(() => User.deleteMany().then(() => mongoose.disconnect()))
})