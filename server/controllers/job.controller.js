const Application = require("../models/Application");
const Job = require("../models/Job");
const User = require("../models/User");
const { sendApplication, updateStatus } = require("../utils/mail");
const asyncHandler = require("../utils/asyncHandler");
const ErrorResponse = require("../utils/ErrorResponse");
const {generateText} = require("../utils/openai");

exports.postJob = asyncHandler(async (req, res, next) => {
  req.body.postedBy = req.user._id;
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

exports.applyJob = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (user.role != "seeker")
    return next(new ErrorResponse("Employer cannot apply to job", 400));
  const prevApplication = await Application.find({
    user: user._id,
    job: req.params.id,
  });

  if (prevApplication.length > 0)
    return next(new ErrorResponse("Already applied for the job", 400));

  const job = await Job.findById(req.params.id).populate("postedBy", "email");

  const response = await generateText(job);

  const mailContent = JSON.parse(response).mail;

  const application = new Application({
    user: user._id,
    job: req.params.id,
    message: mailContent,
  });
  console.log(JSON.parse(response).mail);

  await sendApplication(mailContent, job, req.user, application);
  await application.save();

  res.status(200).json({ success: true, application });
});

exports.getApplications = asyncHandler(async (req, res, next) => {
  const applications = await Application.find({ job: req.params.id });
  res.status(200).json({ succes: true, applications });
});

exports.viewApplication = asyncHandler(async (req, res, next) => {
  const application = await Application.findById(req.params.id).populate(
    "user job"
  );
  if (!application)
    return next(new ErrorResponse("Application not found", 404));
  if (application.user._id.toString() != req.user._id.toString())
    return next(new ErrorResponse("Cannot view other users application", 400));
  return res.status(200).json({ success: true, application });
});

exports.seenApplication = asyncHandler(async (req, res, next) => {
  const pixel = Buffer.from(
    "R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==",
    "base64"
  );

  const application = await Application.findByIdAndUpdate(req.params.id, {
    status: "seen",
  });
  const user = await User.findById(application.user);
  const job = await Job.findById(application.job);
  await updateStatus(user, job, pixel);
  res.set("Content-Type", "image/gif");
  res.send(pixel);
});

exports.getMyApplications = asyncHandler(async (req, res, next) => {
  const stat = [];
  // const jobs = await Job.find({ postedBy: req.user._id });
  // const jobId = jobs.map((job) => job._id);
  const applications = await Application.find({}).populate(
    "job user",
    "title company name email salary createdAt"
  );

  applications.forEach((app) => {
    const { title, company, salary, _id } = app.job;
    const jobDetails = {
      appId: app._id,
      jobId: _id,
      title,
      company,
      salary,
      applications: applications
        .filter((a) => a.job._id == _id)
        .map((a) => ({
          _id: a.user._id,
          name: a.user.name,
          email: a.user.email,
        })),
    };
    const isExist = stat.find((s) => s.jobId == _id);
    if (!isExist) stat.push(jobDetails);
  });

  res.status(200).json({
    role: req.user.role,
    succes: true,
    stat,
  });
});

exports.seekerStats = asyncHandler(async (req, res, next) => {
  const applications = await Application.find({ user: req.user._id }).populate(
    "job user",
    "title company name email salary createdAt"
  );
  res.status(200).json({ success: true, applications });
});

exports.applicationStats = asyncHandler(async (req, res, next) => {
  const stats = await Application.find({
    user: req.user._id,
  }).populate("job user");
  // console.log(stats)
  res.status(200).json({ success: true, stats });
});

exports.employerStats = asyncHandler(async (req, res, next) => {
  if (req.user.role == "seeker")
    return next(new ErrorResponse("Seeker cannot access this route", 400));
  const jobs = await Job.find({}).populate("postedBy");
  const applications = await Application.find({}).populate("user job");
  res.status(200).json({ success: true, jobs, applications });
});

exports.getMyAppliedJobApplications = asyncHandler(async (req, res, nect) => {
  const applications = await Application.find({ user: req.user._id }).populate(
    "job user"
  );
  res.status(200).json({
    success: true,
    applications,
  });
});
