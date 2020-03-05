const {validate} = require('events-utils')
const { models: { User, Event } } = require('events-data')

module.exports = (idEvent =>{
    debugger
    validate.string(idEvent, 'idEvent')
    
    return User.updateMany({subscribeEvent: idEvent}, {$pull: {subscribeEvent: idEvent}})
        .then((user => {
            debugger
            Event.findByIdAndRemove(idEvent)
        }))
        .then(() => { })
})
