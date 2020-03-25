const { models: { User } } = require("diet-yourself-data")
const { validate } = require("diet-yourself-utils")
const { NotFoundError } = require("diet-yourself-errors")


module.exports = ( id ) => {

    validate.string(id, "id")
    
    return (async () => {
        
        const user = await User.findById(id)
        
        if (!user) throw new NotFoundError(`user with id ${id} not found`)
        
        const userDiets = []

        const favDiets = user.favorites.toObject()

        favDiets.forEach(diet =>{

            userDiets.push({
                method: diet.method,
                foods: diet.foods,
                points: diet.points
            })

        })

        return userDiets
        
    })
}
            // module.exports =  () => {
            
            //     return (async () => {
            //         const diets = await Diet.find()
                    
            //          return diets
            //     })()
            
            // }