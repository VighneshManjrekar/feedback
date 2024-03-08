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
} = require("../controllers/job.controller");

const { protect, authorization } = require("../middlewares/auth");

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

router.get(
  "/:id/applications",
  protect,
  authorization("employer"),
  getApplications
);
router.get(
  "/applications/:id",
  protect,
  authorization("employer"),
  viewApplication
);

router.get("/applications/:id/seen", seenApplication);

module.exports = router;
