const { registerUser } = require("../logic")
const { App, Register } = require("../components")
const { logger } = require("../utils")


module.exports = (req, res) => {
    const { body: { name, surname, username, password } } = req


    try {
        return registerUser(name, surname, username)
        .then(() => {
            return res.render("register", { error: message, name, surname, username, acceptCookies })

        }).catch((error => {
            const { message } = error
            const { session: { acceptCookies}} = req
            logger.warn(error)
            res.render("register", { error: message, name, surname, username, acceptCookies })
        }))
    
    } catch (error) {
        logger.error("/error")
        const { message } = error
        const { session: { acceptCookies } } = req

        res.render("register", { error: message, name, surname, username, acceptCookies })
    }
}