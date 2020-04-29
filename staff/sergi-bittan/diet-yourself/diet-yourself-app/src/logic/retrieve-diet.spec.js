const { mongoose, models : { User, Diet } } = require('diet-yourself-data')
const { retrieveDiet } = require('.')
const { constants: { activities, foods, goals, methods } } = require('diet-yourself-utils')

import context from './context'
const { random } = Math
const jwt = require('jsonwebtoken')


const { env: {
    REACT_APP_TEST_MONGODB_URL: TEST_MONGODB_URL,
    REACT_APP_TEST_JWT_SECRET: TEST_JWT_SECRET
} } = process


describe('retrieveDiet', () => {
    let username, email, password, goal, activity, gender, age, height, weight, city, finalWeight, calories, points, method
    let goalIndex = Math.floor(Math.random() * 3)
    let activityIndex = Math.floor(Math.random() * 4)
    let genderList = ['male', 'female']
    let genderIndex = Math.floor(Math.random() * 2) 
    let methodIndex = Math.floor(Math.random() * 4)
    beforeAll(async ()=> {
        await mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        await User.deleteMany()
    })
    beforeEach(() => {
        username = `username-${random()}`
        email = `email-${random()}@mail.com`
        password = `password-${random()}`
        goal = goals[goalIndex]
        activity = activities[activityIndex]
        gender = genderList[genderIndex]
        age = Math.floor(Math.random() * 53) + 17
        height = Math.floor(Math.random() * 80) + 120
        weight = Math.floor(Math.random() * 110) + 40
        city = `city-${random()}`
        finalWeight = Math.floor(Math.random() * 110) + 40
        calories = Math.floor(Math.random() * 7000) + 1000
        points = Math.floor(Math.random() * 30) + 10
        method = methods[methodIndex].name


    })

    describe('when user and diet exist', () => {
        
        let _id
        beforeEach(async() => {
            const user = await User.create({username, email, password, goal, activity, gender, age, height, weight, city, finalWeight })
            context.token = jwt.sign({ sub: user.id }, TEST_JWT_SECRET)
            _id = user.id

            const diet = new Diet({ method, foods, points, calories })
            user.favorites.push(diet)
            
            await user.save()
            
        })

        it('should suceed on correct and valid data', async () => {
            
            const user = await User.findById(_id)
            const idDiet = user.favorites[0]._id.toString()

            const diet = await retrieveDiet(idDiet)

            expect(diet).toBeDefined()
            expect(typeof diet).toBe('object')
            expect(diet._id).toBe(idDiet)
            expect(diet.method).toBe(method)
            expect(diet.points).toBe(points)
            expect(diet.calories).toBe(calories)
            expect(diet.foods).toBeDefined()
            expect(diet.foods.length).toBeGreaterThan(0)
        })

        it('should fail on invalid tolken', async () => {
            let idDiet
            try{
                await retrieveDiet(idDiet,`${token}-wrong`)
                throw new Error('should not reach this point')

            } catch(error){
                expect(error).toBeDefined()
                expect(error.message).toBe('token is not defined')
            }
        })
    })

    it('should fail on non-string idDiet', () => {
        let idDiet = 1
        expect(()=>
            retrieveDiet(idDiet)
        ).toThrowError(TypeError, `idDiet ${idDiet} is not a string`)

        idDiet = true
        expect(() =>
            retrieveDiet(idDiet)
        ).toThrowError(TypeError, `idDiet ${idDiet} is not a string`)

        idDiet = undefined
        expect(() =>
            retrieveDiet(idDiet)
        ).toThrowError(TypeError, `idDiet ${idDiet} is not a string`)
    })

    afterAll(async () => {
        await User.deleteMany()
        await mongoose.disconnect()
    })


})

