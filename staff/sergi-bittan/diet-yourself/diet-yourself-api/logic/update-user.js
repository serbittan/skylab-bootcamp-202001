const { validate } = require("diet-yourself-utils")
const { NotFoundError } = require("diet-yourself-errors")
const { models: { User } } = require("diet-yourself-data")

/**
 * Find user by id and add new info
 * 
 * @param {string} id user's 
 * @param {string} method user's type diet
 * 
 * @returns {Promise<string>} user modificated
 * 
 * @throws {ContentError} if user data does not follow the format and content rules
 * @throws {TypeError} if user data does not have the correct type
 * @throws {NotAllowedError} on wrong credentials
 */

  
//tengo  campos que quiero actualizar y lo llamo updates. updates será un obj!
module.exports = (id, updates) => {  
    const {username, age, weight, height, goal, activity, city, finalWeight } = updates
    debugger
    validate.string(id, "id")
   
    for (key in updates) {
        if (updates[key] === `${username}` || updates[key] === `${goal}` || updates[key] === `${activity}` || updates[key] === `${city}`) {
            validate.string(updates[key], `${key}`)
        }
        else {
        validate.type(parseFloat(updates[key]), `parseFloat(${key})`, Number) 

        }
    }

    return User.findByIdAndUpdate(id, {updates})
        .then((user) => { 
            if (!user) throw new NotFoundError(`user with id ${id} does not exist`)
                })
                .then(() => { })
}
