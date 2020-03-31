require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { expect } = require('chai')
const { random } = Math
const updateUser = require('./update-user')
const { mongoose, models: { User } } = require('diet-yourself-data')
const { NotFoundError, ContentError } = require('diet-yourself-errors')
const { calculateCalories } = require('./helpers')

describe('updateUser', () => {
    before(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => User.deleteMany())
    )

    //user
    let username, email, password, age, height, weight, city, finalWeight, points, _id, goal, activity, gender, goals, activities, genders, goalIndex, activityIndex, genderIndex, calories
    let newUsername, newAge, newHeight, newWeight, newCity, newGoal, newActivity
    let body

    beforeEach(async () => {

        //data for user
        goals = ["gain muscle mass", "maintain weight", "lose weight"]
        activities = ["sedentary", "mild activity", "moderate activity", "heavy activity"]
        genders = ["male", "female"]

        goalIndex = Math.floor(Math.random() * 3)
        activityIndex = Math.floor(Math.random() * 4)
        genderIndex = Math.floor(Math.random() * 2)


        username = `username-${random()}`
        email = `email-${random()}@mail.com`
        password = '123'
        goal = goals[goalIndex]
        activity = activities[activityIndex]
        gender = genders[genderIndex]
        age = (Math.floor(random() * 65) + 12)
        height = (Math.floor(random() * 200) + 120)
        weight = (Math.floor(random() * 200) + 30)
        city = `city-${random()}`
        finalWeight = (Math.floor(random() * 200) + 30)
        points = 0
        calories = calculateCalories(goal, age, weight, height, gender, activity)

        newUsername = `newUsername-${random()}`
        newAge = (Math.floor(random() * 65) + 12)
        newHeight = (Math.floor(random() * 200) + 120)
        newWeight = (Math.floor(random() * 200) + 30)
        newCity = `newCity-${random()}`
        newGoal = goals[goalIndex]
        newActivity = activities[activityIndex]

        //create user

        const user = await User.create({ username, email, password, goal, activity, gender, age, height, weight, city })

        _id = user.id
    })




    it('should succeed on correct and valid and right data', async () => {
        debugger

        body = {

            username: newUsername,
            age: newAge,
            weight: newWeight,
            height: newHeight,
            goal: newGoal,
            activity: newActivity,
            city: newCity,

        }

        const response = await updateUser(_id, body)

        expect(response).to.not.exist

        const updatedUser = await User.findById(_id)

        expect(updatedUser.username).to.equal(newUsername)

        expect(updatedUser.goal).to.equal(newGoal)
        expect(updatedUser.activity).to.equal(newActivity)
        expect(updatedUser.age).to.equal(newAge)
        expect(updatedUser.height).to.equal(newHeight)
        expect(updatedUser.weight).to.equal(newWeight)
        expect(updatedUser.city).to.equal(newCity)

        expect(updatedUser.calories).to.exist

    })


    // it('should fail on no body provided', async () => {

    //     const body = {}

    //     try {

    //         await updateUser(_id, body)
    //         throw Error('should not reach this point')

    //     } catch (error) {

    //         expect(error).to.exist
    //         expect(error).to.be.an.instanceOf(ContentError)
    //         expect(error.message).to.equal(`No data has been updated`)

    //     }


    // })



    it('should fail on wrong data', async () => {

        body = {

            username: newUsername,
            age: newAge,
            weight: newWeight,
            height: newHeight,
            goal: newGoal,
            activity: newActivity,
            city: newCity


        }

        const wrongId = 'fhtujyi78uyi'

        try {

            await updateUser(wrongId, body)
            throw Error('should not reach this point')

        } catch (error) {

            expect(error).to.exist
            expect(error).to.be.an.instanceOf(NotFoundError)
            expect(error.message).to.equal(`user with id ${wrongId} does not exist`)

        }


    })


    after(() => User.deleteMany().then(() => mongoose.disconnect()))
})