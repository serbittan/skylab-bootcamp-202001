
const { retrieveDiets } = require('../../logic')
const { NotAllowedError } = require('diet-yourself-errors')

module.exports = (req, res) => {
    

    try {
        retrieveDiets()
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