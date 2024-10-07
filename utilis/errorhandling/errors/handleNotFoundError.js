const NotFoundError = require('../errors/handleNotFoundError');

const handleNotFoundError = (err, req, res, next) => {
    if (err.name === 'NotFoundError') {
        // res.render('notFound');
        throw new NotFoundError('Not Found');
    } else {
        next(err);
    }
}

module.exports = handleNotFoundError;