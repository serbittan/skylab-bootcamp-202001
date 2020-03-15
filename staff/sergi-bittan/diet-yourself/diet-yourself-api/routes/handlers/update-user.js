const { updateUser } = require("../../logic")
const { NotAllowedError, ContentError } = require("diet-yourself-errors")

module.exports = (req, res) => {
    const { payload: { sub: id }, updates: { username, age, weight, height, goal, activity, city, finalWeight } } = req
    
    try{
        updateUser(id, username, age, weight, height, goal, activity, city, finalWeight)
            .then(() => res.status(201).end())
            .catch(error => {
                let status = 400

                if (error instanceof NotAllowedError)
                    status = 409

                const { message } = error

                res
                    .status(status)
                    .json({
                        error: message
                    })
                })
    } catch (error) {
        let status = 400

        if (error instanceof TypeError || error instanceof ContentError)
            status = 406 

        const { message } = error

        res
            .status(status)
            .json({
                error: message
            })
    }
}