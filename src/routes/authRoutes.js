import express from "express";
import { register, login } from "../controllers/authController.js";
import { validate } from "../middleware/validate.js";
import { registerValidation, loginValidation } from "../validation/authValidation.js";

const router = express.Router();

router.post("/register", validate(registerValidation), register);
router.post("/login", validate(loginValidation), login);

export default router;
