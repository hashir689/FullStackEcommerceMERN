import mongoose, { Schema } from "mongoose";

const SessionSchema = await Schema(
  {
    userid: {
      type: Schema.Types.ObjectId,
      ref="User"
    },
  },
  { timestamps: true },
);

export const Session = mongoose.model("Session",SessionSchema)