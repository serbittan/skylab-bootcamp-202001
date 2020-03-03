const { validate } = require("../utils")
const { models: { User, Event } } = require("../data")
const { NotFoundError } = require("../errors")


module.exports = (userId, eventId) => {
    validate.string = (userId, "id")
    validate.string = (eventId, "id")

    // const _userId = ObjectId(userId)
    // const _eventId = ObjectId(eventId)

    

    return Event.find({ id: eventId }).toArray()
        .then(event => {
            if (!event) throw new NotFoundError('event not found')
            return users.find({ _id: ObjectId(_userId), subscribeEvent: _eventId }).toArray()
                .then(result => {
                    if (result.length === 0)
                        return users.updateOne({ _id: ObjectId(_userId) }, { $push: { subscribeEvent: _eventId } })
                            .then(eventSubscribe => {
                                return users.findOne({ _id: ObjectId(_userId) })
                            })
                    else throw new NotFoundError('you already subscribe in this event')
                })

        })

}

