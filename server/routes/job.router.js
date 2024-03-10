const router = require("express").Router();

const {
  postJob,
  getJobs,
  getJob,
  applyJob,
  getApplications,
  viewApplication,
  updateJob,
  deleteJob,
  seenApplication,
  getMyApplications,
} = require("../controllers/job.controller");

const { protect, authorization } = require("../middlewares/auth");


// get logged in user application
router.get("/applications", protect, getMyApplications);

router
  .route("/")
  .post(protect, authorization("employer"), postJob)
  .get(getJobs);
router
  .route("/:id")
  .get(getJob)
  .put(protect, authorization("employer"), updateJob)
  .delete(protect, authorization("employer"), deleteJob);

router.post("/:id/apply", protect, applyJob);

// get all users applications
router.get(
  "/:id/applications",
  protect,
  authorization("employer"),
  getApplications
);

// get single applications
router.get(
  "/applications/:id",
  protect,
  viewApplication
);

router.get("/applications/:id/seen", seenApplication);

module.exports = router;
