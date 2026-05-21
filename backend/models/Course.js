import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema({

  title: {
    type: String,
  },

  videoType: {
    type: String,
    enum: ["youtube", "upload"],
    default: "youtube",
  },

  videoUrl: {
    type: String,
  },

  pdf: {
    type: String,
  },

  assignment: {
    type: String,
  },

});

const courseSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  price: {
    type: String,
    required: true,
  },

  category: {
    type: String,
  },

  thumbnail: {
    type: String,
  },

  instructorPhone: {
    type: String,
    default: ""
  },
  
  level: {
    type: String,
    default: "Beginner",
  },

  learnings: [String],

  content: {
    type: [String],
    default: [],
  },

  lectures: [
    {
      title: String,
      videoType: String,
      videoUrl: String,
      pdf: String,
      assignment: String,
    },
  ],
  
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  instructorName: {
    type: String,
  },

  students: {
    type: Number,
    default: 0,
  },

}, {
  timestamps: true,
});

export default mongoose.model(
  "Course",
  courseSchema
);