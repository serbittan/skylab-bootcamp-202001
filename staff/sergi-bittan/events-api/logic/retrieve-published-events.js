const { validate } = require('../utils')
const { models: { User } } = require('../data')
const { NotFoundError } = require('../errors')

module.exports = id => {
    validate.string(id, 'id')

    const _id = ObjectId(id)

    const events = database.collection("events")

    return events.find({ publisher: _id}).toArray()
    .then((results) => {
        
        if (!results) throw new NotFoundError("events not found")
        return results 
    })

}   














//     return events.findOne({ _id })
//         .then(user => {
//             if (!user) throw new NotFoundError(`user with id ${id} does not exist`)
//             if (!user.publishedEvents) throw new NotFoundError(`user with id ${id} does not exist`)
            
//             if (user.deactivated) throw new NotAllowedError(`user with id ${id} is deactivated`)

//             return users.findOne({ _id: _id ,  publishedEvents: [] })
//                 .then(() => {
//                     const { publishedEvents } = user

//                     return { publishedEvents }
//                 })
//         })
