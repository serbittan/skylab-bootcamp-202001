const { validate } = require("diet-yourself-utils")
const { ContentError, NotAllowedError, NotFoundError } = require("diet-yourself-errors")
const { models: { User } } = require("diet-yourself-data")
const bcrypt = require('bcryptjs')
const { calculateCalories } = require('./helpers')


module.exports = (id, body) => {  

    validate.string(id, "id")
    validate.type(body, 'body', Object)

    const validInputs = ["username", "age", "weight", "height", "goal", "activity", "city", "finalWeight", "password", "oldPassword"]
    
    for (key in body) {
        if (!validInputs.includes(key)) throw new NotAllowedError(`field ${key} cannot be modified`)
            
        if (key === "password" && !body.oldPassword) throw new ContentError(`old password is needed to change password`)
    }
        
    return (async() =>{
        const user = await User.findById(id)

        if(!user) throw new NotFoundError(`user with id ${id} does not exist`)

        // if(!body) throw new ContentError(`No data has been updated`)
        

        else {


            if (body.password) {
                const result = await bcrypt.compare(body.oldPassword, user.password)
        
                if (!result) throw new NotAllowedError('wrong credentials')
                body.password = await bcrypt.hash(body.password, 10)
            }
        
            for (key in body) {
                user[key] = body[key]
            }
            
            await user.save()
           
            const userSaved = await User.findById(id)
    
            const { goal, age, weight, height, gender, activity } = userSaved
    
            const calories = Math.round(calculateCalories(goal, weight, height, age, gender, activity))
    
            user.calories = calories
    
            await user.save()
     
        }
    
    })()
}