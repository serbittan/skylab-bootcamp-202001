require('dotenv').config()

const {
    mongoose,
    models: { User, Diet, Food },
    constants: { foods, diets, goals, activities }
} = require('diet-yourself-data')

const { env: { TEST_MONGODB_URL } } = process

    ; (async () => {
        await mongoose.connect('mongodb://localhost:27017/test-diet-yourself', { useNewUrlParser: true })

        const user = new User({ 
            username: 'pepito',
            email: 'pepito@mail.com',
            password: '123',
            goal: goals[1],
            activity: activities[0],
            gender: 'male',
            age: 40,
            height: 180,
            weight: 84
        })

        // calculate user points
        user.points = 20

        // TODO calculate how many points for carb, protein and fat
        const carb = 7
        const protein = 10
        const fat = 3

        // get the tables from random foods (chosen before)
        const chicken = foods.find(food => food.name === 'chicken')
        const eggs = foods.find(food => food.name === 'eggs')
        const rice = foods.find(food => food.name === 'rice')
        const oliveOil = foods.find(food => food.name === 'olive oil')

        // create the calculated foods
        const chickenFood = new Food({
            name: chicken.name,
            quantity: protein / 2 * chicken.quantity
        })
        const eggsFood = new Food({
            name: eggs.name,
            quantity: protein / 2 * eggs.quantity
        })
        const riceFood = new Food({
            name: rice.name,
            quantity: carb * rice.quantity
        })
        const oliveOilFood = new Food({
            name: oliveOil.name,
            quantity: fat * oliveOil.quantity
        })

        // create the diet
        const diet = new Diet({
            points: user.points,
            foods: [
                chickenFood,
                eggsFood,
                riceFood,
                oliveOilFood
            ],
            method: "duncan"
        })

        // save all data
        user.diet = diet

        await user.save()
    })()
        .catch(console.error)
        .finally(mongoose.disconnect)