const errorMiddleware = (err, req, res, next) => {
    err.message ||= "Internal Server Error";
    err.statusCode ||= 500

    return res.status(err.statusCode).json({
        suuccess: false,
        message: err.message,
    });
}

const TryCatch = (passedFunction) => async (req, res, next) => {
    try {
        await passedFunction(req, res, next);
    } catch (error) {
        return next(error);
    }
}

export {errorMiddleware, TryCatch};