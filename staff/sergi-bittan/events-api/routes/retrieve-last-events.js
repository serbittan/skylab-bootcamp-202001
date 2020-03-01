const { NotFoundError } = require("../errors")
const { retrieveLastEvents } = require("../logic")

module.exports = (req, res) => {
    const { date } = req

    try{
        retrieveLastEvents(date)
        .then(() => {
            res.status(200).end()
        })
        .catch(({message}) => {
            res
                .status(400)
                .json ({
                    error:message
                })
        })

    }catch(error){
        const { message } = error
        res
            .status(404)
            .json({
                error: message
            })
  
    }

}