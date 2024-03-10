const jwt = require("jsonwebtoken");
const asyncHandler = require("../utils/asyncHandler");
const ErrorResponse = require("../utils/ErrorResponse");
const User = require("../models/User");

exports.protect = asyncHandler(async (req, res, next) => {
  const authToken = req.headers.authorization;
  if (authToken && authToken.startsWith("Bearer")) {
    const token = authToken.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return next(new ErrorResponse("Forbidden", 403));
    }
    req.user = await User.findById(decoded.id);
  } else {
    return next(new ErrorResponse("Forbidden", 403));
  }
  next();
});

exports.authorization = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          `Access to this route is forbidden for '${req.user.role}' role`,
          403
        )
      );
    }
    next();
  };
};
