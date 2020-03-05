const {validate} = require('events-utils')
const { models:{ User }} = require('events-data')
const { NotFoundError, NotAllowedError } = require('events-errors')


module.exports = (idUser, idEvent) =>{
    validate.string(idUser, 'idUser')
    validate.string(idEvent, 'idEvent')

    const _idUser = ObjectId(idUser)
    const _idEvent = ObjectId(idEvent)

    const users = database.collection('users')
    return users.find({_id: ObjectId(_idUser), subscribeEvent: _idEvent }).toArray()
        .then(result =>{
            if(result.length > 0)
                return result
            else throw new NotFoundError('this user has not this subscription')
        })
}