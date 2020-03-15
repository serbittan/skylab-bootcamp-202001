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

module.exports = (token, id) => {
    validate.string(id, "id")
    validate.jwt(token)

    return User.findById({id})
        .then(user => {
            if (!user) throw new NotFoundError(`user with id ${id} does not exist`)
                const { favorites } = user
          if (favorites.indexOf(id) !== -1){
              favorites.splice(favorites.indexOf(id), 1)
          } else {
              const diet = new Diet({ method, proportions, points })

              user.favorite.push(diet)
          }

          user.save()


        })
        .then(() => {})
}