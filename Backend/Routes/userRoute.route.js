import express from "express";
import {
  changePassword,
  ForgotPassword,
  getAllUsers,
  login,
  logout,
  register,
  reVerify,
  verify,
  VerifyOTP,
} from "../Controller/User.Controller.js";
import { isAdmin, isAuthenticated } from "../Middleware/isAuthenticated.js";

const router = express.Router();
router.post("/register", register);
router.post("/verify", verify);
router.post("/reVerify", reVerify);
router.post("/login", login);
router.post("/logout", isAuthenticated, logout);
router.post("/forgot-password", ForgotPassword);
router.post("/Verify-OTP/:email", VerifyOTP);
router.post("/change-password/:email", changePassword);
router.get("/all-users", isAuthenticated, isAdmin, getAllUsers);
export default router;
