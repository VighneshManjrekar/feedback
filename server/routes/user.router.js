const router = require("express").Router();

const {
  register,
  login,
  logout,
  createResume,
} = require("../controllers/user.controller");

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);

router.post("/resume", createResume);

module.exports = router;
