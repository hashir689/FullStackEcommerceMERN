import express from "express";
import {
  login,
  register,
  reVerify,
  verify,
} from "../Controller/User.Controller.js";

const router = express.Router();
router.post("/register", register);
router.post("/verify", verify);
router.post("/reVerify", reVerify);
router.post("/login", login);
export default router;
