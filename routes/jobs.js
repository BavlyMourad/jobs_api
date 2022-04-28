// 3rd File

const express = require("express")
const router = express.Router()
// Importing getJobs function from jobsController
const {
  getJobs,
  getJob,
  getJobsInRadius,
  getJobStats,
  newJob,
  updateJob,
  deleteJob,
} = require("../controllers/jobsController")

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth")

// Route to all jobs
router.route("/jobs").get(getJobs)

// Route to a specific jobs
router.route("/job/:id/:slug").get(getJob)

// Route to jobs around me in radius/distance
router.route("/jobs/:zipcode/:distance").get(getJobsInRadius)

// Route to job stats with given topic
router.route("/stats/:topic").get(getJobStats)

// Route to new job
router
  .route("/job/new")
  .post(isAuthenticatedUser, authorizeRoles("employeer", "admin"), newJob)

// Route to update & delete job, since they use same route we add delete on put
router
  .route("/job/:id")
  .put(isAuthenticatedUser, updateJob)
  .delete(isAuthenticatedUser, deleteJob)

module.exports = router
