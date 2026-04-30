import { User } from "../Model/User.Model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { verifyEmail } from "../VerifyEmail/verifyEmail.js";
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
  } catch (error) {}
};
