// 16th File

const jwt = require("jsonwebtoken")
const User = require("../models/users")
const catchAsyncErrors = require("../middlewares/catchAsyncErrors")
const ErrorHandler = require("../utils/errorHandler")

// Check if the user is authneticated or not
exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // Bearer token will be splitted to token using the ' ' (space) and [1] which means index 1 which is token
    token = req.headers.authorization.split(" ")[1]
  }

  if (!token) {
    return next(new ErrorHandler("Login first to access this resource", 401))
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET)
  req.user = await User.findById(decoded.id)

  next()
})
