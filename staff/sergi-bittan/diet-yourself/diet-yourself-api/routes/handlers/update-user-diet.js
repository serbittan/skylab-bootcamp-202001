
const { updateUserDiet } = require('../../logic')
const { NotAllowedError } = require('diet-yourself-errors')

module.exports = (req, res) => {
    const { param: { userId, dietId } } = req
debugger
    try {
        debugger
        updateUserDiet(userId, dietId)
            .then(diets =>
                res.status(200).json(diets)
            )
            .catch(error => {
                let status = 400

                if (error instanceof NotAllowedError)
                    status = 401 // not authorized

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
            status = 406 // not acceptable

        const { message } = error

        res
            .status(status)
            .json({
                error: message
            })
    }
}