const { toggleFavVehicle } = require("../logic")




module.exports = (req, res) => {
    const { params: { id }, session } = req
    const { token } = session

    
    try {
        if (!token) {
            session.referer = req.get('referer')
    
            session.fav = id
    
            return session.save(() => res.redirect('/login'))
            
        } else {
            return toggleFavVehicle(token, id)
            .then(()=> {
                const { referer = req.get('referer') } = session
        
                delete session.referer
                delete session.fav
        
                session.save(() => res.redirect(referer))
    
            })
            .catch((error) => {
                logger.warn(error)
                res.redirect("/error")
            })

        }
    } catch ({ message }) {
        logger.warn(error)
            res.redirect("/error")
    }

}