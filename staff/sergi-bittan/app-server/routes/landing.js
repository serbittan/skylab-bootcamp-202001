const { retrieveUser } = require("../logic")
const { App, Landing } = require("../components")
const { logger } = require("events-utils")


module.exports = ({ session: { token, acceptCookies } }, res) => {
        if (token) {
            try{
                return retrieveUser(token)
                .then((user) => {
                    const { name, username } = user
        
                    res.send(App({ title: 'My App', body: Landing({ name, username }), acceptCookies }))

                })
                .catch((error) => {
                    logger.error(error)
    
                    res.redirect("/error")

                }) 
            } catch(error){
                logger.error(error)

                res.redirect("/error")
            }
        } else res.send(App({ title: 'My App', body: Landing(), acceptCookies }))
    }
