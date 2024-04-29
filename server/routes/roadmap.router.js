const router = require("express").Router();

const { getRoadmap } = require("../controllers/roadmap.controller");

router.post("/", getRoadmap);

module.exports = router;
