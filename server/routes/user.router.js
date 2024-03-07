const router = require("express").Router();
const multer = require("multer");

const {
  register,
  login,
  logout,
  createResume,
  uploadResume,
} = require("../controllers/user.controller");

const { protect } = require("../middlewares/auth");

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.post("/resume", protect, createResume);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/resume/");
  },
  filename: function (req, file, cb) {
    const userId = req.params.id;
    cb(null, `${userId}.pdf`);
  },
});
const upload = multer({ storage: storage });
router.post(
  "/:id/upload-resume",
  protect,
  upload.single("resume"),
  uploadResume
);

module.exports = router;
