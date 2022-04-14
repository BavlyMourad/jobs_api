// 1st File

const express = require("express")
const dotenv = require("dotenv")
const jobsRoutes = require("./routes/jobs")
const connectDatabase = require("./config/database")

const app = express()

// Setting up config.env file variables (After 2nd file)
dotenv.config({ path: "./config/config.env" })

// Connecting to Database (After 5th file)
connectDatabase()

// Setup body parser (After 6th file)
app.use(express.json())

// Creating middleware
const middleWare = (req, res, next) => {
  console.log("Hello from middleware")

  // Setting up user variable globally(since it can be used everywhere it is global)
  req.user = "Bavly Mourad"
  next()
}
app.use(middleWare)

// All routes (After 3rd file)
app.use("/api/v1", jobsRoutes)

const PORT = process.env.PORT

app.listen(PORT, () =>
  console.log(
    `Server is running on port:${PORT} in ${process.env.NODE_ENV} mode`
  )
)
