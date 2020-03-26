
const { retrieveUserDiet } = require('../../logic')
const { NotAllowedError, ContentError, TypeError } = require('diet-yourself-errors')

module.exports = (req, res) => {

    
    const { payload: { sub: id } } = req

    try { 
        retrieveUserDiet(id)
            .then(diet =>
                res.status(200).json(diet)
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