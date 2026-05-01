import { User } from "../Model/User.Model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { verifyEmail } from "../VerifyEmail/verifyEmail.js";
import { json } from "express";

export const register = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    if (!firstname || !lastname || !email || !password) {
      return res.status(400).json({
        success: false,
        Message: "All fields required",
      });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, Message: "User already exist!" });
    }
    const hashpassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      firstname,
      lastname,
      email,
      password: hashpassword,
    });
    const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY, {
      expiresIn: "10m",
    });
    verifyEmail(token, email);
    newUser.token = token;
    await newUser.save();

    return res.status(201).json({
      success: true,
      Message: "User has been created!",
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({ success: false, Message: error.message });
  }
};

export const verify = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(400).json({
        success: false,
        message: "Authorization failed",
      });
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(400).json({ success: false, message: "User no Found" });
    }
    user.token = null;
    user.isVerified = true;
    await user.save();
    return res
      .status(200)
      .json({ success: true, message: "Email Verified Successfuly" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const reVerify = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email is required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    const decoded = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "10m",
    });
    verifyEmail(decoded, email);
    user.token = decoded;
    await user.save();
    return res
      .status(200)
      .json({ success: true, message: "Verification Email sent again" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not Found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Password is wrong" });
    }

    if (user.isVerified === false) {
      return res.status(400).json({
        success: false,
        message: "Verify your accound then login",
      });
    }

    const accessToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "10d",
    });
    const refreshToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "30d",
    });

    user.isLoggedIn = true;
    await user.save();

    return res
      .status(200)
      .json({ success: true, message: "Login Successfuly" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
