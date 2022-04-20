// 4th File

const { findById, findByIdAndDelete } = require("../models/jobs")
const Job = require("../models/jobs")
const geoCoder = require("../utils/geocoder")
const ErrorHandler = require("../utils/errorHandler")
const APIFilters = require("../utils/apiFilters")
const catchAsyncErrors = require("../middlewares/catchAsyncErrors")

// catchAsyncErrors added after 10th file
// apiFilters added after 11th file

// Get jobs -> /api/v1/jobs
exports.getJobs = catchAsyncErrors(async (req, res, next) => {
  const apiFilters = new APIFilters(Job.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .searchByQuery()
    .pagination()

  const jobs = await apiFilters.query
  //const jobs = await Job.find()

  res.status(200).json({
    success: true,
    results: jobs.length,
    data: jobs,
  })
})

// Search for sepecific job -> /api/v1/job/:id/:slug
exports.getJob = catchAsyncErrors(async (req, res, next) => {
  const job = await Job.find({
    $and: [{ _id: req.params.id }, { slug: req.params.slug }],
  })

  if (!job || job.length === 0) {
    return next(new ErrorHandler("Job not found", 404))
  }

  res.status(200).json({
    success: true,
    data: job,
  })
})

// Search for jobs in radius -> /api/v1/jobs/:zipcode/:distance
exports.getJobsInRadius = catchAsyncErrors(async (req, res, next) => {
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
})

// Get job stats -> /api/v1/stats/:topic
exports.getJobStats = catchAsyncErrors(async (req, res, next) => {
  // go to mongo terminal and type use jobs then db.jobs.createIndex({title: 'text'}) or manually from mongodb compass
  const stats = await Job.aggregate([
    {
      $match: { $text: { $search: '"' + req.params.topic + '"' } },
    },
    {
      $group: {
        _id: { $toUpper: "$experience" },
        totalJobs: { $sum: 1 },
        avgPositions: { $avg: "$positions" },
        minSalary: { $min: "$salary" },
        avgSalary: { $avg: "$salary" },
        maxSalary: { $max: "$salary" },
      },
    },
  ])

  if (stats.length === 0) {
    return next(
      new ErrorHandler(`no stats found for: ${req.params.topic}`, 404)
    )
  }

  res.status(200).json({
    success: true,
    data: stats,
  })
})

// Create a new job -> /api/v1/job/new
exports.newJob = catchAsyncErrors(async (req, res, next) => {
  const job = await Job.create(req.body)

  res.status(200).json({
    success: true,
    message: "Job created",
    data: job,
  })
})

// Update a job => /api/v1/job/:id
exports.updateJob = catchAsyncErrors(async (req, res, next) => {
  let job = await Job.findById(req.params.id) // let not const

  if (!job) {
    return next(new ErrorHandler("Job not found", 404))
  }

  job = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  res.status(200).json({
    success: true,
    message: "Job updated",
  })
})

// Delete a job => /api/v1/job/:id
exports.deleteJob = catchAsyncErrors(async (req, res, next) => {
  let job = await Job.findById(req.params.id)

  if (!job) {
    return next(new ErrorHandler("Job not found", 404))
  }

  job = await Job.findByIdAndDelete(req.params.id) // ALso there is Job.remove()

  res.status(200).json({
    success: true,
    message: "Job deleted",
  })
})
