import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import {
  registerValidation,
  loginValidation,
} from "../validation/authValidation.js";
import { ErrorResponse } from "../utils/errorResponse.js";

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

export const register = async (req, res) => {
  try {
    const { error } = registerValidation.validate(req.body); // validate request body
    if (error)
      return res.status(400).json({ message: error.details[0].message }); // return validation error

    const { username, email, password, role } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "Email already in use" }); // check if user already exits

    const user = await User.create({
      username,
      email,
      password,
      role,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      }, // return user details except password
      token: generateToken(user._id, user.role), // generate JWT token
    });
  } catch (err) {
    next(new ErrorResponse(err.message, 500));
  }
};

export const login = async (req, res) => {
  try {
    const { error } = loginValidation.validate(req.body); // validate request body
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { email, password } = req.body; // request from the body
    const user = await User.findOne({ email: email.toLowerCase() }); // find user by email

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    } // if user is not valide return this

    const isMatch = await user.comparePassword(password); // compare passwords

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    } // password does not match

    // If everything is correct
    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      token: generateToken(user._id, user.role),
    });
  } catch (err) {
    next(new ErrorResponse(err.message, 500));
  }
};
