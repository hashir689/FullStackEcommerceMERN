import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    profilePic: { type: String, default: "" },
    profilePicPublicId: { type: String, default: "" },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    token: { type: String, default: null },
    isVerified: { type: Boolean, default: false },
    isLoggedIn: { type: Boolean, default: false },
    otp: { type: String, default: null },
    otpExpiry: { type: String, default: null },
    address: { type: String },
    city: { type: String },
    zipcode: { type: String },
    Phoneno: { type: String },
  },
  { timestamps: true },
);

export const User = mongoose.model("User", UserSchema);
