const { validate } = require("../utils")
const { database, database: { ObjectId } } = require("../data")
const { NotFoundError } = require("../errors")


module.exports = (userId, eventId) => {
    validate.string = (userId, "id")
    validate.string = (eventId, "id")

    const _userId = ObjectId(userId)
    const _eventId = ObjectId(eventId)

    const users = database.collection("users")
    const events = database.collection("events")

    return events.find({ _id: _eventId }).toArray()
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

