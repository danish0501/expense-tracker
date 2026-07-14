const errorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";

    // Mongoose Validation Error
    if (err.name === "ValidationError") {
        statusCode = 400;

        message = Object.values(err.errors)
            .map((item) => item.message)
            .join(", ");
    }

    // Invalid Mongo ObjectId
    if (err.name === "CastError") {
        statusCode = 400;
        message = "Invalid resource ID.";
    }

    res.status(statusCode).json({
        success: false,
        message,
    });
};

module.exports = errorHandler;