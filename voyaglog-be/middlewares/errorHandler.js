const errorHandler = (err, req, res, next) => {
    process.env.NODE_ENV !== 'production' && console.error(err.stack);
    res.status(res.statusCode || 500 ).json({
        success: false,
        message: err.message,

    });
};

export default errorHandler;