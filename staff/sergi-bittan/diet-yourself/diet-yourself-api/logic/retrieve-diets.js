const { models: { User } } = require("diet-yourself-data")

const { validate } = require("diet-yourself-utils")
const { NotFoundError } = require("diet-yourself-errors")


module.exports =  (id)=> {

    validate.string(id, "id")

    return (async () => {

        const user = await User.findById(id)
        
        if (!user) throw new NotFoundError(`user with id ${id} not found`)
        

        const diets = user.favorites

        const userDiets = []
        
        if(!diets) throw new NotFoundError(`there are no diets`)

                
        diets.forEach(diet =>{
            userDiets.push({
                idDiet: diet._id,
                method: diet.method,
                foods: diet.foods,
                points: diet.points,
                calories: diet.calories

            })
        })

       return userDiets
        
    })()

}