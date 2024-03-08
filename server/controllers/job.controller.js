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
  req.body.user = req.user._id;
  if (req.user.role != "seeker")
    return next(new ErrorResponse("Employer cannot apply to job", 400));
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

exports.updateJob = asyncHandler(async (req, res, next) => {
  const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!job) return next(new ErrorResponse("Job not found", 404));
  if (req.user._id.toString() !== job.postedBy.toString())
    return next(
      new ErrorResponse("Logged in user cannot delete this job", 401)
    );
  res.status(200).json({ success: true, job });
});

exports.deleteJob = asyncHandler(async (req, res, next) => {
  const job = await Job.findById(req.params.id);
  if (!job) return next(new ErrorResponse("Job not found", 404));
  if (req.user._id.toString() !== job.postedBy.toString())
    return next(
      new ErrorResponse("Logged in user cannot delete this job", 401)
    );
  await Job.deleteOne({ _id: job._id });
  await Application.deleteMany({ job: req.params.id });
  res.status(200).json({ success: true });
});
