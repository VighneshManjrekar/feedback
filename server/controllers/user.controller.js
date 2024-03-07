const pdf = require("html-pdf");
const fs = require("fs");
const asyncHandler = require("../utils/asyncHandler");
const ErrorResponse = require("../utils/ErrorResponse");
const { pdfTemplate, options } = require("../utils/resume");
const User = require("../models/User");

// helper function
const sendToken = (user, statusCode, res) => {
  const token = user.getSignToken();
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: true,
  };
  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: true, token });
};

exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  const userObj = new User({
    name,
    email,
    password,
  });
  const user = await userObj.save();
  sendToken(user, 200, res);
});

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse("Please enter email and password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.matchPassword(password))) {
    return next(new ErrorResponse("Invalid Credentials", 401));
  }
  sendToken(user, 200, res);
});

exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ success: true, data: {} });
});

exports.createResume = asyncHandler(async (req, res, next) => {
  const path = `resume/${req.body.userId}.pdf`;
  pdf
    .create(pdfTemplate(req.body), options)
    .toFile(`public/${path}`, async (err) => {
      if (err) {
        console.log(err);
        return next(new ErrorResponse("Unable to generate resume", 401));
      } else {
        try {
          const user = await User.findById(req.body.userId);
          if (!user) {
            return next(new ErrorResponse("User not found", 404));
          }
          user.resume = path;
          await user.save();
          res.status(200).json({ message: path });
        } catch (error) {
          next(error);
        }
      }
    });
});

exports.uploadResume = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  user.resume = `resume/${req.params.id}.pdf`;
  await user.save();
  res
    .status(201)
    .json({ success: true, json: `resume/${req.params.id}.pdf` });
});
