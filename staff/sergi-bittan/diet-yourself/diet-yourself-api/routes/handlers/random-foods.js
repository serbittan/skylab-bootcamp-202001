const { randomFoods } = require('../../logic')
const { NotAllowedError, ContentError } = require('diet-yourself-errors')

module.exports = (req, res) => {
    const { body: {goal, activity, gender, age, height, weight, method} } = req
    debugger
    try {
        
        randomFoods( goal, activity, gender, age, height, weight, method )
            .then(response => res.status(201).end(response))
            .catch(error => {
                let status = 400

                if (error instanceof NotAllowedError)
                    status = 409 // conflict

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