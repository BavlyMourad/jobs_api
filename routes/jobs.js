// 3rd File

const express = require("express")
const router = express.Router()
// Importing getJobs function from jobsController
const {
  getJobs,
  newJob,
  getJobsInRadius,
  updateJob,
  deleteJob,
} = require("../controllers/jobsController")

// Route to all jobs
router.route("/jobs").get(getJobs)

// Route to new job
router.route("/job/new").post(newJob)

// Route to update & delete job, since they use same route we add delete on put
router.route("/job/:id").put(updateJob).delete(deleteJob)

// Route to jobs around me in radius/distance
router.route("/jobs/:zipcode/:distance").get(getJobsInRadius)

module.exports = router
