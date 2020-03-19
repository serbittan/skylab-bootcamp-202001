const { validate } = require("diet-yourself-utils")
const { NotFoundError } = require("diet-yourself-errors")
const { models: { Diet, User }  } = require("diet-yourself-data")
const { constants: { methods, foods }} = require("diet-yourself-utils")
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

        const proteinPoints = points * protein / 100
        const carbsPoints = points * carbs / 100
        const fatPoints = points * fat / 100

        

        const proteinFoods = foods.filter(food => food.domain === 'protein')
        const carbsFoods = foods.filter(food => food.domain === 'carbs')
        const fatFoods = foods.filter(food => food.domain === 'fat')
        
        debugger
        
        let counter = 0
        let counterProteins = 0
        let counterCarbs = 0
        let counterFats = 0
        let dietFoods = []
        
        while(counter < points) {

            if (counterProteins < proteinPoints) {

                let random = Math.floor(Math.random()*proteinFoods.length)
                result = dietFoods.findIndex(item => ( item.name === proteinFoods[random].name))
                if (result === -1) dietFoods.push(proteinFoods[random])
                else dietFoods[result].quantity+=proteinFoods[random].quantity
                //dietFoods.push(proteinFoods[random])
    
                counterProteins += proteinFoods[random].points
                debugger
            }

            if (counterCarbs < carbsPoints) {

                let random = Math.floor(Math.random()*carbsFoods.length)
                dietFoods.push(carbsFoods[random])
    
                counterCarbs += carbsFoods[random].points
            }

            
            if (counterFats < fatPoints) {

                let random = Math.floor(Math.random()*fatFoods.length)
                dietFoods.push(fatFoods[random])

                counterFats += fatFoods[random].points
            }

            counter = counterProteins + counterCarbs + counterFats

        }

        console.log('dietFoods => ', dietFoods)

        console.log( counterProteins, counterCarbs, counterFats )


        const diet = new Diet({ method, foods: dietFoods, points })
        
        user.diet = diet


        await user.save()

        const user2 = await User.findById(userId)

        console.log(user2.diet)

        return
    })()

}

