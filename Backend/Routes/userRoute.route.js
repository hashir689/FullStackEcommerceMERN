import express from "express";
import { register } from "../Controller/User.Controller.js";
const router = express.Router();
router.post("/register", register);
export default router;
