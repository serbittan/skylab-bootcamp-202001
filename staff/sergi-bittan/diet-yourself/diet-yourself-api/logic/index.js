module.exports = {
    registerUser: require('./register-user'),
    authenticateUser: require('./authenticate-user'),
    retrieveUser: require('./retrieve-user'),
    retrieveLastEvents: require('./retrieve-last-events'),
    publishEvent: require("./publish-event"),
    updateUser: require("./update-user"),
    toggleFavDiets: require("./toggle-fav-diets")
}