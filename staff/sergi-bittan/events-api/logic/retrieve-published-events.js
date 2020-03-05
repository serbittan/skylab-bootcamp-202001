const { validate } = require('events-utils')
const { models: { User, Event } } = require('events-data')
const { NotFoundError } = require('events-errors')

module.exports = id => {
    validate.string(id, 'id')

    return User.findById(id)
        .then(user => {
            if (!user) throw new NotFoundError(`user witn id ${id} not found`)

            return Event.find({ publisher: ObjectId(id), date: { $gte: new Date } })
                .lean()
                .then(events => {
                    // sanitize
                    events.forEach(event => {
                        event.id = event._id.toString()

                        delete event._id

                        event.publisher = event.publisher.toString()
                    })

                    return events
                })
        })
}
