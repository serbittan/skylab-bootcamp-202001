const { validate } = require("diet-yourself-utils")

module.exports = (userId, dietId) => {
    validate.string(userId, "userId")
    validate.string(dietId, "dietId")

    return (async () => {
        debugger
        const user = await findByIdAndUpdate({userId}, {dietId})
        const saveDiet = await user.save()
    
        return saveDiet
    })()


}