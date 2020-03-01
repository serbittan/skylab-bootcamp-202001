const { validate } = require("../utils")
const { database } = require("../data")
const { NotFoundError } = require("../errors")

module.exports = date => {
    validate.type = (date, "date", Date)

    const events = database.collection("events")

    return events.find({ date :{$gte : new Date}}).toArray()
    .then(events => {

        if (!events) throw new NotFoundError("events not found")
        return events
    })

}