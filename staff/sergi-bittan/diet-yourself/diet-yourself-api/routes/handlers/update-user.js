const { updateUser } = require("../../logic")
const { NotFoundError } = require("diet-yourself-errors")

module.exports = (req, res) => {
    const { payload: { sub: id }, body } = req
   
    try{
        updateUser(id, body)
            .then(() => res.status(201).json({ message: "You've successfully updated this User" }))
            .catch(({ message }) =>
                res
                    .status(401)
                    .json({
                        error: message
                    })
            )
    } catch (error) {
        let status = 400

        switch (true) {
            case error instanceof NotFoundError:
                status = 404 // not found
                break
        }

        const { message } = error

        res
            .status(status)
            .json({
                error: message
            })
    }
}