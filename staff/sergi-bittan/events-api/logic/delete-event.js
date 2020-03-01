const {validate} = require('../utils')
const {database, database:{ObjectId}} = require('../data')
module.exports = (idEvent =>{
    validate.string(idEvent, 'idEvent')
    const _idEvent = ObjectId(idEvent)
    const users = database.collection('users')
    const events = database.collection('events')    
    return users.updateMany({subscribeEvent: _idEvent}, {$pull: {subscribeEvent: _idEvent}})
        .then(deleteEvent =>{
            return events.deleteOne({ _id: _idEvent })
                .then(del => {
                    if(del)
                        var i =1
                })
                
        })
})
