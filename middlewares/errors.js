// 9th File

const ErrorHandler = require("../utils/errorHandler")

// To test it: edit the update job id
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500

  if (process.env.NODE_ENV === "development") {
    res.status(err.statusCode).json({
      success: false,
      error: err,
      errorMessage: err.message,
      stack: err.stack,
    })
  }

  if (process.env.NODE_ENV === "production") {
    let error = { ...err }
    error.message = err.message

    // Handling Mongoose ObjectID Error
    if (err.name === "CastError") {
      const message = `Resource not found. Invalid: ${err.path}`
      error = new ErrorHandler(message, 404)
    }

    // Handling Mongoose Validation Error
    if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map((value) => value.message)
      error = new ErrorHandler(message, 400)
    }

    // Handling Mongoose Dublicate Key Error (After 14th file)
    if (err.code === 11000) {
      const message = `Duplicate ${Object.keys(err.keyValue)} entered.`
      error = new ErrorHandler(message, 400)
    }

    // Handling Wrong JWT token error
    if (err.name === "JsonWebTokenError") {
      const message = "JSON Web Token is invalid. Try again!"
      error = new ErrorHandler(message, 500)
    }

    // Handling Expired JWT token error
    if (err.name === "TokenExpiredError") {
      const message = "JSON Web Token is expired, Try again!"
      error = new ErrorHandler(message, 500)
    }

    res.status(error.statusCode).json({
      success: false,
      errorMessage: error.message || "Internal Server Error",
    })
  }
}
