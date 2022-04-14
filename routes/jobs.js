// 3rd File

const express = require("express")
const router = express.Router()
// Importing getJobs function from jobsController
const {
  getJobs,
  newJob,
  getJobsInRadius,
} = require("../controllers/jobsController")

// Route to all jobs
router.route("/jobs").get(getJobs)

// Route to new job
router.route("/job/new").post(newJob)

// Route to jobs around me in radius/distance
router.route("/jobs/:zipcode/:distance").get(getJobsInRadius)

module.exports = router
