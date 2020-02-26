const { retrieveUser, searchVehicles } = require("../logic")
const { App, Login, Landing } = require("../components")
const { logger } = require("../utils")



module.exports = (req, res) => {
    const { query: { query }, session: { token, user, acceptCookies } } = req

    try {
        if (token) {
            const { name, username } = user
            return searchVehicles(token, query)
                .then((vehicles) => {
                    res.send(App({ title: 'Search', body: Landing({ name, username, query, results: vehicles }), acceptCookies }))
                })
                .catch((error) => {
                    logger.error(error)

                    res.redirect("/error")
                })
        }
        else {
            return searchVehicles(undefined, query)
                .then((vehicles) => {
                    res.send(App({ title: "Search", body: Landing({ query, results: vehicles }), acceptCookies }))
                })
                .catch((error) => {
                    logger.error(error)

                    res.redirect("/error")
                })
        }


    } catch (error) {
        logger.error(error)

        res.redirect("/error")
    }

}
