const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  job: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
  status: {
    type: String,
    enum: ["seen", "unseen"],
    default: "unseen",
  },
  result: {
    type: String,
    enum: ["accepted", "rejected", "pending"],
    default: "pending",
  },
});

module.exports = mongoose.model("Application", ApplicationSchema);
