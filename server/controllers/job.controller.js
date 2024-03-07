const Application = require("../models/Application");
const Job = require("../models/Job");
const asyncHandler = require("../utils/asyncHandler");
const ErrorResponse = require("../utils/ErrorResponse");

exports.postJob = asyncHandler(async (req, res, next) => {
  const job = await Job.create(req.body);
  res.status(201).json({ success: true, job });
});

exports.getJobs = async (req, res, next) => {
  const jobs = await Job.find();
  res.status(200).json({ success: true, jobs });
};

exports.getJob = asyncHandler(async (req, res, next) => {
  const job = await Job.findById(req.params.id);
  if (!job) return next(new ErrorResponse("Job not found", 404));
  return res.status(200).json({ success: true, job });
});

exports.applyJob = asyncHandler(async (req, res, next) => {
  const application = await Application.create(req.body);
  res.status(200).json({ success: true, application });
});
exports.getApplications = asyncHandler(async (req, res, next) => {
  const applications = await Application.find({ job: req.params.id });
  res.status(200).json({ succes: true, applications });
});
exports.viewApplication = asyncHandler(async (req, res, next) => {
  const application = await Application.findById(req.params.id);
  if (!application) next(new ErrorResponse("Application not found", 404));
  return res.status(200).json({ success: true, application });
});
