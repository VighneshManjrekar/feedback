const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String },
    description: { type: String },
    responsibilities: { type: String },
    salary: { type: String },
    postedAt: { type: Date, default: Date.now },
    deadline: { type: Date },
    link: { type: String },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Job", jobSchema);
