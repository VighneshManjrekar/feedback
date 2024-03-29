const pdf = require("html-pdf");
const crypto = require("crypto");
const asyncHandler = require("../utils/asyncHandler");
const ErrorResponse = require("../utils/ErrorResponse");
const { pdfTemplate, options } = require("../utils/resume");
const User = require("../models/User");
const { sendForgotPassword } = require("../utils/mail");

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
    .json({ success: true, token, userId: user._id, role: user.role });
};

exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;
  if (role == "admin") role = "seeker";
  const userObj = new User({
    name,
    email,
    password,
    role,
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
  req.body.userId = req.body.userId ? req.body.userId : req.user._id;
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
  res.status(201).json({ success: true, json: `resume/${req.params.id}.pdf` });
});

exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  return res.status(200).json({ success: true, user });
});

exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  let user = await User.findOne({ email });
  if (!user) {
    return next(new ErrorResponse(`No user with email ${email}`));
  }
  const resetToken = user.createHashPassword();
  const resetUrl = `http://localhost:7000/api/v1/user/reset-password/${resetToken}`;

  try {
    await sendForgotPassword(user, resetUrl);
    user = await user.save({ validateBeforeSave: true });
  } catch (err) {
    console.log(err);
    user.resetPasswordToken = undefined;
    user.resetPasswordDate = undefined;
    await user.save();
    return next(new ErrorResponse("Email not sent", 500));
  }
  res.status(200).json({ success: true, data: "Email sent" });
});

exports.resetPassowrd = asyncHandler(async (req, res, next) => {
  const { password } = req.body;
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");
  let user = await User.findOne({
    resetPasswordToken,
    resetPasswordDate: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ErrorResponse("Invalid token", 401));
  }

  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordDate = undefined;

  user = await user.save();
  res
    .status(200)
    .json({ success: true, message: "Password changed successfully" });
  // sendToken(user, 200, res);
});
