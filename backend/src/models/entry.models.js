import mongoose from "mongoose";

const entrySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: Date,
      required: true,
      unique: true,
    },
    mood: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    journalText: {
      type: String,
      default: "",
      trim: true,
    },
    activities: {
      type: [String],
      enum: [
        "exercise",
        "work",
        "study",
        "read",
        "meditation",
        "socialize",
        "music",
        "nature",
        "screenTime",
        "rest",
      ],
      default: [],
    },
    sleepHours: {
      type: Number,
      min: 0,
      max: 24,
      default: 0,
    },
    waterIntake: {
      type: Number, // in liters or glasses
      min: 0,
      max: 10,
      default: 0,
    },
  },
  {
    timestamps: true, 
  }
);

export const Entry =  mongoose.model("Entry", entrySchema);
