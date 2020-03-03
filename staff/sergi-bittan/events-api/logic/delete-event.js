const {validate} = require('../utils')
const { models: { User, Event } } = require('../data')

module.exports = (idEvent =>{
    validate.string(idEvent, 'idEvent')
    
    return User.updateMany({subscribeEvent: idEvent}, {$pull: {subscribeEvent: idEvent}})
        .then(() =>{
            debugger
           Event.findByAndRemove(idEvent)
        })
        .then(() => { })
})
