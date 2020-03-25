module.exports = {
    registerUser: require('./register-user'),
    authenticateUser: require('./authenticate-user'),
    retrieveUser: require('./retrieve-user'),
    updateUser: require("./update-user"),
    toggleFavDiets: require("./toggle-fav-diets"),
    createDiet: require("./create-diet"),
    retrieveDiet: require("./retrieve-diet"),
    retrieveDiets: require("./retrieve-diets"),
    updateUserDiet: require("./update-user-diet"),
    addFavDiet: require("./add-fav-diet"),
    removeFavDiet: require("./remove-fav-diet")
}