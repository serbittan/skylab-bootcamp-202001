require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { mongoose, models: { User, Diet } } = require('diet-yourself-data')
const { expect } = require('chai')
const { random } = Math
const retrieveDiet = require('./retrieve-diet')
const bcrypt = require('bcryptjs')
const { NotFoundError } = require("diet-yourself-errors")

const { constants: { methods, foods } } = require("diet-yourself-utils")
const { calculatePoints } = require('./helpers')

describe('retrieve unique diet', () => {

    before(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => User.deleteMany)
    )

    //user
    let username, email, password, age, height, weight, city, finalWeight, points, id, goal, activity, gender, goalIndex, activityIndex, genderIndex


    //diet

    let method, _foods, idDiet, diet, diet2
    let methodIndex = Math.floor(Math.random() * 4)

    const proteinFoods = foods.filter(food => food.domain === 'protein')
    const carbsFoods = foods.filter(food => food.domain === 'carbs')
    const fatFoods = foods.filter(food => food.domain === 'fat')
    const fruitsFoods = foods.filter(food => food.domain === "fruit")
    const vegetables = foods.filter(food => food.domain === "vegetables")

    let proteinIndex = Math.floor(Math.random() * proteinFoods.length)
    let carbsIndex = Math.floor(Math.random() * carbsFoods.length)
    let fatIndex = Math.floor(Math.random() * fatFoods.length)
    let fruitsIndex = Math.floor(Math.random() * fruitsFoods.length)
    let vegetablesIndex = Math.floor(Math.random() * vegetables.length)


    beforeEach(async () => {

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

        //data to create diet

        method = methods[methodIndex].name

        _foods = [proteinFoods[proteinIndex], carbsFoods[carbsIndex], fatFoods[fatIndex], fruitsFoods[fruitsIndex], vegetables[vegetablesIndex]]

        points = calculatePoints(weight, height, age, gender, activity)


        //create user and extract id

        const user = await User.create({ username, email, password, goal, activity, gender, age, height, weight, city, finalWeight, points })

        id = user.id

        //create diet and extract id

        diet = await new Diet({ method, _foods, points })

        idDiet = diet.id

        user.favorites.push(diet)

        diet2 = await new Diet({ method, foods, points })

        idDiet2 = diet2.id

        user.favorites.push(diet2)


        await user.save()

    })


    it('should succeed retrieving user diet', async () => {debugger
        const { method, foods, points } = await retrieveDiet(id, idDiet)


        expect(method).to.exist
        expect(method).to.equal(diet.method)
        expect(points).to.equal(diet.points)


    })

    it('should fail on wrong diet id', async () => {
        let wrongIdDiet = '293898iujuyh'

        try {
            await retrieveDiet(id, wrongIdDiet)

            throw Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceOf(NotFoundError)
            expect(error.message).to.equal(`diet with id ${wrongIdDiet} not found`)
        }
    })

    after(() => User.deleteMany()
        .then(() => mongoose.disconnect()))

})   