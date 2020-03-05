const { NotFoundError } = require("events-errors")
const { retrieveLastEvents } = require("../logic")

module.exports = (req, res) => {
    

    try{
        retrieveLastEvents(date)
        .then((events) => {
            res.status(200).json(events)
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