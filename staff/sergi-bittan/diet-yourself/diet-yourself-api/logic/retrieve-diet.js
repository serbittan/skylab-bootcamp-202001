const { models: { User } , ObjectId} = require("diet-yourself-data")

const { validate } = require("diet-yourself-utils")
const { NotFoundError } = require("diet-yourself-errors")


module.exports =  (id, idDiet)=> {

    validate.string(id, "id")

    validate.string(idDiet, "idDiet")

    return (async () => {

        const user = await User.findById(id)
        
        if (!user) throw new NotFoundError(`user with id ${id} not found`)
        

        const diets = await User.findOne({_id:id }, {favorites: { $elemMatch: { _id: idDiet } }})

        const diet = diets.favorites[0]
        
        if(!diet) throw new NotFoundError(`diet with id ${idDiet} not found`)

        const { method, foods, points } = diet

        return { method, foods, points }
        
    })()

}