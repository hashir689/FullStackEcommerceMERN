import mongoose, { Schema } from "mongoose";

const SessionSchema = new Schema(
  {
    userid: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

export const Session = mongoose.model("Session", SessionSchema);
