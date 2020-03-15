module.exports = (req, res) => {
    const { payload: { sub:{ id }}} = req

    try{
        toggleFavDiets(token, id)
            .then(() => 
                res.status(200).json()
            )
            .catch(error => {
                let status = 400

                if (error instanceof NotAllowedError)
                    status = 401

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