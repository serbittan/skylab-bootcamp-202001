const { subscribeEvent } = require('../logic')
const { NotFoundError, NotAllowedError } = require('events-errors')
module.exports = (req, res) => {
    const { payload: { sub: id } } = req
    userId = req.body["userId"]
    eventId = req.body["eventId"]

    try {
        subscribeEvent(userId, eventId)
            .then(events =>
                res.status(200).json(events)
            )
            .catch(({ message }) =>
                res
                    .status(404)
                    .json({
                        error: message
                    })
            )
    } catch (error) {
        let status = 400
        switch (true) {
            case error instanceof NotFoundError:
                status = 404 // not found
                break
            case error instanceof NotAllowedError:
                status = 403 // forbidden
        }
        const { message } = error
        res
            .status(status)
            .json({
                error: message
            })
    }
}
