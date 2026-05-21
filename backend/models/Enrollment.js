import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    instructorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
      required: false,
    },

    completedLectures: {
      type: [Number],
      default: [],
    },

    fullName: String,
    email: String,
    phone: String,
    city: String,
    education: String,
    reason: String,
    
    status: {
      type: String,
      enum: ["pending", "active", "approved", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }

);

export default mongoose.model(
  "Enrollment",
  enrollmentSchema
);