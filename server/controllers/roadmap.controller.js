const Roadmap = require("../models/Roadmap");
const ErrorResponse = require("../utils/ErrorResponse");
const asyncHandler = require("../utils/asyncHandler");
const { generateRoadmap } = require("../utils/openai");

exports.getRoadmap = asyncHandler(async (req, res, next) => {
  const title = req.body.title?.toLowerCase();
  if (!title) return next(new ErrorResponse("Title not provided", 400));

  const existingRoadmap = await Roadmap.find({ role: title });
  if (existingRoadmap?.length > 0) {
    return res.status(200).json({
      success: true,
      stage: existingRoadmap,
    });
  }
  const response = await generateRoadmap(title);
  const generatedRoadmap = response?.roadmap.stages;
  if (!generatedRoadmap) {
    return next(
      new ErrorResponse(`Cannot generate roadmap for ${title} role`, 400)
    );
  }
  await Roadmap.create({ ...generatedRoadmap, role: title });
  res.status(200).json({
    success: true,
    stages: generatedRoadmap,
  });
});
