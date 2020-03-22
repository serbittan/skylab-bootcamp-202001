const { validate } = require("diet-yourself-utils")
const { NotFoundError } = require("diet-yourself-errors")
const { models: { Diet, User } } = require("diet-yourself-data")
const { constants: { methods, foods } } = require("diet-yourself-utils")
const { calculatePoints } = require('./helpers')



module.exports = (userId, method) => {
    validate.string(userId, "userId")
    validate.string(method, "method")

    return (async () => {
        const user = await User.findById(userId)

        if (!user) throw new NotFoundError(`user with id ${userId} does not exist`)

        const { weight, height, age, gender, activity } = user

        const points = calculatePoints(weight, height, age, gender, activity)

        const { proportions: { protein, carbs, fat } } = methods.find(_method => _method.name === method)

        const proteinPoints = Math.round(points * protein / 100)
        const carbsPoints = Math.round(points * carbs / 100)
        const fatPoints = Math.round(points * fat / 100)
        const fruitPoints = 1
        const vegetablesPoints = 3



        const proteinFoods = foods.filter(food => food.domain === 'protein')
        const carbsFoods = foods.filter(food => food.domain === 'carbs')
        const fatFoods = foods.filter(food => food.domain === 'fat')
        const fruitsFoods = foods.filter(food => food.domain === "fruit")
        const vegetables = foods.filter(food => food.domain === "vegetables")

        debugger

        let counter = 0
        let counterProteins = 0
        let counterCarbs = 0
        let counterFats = 0
        let counterFruit = 0
        let counterVegetables = 0
        let dietFoods = []

        while (counter < points) {

            if (counterProteins < proteinPoints) {

                let random = Math.floor(Math.random() * proteinFoods.length)
                let result = dietFoods.findIndex(item => (item.name === proteinFoods[random].name))
                if (result === -1) dietFoods.push(proteinFoods[random])
                else dietFoods[result].quantity += proteinFoods[random].quantity
                //dietFoods.push(proteinFoods[random])

                counterProteins += proteinFoods[random].points
                debugger
            }

            if (counterCarbs < carbsPoints) {

                let random = Math.floor(Math.random() * carbsFoods.length)
                let result = dietFoods.findIndex(item => (item.name === carbsFoods[random].name))
                if (result === -1) dietFoods.push(carbsFoods[random])
                else dietFoods[result].quantity += carbsFoods[random].quantity

                counterCarbs += carbsFoods[random].points
            }


            if (counterFats < fatPoints) {

                let random = Math.floor(Math.random() * fatFoods.length)
                let result = dietFoods.findIndex(item => item.name === fatFoods[random].name)
                if (result === -1) dietFoods.push(fatFoods[random])
                else dietFoods[result].quantity += fatFoods[random].quantity

                counterFats += fatFoods[random].points
            }


            if (counterFruit < fruitPoints) {
                let random = Math.floor(Math.random() * fruitsFoods.length)
                let result = dietFoods.findIndex(elem => elem.name === fruitsFoods[random].name)
                if (result === -1) dietFoods.push(fruitsFoods[random])
                else dietFoods[result].quantity += fruitsFoods[random].quantity

                counterFruit += 1
            }

            if (counterVegetables < vegetablesPoints) {
                let random = Math.floor(Math.random() * vegetables.length)
                let result = dietFoods.findIndex(elem => elem.name === vegetables[random].name)
                if (result === -1) dietFoods.push(vegetables[random])
                else dietFoods[result].quantity += vegetables[random].quantity

                counterVegetables += 1
            }

            counter = counterProteins + counterCarbs + counterFats

        }

        console.log('dietFoods => ', dietFoods)

        console.log(counterProteins, counterCarbs, counterFats)


        const diet = new Diet({ method, foods: dietFoods, points })

        user.diet = diet


        await user.save()

        // const user2 = await User.findById(userId)

        // console.log(user2.diet)

        return
    })()

}

