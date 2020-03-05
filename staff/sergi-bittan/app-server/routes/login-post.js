const { authenticateUser, retrieveUser } = require("../logic")
const { App, Login } = require("../components")
const { logger } = require("events-utils")

module.exports = (req, res) => {
    const { body: { username, password }, session } = req

    try {
        return authenticateUser(username, password)
            .then((token) => {
                session.token = token

                session.save(() => {
                    const { fav } = session

                    if (fav) return res.redirect(307, `/toggle-fav/${fav}`)

                    res.redirect('/')

                })
                return retrieveUser(token)
                
            })
            .then((user) => {
                const { name, username } = user
                req.session.user = user
                res.send(App({title: "landing", body: Landing({name, username})}))
            })
            .catch((error) => {

                const { message } = error
                const { session: { acceptCookies } } = req

                logger.warn(error)
                return res.render("login", { error: message, username, acceptCookies })
            })



    } catch (error) {
        logger.error(error)

        const { message } = error
        const { session: { acceptCookies } } = req

        //res.send(App({ title: 'Login', body: Login({ error: message }), acceptCookies }))
        res.render("login", { error: message, username, acceptCookies })
    }

}
