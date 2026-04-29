import { User } from "../Model/User.Model.js";

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

    const newUser = await User.create({
      firstname,
      lastname,
      email,
      password,
    });
    await newUser.save();
    return res
      .status(201)
      .json({
        success: true,
        Message: "User has been created!",
        user: newUser,
      });
  } catch (error) {
    res.status(500).json({ success: false, Message: error.message });
  }
};
