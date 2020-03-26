require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { mongoose, models: { User, Diet } } = require('diet-yourself-data')
const { expect } = require('chai')
const { random } = Math
const addFavDiet = require('./add-fav-diet')

const { NotFoundError } = require("diet-yourself-errors")

const { constants: { methods, foods } } = require("diet-yourself-utils")
const { calculatePoints } = require('./helpers')

describe.only('add diet to favorites', () => {

    before(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => User.deleteMany)
    )

    //user
    let username, email, password, age, height, weight, city, finalWeight, points, id, goal, activity, gender, goalIndex, activityIndex, genderIndex


    //diet

    let method, idDiet, newDiet
    let _foods = []
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

        newDiet = await new Diet({ method, foods: _foods, points })

        idDiet = newDiet.id
        user.diet = []

        user.diet.push(newDiet)
        
        await user.save()

    })


    it('should succeed adding diet to user favs', async () => {debugger
        
        const response = await addFavDiet(id)
        expect(response).to.not.exist

        const user = await User.findById(id)

        const favs = user.favorites
        expect(favs.length).to.equal(1)

        let isFav = false
        favs.forEach(fav => {
            
            if (fav.id === user.diet[0].id) {
                isFav = true
            }
        })
        
        expect(isFav).to.be.true



    })

    // it('should fail on wrong user id', async () => {
    //     let wrongId = '293898iujuyh'

    //     try {
    //         await retrieveUserDiet(wrongId)

    //         throw Error('should not reach this point')
    //     } catch (error) {
    //         expect(error).to.exist
    //         expect(error).to.be.an.instanceOf(NotFoundError)
    //         expect(error.message).to.equal(`user with id ${wrongId} not found`)
    //     }
    // })

    after(() => User.deleteMany()
        .then(() => mongoose.disconnect()))

})   