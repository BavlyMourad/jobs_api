// 15th File

// https://blog.logrocket.com/jwt-authentication-best-practices/

// Create and send token and save in cookie
const sendToken = (user, statusCode, res, req) => {
  // Create JWT Token
  const token = user.getJwtToken()

  // Options for cookie
  const options = {
    // days * hours*minutes*seconds*milliseconds
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  }

  if (process.env.NODE_ENV === "production") {
    // Adds secure option only in production mode
    options.secure = true
  }

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
  })
}

module.exports = sendToken
