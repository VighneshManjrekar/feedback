const router = require("express").Router();

const {
  postJob,
  getJobs,
  getJob,
  applyJob,
  getApplications,
  viewApplication
} = require("../controllers/job.controller");

const { protect, authorization } = require("../middlewares/auth");

router.route("/").post(protect, authorization("employer"), postJob).get(getJobs);
router.get("/:id", getJob);
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

module.exports = router;
