// unsupported (404)
const notFound = (req, res, next) => {
    const error = new Error(`No encontrado - ${req.originalUrl}`);
    res.status(404);
    next(error);
}

// handle error
const errorHandler = (error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }

    res.status(error.code || 500).json({message: error.message || "Un error desconocido ocurrió"})
}

module.exports = {notFound, errorHandler}