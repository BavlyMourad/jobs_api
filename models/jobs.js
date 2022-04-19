// 6th File

const mongoose = require("mongoose")
const validator = require("validator")
const slugify = require("slugify")
const geoCoder = require("../utils/geocoder")

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter job title."],
    trim: true,
    maxlength: [100, "Job title can not exceed 100 characters."],
  },
  slug: String,
  description: {
    type: String,
    required: [true, "Please enter a job description."],
    maxlength: [100, "Job description can not exceed 100 characters."],
  },
  email: {
    type: String,
    validate: [validator.isEmail, "Please add a valid email address"],
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
    },
    coordinates: {
      type: [Number],
      index: "2dsphere",
    },
    formattedAddress: String,
    city: String,
    state: String,
    zipcode: String,
    country: String,
  },
  address: {
    type: String,
    required: [true, "Please add an address"],
  },
  company: {
    type: String,
    required: [true, "Please add company name"],
  },
  industry: {
    type: [String], // Array of string because it can be business and information technology
    required: [true, "Please enter job industry"],
    enum: {
      values: [
        "Business",
        "Information Technology",
        "Banking",
        "Education/Training",
        "Telecommunication",
        "Others",
      ],
      message: "Please select correct option for industry.",
    },
  },
  jobType: {
    type: String, // Not array of string because it cant be both permanent and temporary, only 1 type
    required: [true, "Please enter job type"],
    enum: {
      values: ["Permanent", "Temporary", "Internship"],
      message: "Please select correct option for job type.",
    },
  },
  minEducation: {
    type: String,
    required: [true, "Please enter min education for this job"],
    enum: {
      values: ["Bachelors", "Masters", "PHD"],
      message: "Please select correct option for education.",
    },
  },
  positions: {
    type: Number,
    default: 1,
  },
  experience: {
    type: String,
    required: [true, "Please enter job experience"],
    enum: {
      values: ["No experience", "1-2 years", "2-5 years", "5+ years"],
      message: "Please select correct option for experience.",
    },
  },
  salary: {
    type: Number,
    required: [true, "Please enter expected salary for this job"],
  },
  postingDate: {
    type: Date,
    default: Date.now,
  },
  lastDate: {
    type: Date,
    default: new Date().setDate(new Date().getDate() + 7), // Set date to now + 7 = 7 days after posting
  },
  applicantsApplied: {
    type: [Object], // ID, Resume reference
    select: false, // Cant display data to user
  },
})

// Creating mongoose Middleware Job Slug before saving, used normal function so we can use this keyword
jobSchema.pre("save", function (next) {
  // Creating slug before saving to DB
  this.slug = slugify(this.title, { lower: true })

  next()
})

// Setting up location
jobSchema.pre("save", async function (next) {
  const loc = await geoCoder.geocode(this.address)

  this.location = {
    type: "Point",
    coordinates: [loc[0].longitude, loc[0].latitude], // loc is array so we take first index
    formattedAddress: loc[0].formattedAddress,
    city: loc[0].city,
    state: loc[0].stateCode,
    zipcode: loc[0].zipcode,
    country: loc[0].countryCode,
  }
})

module.exports = mongoose.model("Job", jobSchema)
