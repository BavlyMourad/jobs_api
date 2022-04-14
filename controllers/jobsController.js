// 4th File

const Job = require("../models/jobs")
const geoCoder = require("../utils/geocoder")

// Get all jobs -> /api/v1/jobs
exports.getJobs = async (req, res, next) => {
  const jobs = await Job.find()

  res.status(200).json({
    success: true,
    results: jobs.length,
    data: jobs,
  })
}

// Create a new job -> /api/v1/job/new
exports.newJob = async (req, res, next) => {
  const job = await Job.create(req.body)

  res.status(200).json({
    success: true,
    message: "Job created",
    data: job,
  })
}

// Search for jobs in radius -> /api/v1/jobs/:zipcode/:distance
exports.getJobsInRadius = async (req, res, next) => {
  const { zipcode, distance } = req.params

  // Getting latitude & longitude from geocoder with zipcode
  const loc = await geoCoder.geocode(zipcode)
  const latitude = loc[0].latitude
  const longitude = loc[0].longitude

  // 3963 = radius of earth in miles
  const radius = distance / 3963

  const jobs = await Job.find({
    // geoWithin built in operator helps us to do search within geo
    location: {
      $geoWithin: { $centerSphere: [[longitude, latitude], radius] },
    },
  })

  res.status(200).json({
    success: true,
    results: jobs.length,
    data: jobs,
  })
}
