import express from "express";
import {
  login,
  logout,
  register,
  reVerify,
  verify,
} from "../Controller/User.Controller.js";
import { isAuthenticated } from "../Middleware/isAuthenticated.js";

const router = express.Router();
router.post("/register", register);
router.post("/verify", verify);
router.post("/reVerify", reVerify);
router.post("/login", login);
router.post("/logout", isAuthenticated, logout);
export default router;
