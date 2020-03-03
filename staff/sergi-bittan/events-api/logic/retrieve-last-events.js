const { validate } = require("../utils")
const { models: { Event } } = require("../data")
const { NotFoundError } = require("../errors")

module.exports = () => Event.find({ date: { $gte: new Date } })
    .lean()
    .then(events => {
        //sanitize
        events.forEach(event => {
            event.id = event._id.toString()

            delete event._id

            event.publisher = event.publisher.toString()
        })

        return events
    })
    