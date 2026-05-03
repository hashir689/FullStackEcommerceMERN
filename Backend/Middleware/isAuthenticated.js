import jwt from "jsonwebtoken";
import { User } from "../Model/User.Model";
export const isAuthenticated = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader.startswith("Bearer ") || !authHeader) {
      return res.status(400).json({
        success: false,
        Message: "token is invalid",
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = User.findById(decoded.id);
    if (!user) {
      return res.status(400).json({
        success: false,
        Message: "User not found",
      });
    }
    req.id = user._id;
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      Message: error.message,
    });
  }
};
