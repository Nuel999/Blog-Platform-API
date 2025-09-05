import jwt from "jsonwebtoken";
import User from "../models/User.js";
import {ErrorResponse} from "../utils/errorResponse.js";

export const authenticate = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1]; // Get token from "Bearer <token>"
  }

  if (!token) {
    return next(new ErrorResponse("Not authorized, no token", 401));
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user to request (exclude password)
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return next(new ErrorResponse("User not found", 401));
    }

    next();
  } catch (err) {
    return next(new ErrorResponse("Not authorized, token failed", 401));
  }
};

// check admin role
export const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return next(new ErrorResponse("Admin access only", 403));
  }
}; //only allow admin users
