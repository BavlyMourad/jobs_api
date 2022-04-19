// 1st File

const express = require("express")
const dotenv = require("dotenv")
const jobsRoutes = require("./routes/jobs")
const connectDatabase = require("./config/database")
const errorMiddleware = require("./middlewares/errors")
const ErrorHandler = require("./utils/errorHandler")

const app = express()

// Setting up config.env file variables (After 2nd file)
dotenv.config({ path: "./config/config.env" })

// Handling uncaught exception
process.on("uncaughtException", (err) => {
  console.log(`ERROR: ${err.message}`)
  console.log("Shutting down due to uncaught exception")
  process.exit(1)
})

// Connecting to Database (After 5th file)
connectDatabase()

// Setup body parser (After 6th file)
app.use(express.json())

// // Creating middleware
// const middleWare = (req, res, next) => {
//   console.log("Hello from middleware")

//   // Setting up user variable globally(since it can be used everywhere it is global)
//   req.user = "Bavly Mourad"
//   next()
// }
// app.use(middleWare)

// All routes (After 3rd file)
app.use("/api/v1", jobsRoutes)

// Handle unhandled routes, it must be below the main routes (After 9th file)
app.all("*", (req, res, next) => {
  next(new ErrorHandler(`${req.originalUrl} route not found `, 404))
})

// Errors middleware (After 9th file)
app.use(errorMiddleware)

const PORT = process.env.PORT

const myServer = app.listen(PORT, () =>
  console.log(
    `Server is running on port:${PORT} in ${process.env.NODE_ENV} mode`
  )
)

// Handling unhandled promise rejection / To test it: remove anything from DB_URI (After 9th file)
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`)
  console.log("Server is shutting down due to unhandled promise rejection")
  myServer.close(() => {
    process.exit(1)
  })
})
