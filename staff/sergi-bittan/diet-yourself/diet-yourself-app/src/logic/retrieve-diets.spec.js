const { mongoose, models: { User, Diet } } = require('diet-yourself-data')
const { constants: { activities, foods, goals, methods } } = require('diet-yourself-utils')
const { random } = Math
const { retrieveDiets } = require('.')
const jwt = require('jsonwebtoken')
import context from './context'

const { env: {
    REACT_APP_TEST_MONGODB_URL: TEST_MONGODB_URL,
    REACT_APP_TEST_JWT_SECRET: TEST_JWT_SECRET
} } = process

describe('retrieveDiets', () => {
    let username, email, password, goal, activity, gender, age, height, weight, city, finalWeight, calories, points, method
    let genderList = ['male','female']
    let goalIndex = Math.floor(Math.random() * 3)
    let activityIndex = Math.floor(Math.random() * 4)
    let genderIndex = Math.floor(Math.random() * 2)
    let methodIndex = Math.floor(Math.random() * 4)

    beforeAll(async () => {
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
        calories = Math.floor(Math.random() * 7000) + 1000
        points = Math.floor(Math.random() * 30) + 10
       
    })

    describe('when user and diets exits', () => {
        let idDiet1
        let idDiet2
        let idDiet3
         
        beforeEach(async () => {
            const user = await User.create({ username, email, password, goal, activity, gender, age, height, weight, city, finalWeight })
            context.token = jwt.sign({ sub: user.id }, TEST_JWT_SECRET)

            const diet1 = new Diet({ method, foods, points, calories })
            const diet2 = new Diet({ method, foods, points, calories })
            const diet3 = new Diet({ method, foods, points, calories })
            idDiet1 = diet1.id
            idDiet2 = diet2.id
            idDiet3 = diet3.id

            user.favorites.push(diet1, diet2, diet3)

            await user.save()
           
        })
        
        it('should suceed on valid data', async () => {
        
            const userDiets = await retrieveDiets()
            
            expect(userDiets).toBeDefined()
            expect(userDiets.length).toBeGreaterThan(0)
            expect(userDiets[0].idDiet).toBe(idDiet1)
            expect(userDiets[1].idDiet).toBe(idDiet2)
            expect(userDiets[2].idDiet).toBe(idDiet3)

        })

        it('should fail on invalid token', async () => {
            try{
                await retrieveDiets(`${token}-wrong`)
                throw new Error('should not reach this point')
            } catch(error) {
                expect(error).toBeDefined()
                expect(error.message).toBe('token is not defined')
            }
        })

        it('should fail on non favorites diets', async() => {
            try{
                await retrieveDiets()
                
            } catch(error) {
                expect(error).toBeDefined()
                expect(error.message).toBe('you have no favorites diets')
            }
        })
    })

    afterAll(async () => {
        await User.deleteMany()
        await mongoose.disconnect()
    })
})