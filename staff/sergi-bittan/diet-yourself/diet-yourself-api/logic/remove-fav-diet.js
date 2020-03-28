const { validate } = require("diet-yourself-utils")
const { models: { User } } = require("diet-yourself-data")
const { NotFoundError } = require("diet-yourself-errors")


/**
 * Check if dietid exist in [favs].
 * Find user by id. Check if user have dietId in array favorites. Then, put in if not is or get out if is in.
 * then save data user in db
 * 
 * @param {string} id diet`s unique id
 * @param {string} token
 * 
 * @return {Promise<object>} user from storage
 * 
 * @throws {}...
 */

module.exports = (id, idDiet) => {

    validate.string(id, "id")
    validate.string(idDiet, "idDiet")

    return User.findById(id)

        //quitar dieta de los favs

        .then(user => {
            if (!user) throw new NotFoundError(`user with id ${id} does not exist`)

            const { favorites } = user

            const index = favorites.findIndex(item => item._id === idDiet)

            if (index !== -1) {

                favorites.splice(index, 1)

            }
            else throw new NotFoundError(`diet with id ${idDiet} does not exist`)

            user.save()

        })
        .then(() => { })
}