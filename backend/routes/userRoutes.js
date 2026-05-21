import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";
import Course from "../models/Course.js";
import Enrollment from "../models/Enrollment.js";

import {
  uploadProfilePhoto,
} from "../controllers/userController.js";

const router = express.Router();


// PROFILE PHOTO UPLOAD
router.put(
  "/upload-photo",
  authMiddleware,
  upload.single("profilePhoto"),
  uploadProfilePhoto
);


// PROFILE DATA
router.get("/profile-data/:id", async (req, res) => {

  try {

    const userId = req.params.id;

    // instructor courses
    const instructorCourses = await Course.find({
      createdBy: userId,
    });

    // enrolled courses
    const enrollments = await Enrollment.find({
      studentId: userId,
    }).populate("courseId");

    // total students
    const totalStudents = instructorCourses.reduce(
      (total, course) => total + (course.students || 0),
      0
    );

    // formatted enrolled courses
    const enrolledCourses = enrollments
  .filter((enrollment) => enrollment.courseId)
  .map((enrollment) => {

    const course = enrollment.courseId;

    const totalLectures =
      course?.content?.length || 1;

    const completedLectures =
      enrollment.completedLectures?.length || 0;

    const progress = Math.floor(
      (completedLectures / totalLectures) * 100
    );

    return {
      _id: course._id,
      title: course.title,
      progress,
      completed: progress === 100,
    };
});

    res.json({
      instructorCourses,
      totalStudents,
      enrolledCourses,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
});

export default router;