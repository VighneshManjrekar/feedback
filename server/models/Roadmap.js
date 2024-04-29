const mongoose = require("mongoose");

const roadmapSchema = new mongoose.Schema(
  {
    role: String,
    title: String,
    totalTime: String,
    steps: [{ step: String, time: String }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Roadmap", roadmapSchema);
