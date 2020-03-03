const {validate} = require('../utils')
const { models: { User, Event } } = require('../data')

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
