const handleNotFoundError = (error, req, res, next) => {
    if (error.name === 'NotFoundError') {
        console.log(err)
        res.status(error.status).json({msg: error.message})
    } else {
        next(error);
    }
}

const handleServerError = (error, req, res, next) => {
    return res.status(500).json({msg: 'Internal server error'})
}

module.exports = {handleNotFoundError, handleServerError};