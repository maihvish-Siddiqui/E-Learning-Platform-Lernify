import express from "express";
import Enrollment from "../models/Enrollment.js";
import Course from "../models/Course.js";
import User from "../models/User.js";

const router = express.Router();


// ================= ENROLL =================

router.post("/enroll", async (req, res) => {
  try {
    const { studentId, courseId, instructorId } = req.body;

    const user = await User.findById(studentId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role === "instructor") {
      return res.status(403).json({
        message: "Instructors cannot enroll in courses",
      });
    }

    const existingEnrollment = await Enrollment.findOne({
      studentId,
      courseId,
    });

    if (existingEnrollment) {
      return res.status(400).json({
        message: "Already enrolled",
      });
    }

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    // const safeInstructorId = instructorId || null;

    // const enrollment = await Enrollment.create({
    //   studentId,
    //   courseId,
    //   // instructorId: instructorId ? instructorId : null,
    //   instructorId: course.instructorId || null,
    //   completedLectures: [],
    //   status: "pending",
    // });

    const enrollment = await Enrollment.create({
      studentId,
      courseId,
    
      instructorId: course.createdBy,
    
      fullName: req.body.fullName,
      email: req.body.email,
      phone: req.body.phone,
      city: req.body.city,
      education: req.body.education,
      reason: req.body.reason,
    
      completedLectures: [],
    
      paymentStatus: "pending",
      status: "pending",
    });

    course.students = (course.students || 0) + 1;
    await course.save();

    return res.status(201).json(enrollment);

  } catch (error) {
    console.log("ENROLL ERROR:", error);
    return res.status(500).json({
      message: error.message,
    });
  }
});


// ================= GET STUDENT COURSES =================

router.get("/student/:studentId",
  async (req, res) => {

    try {

      const enrollments =
        await Enrollment.find({
          studentId: req.params.studentId,
        }).populate("courseId");

      res.json(enrollments);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: "Server Error",
      });

    }
  }
);


router.post("/complete-lecture", async (req, res) => {
  try {

    const {
      studentId,
      courseId,
      lectureIndex,
    } = req.body;

    const enrollment = await Enrollment.findOne({
      studentId,
      courseId,
    });

    if (!enrollment) {
      return res.status(404).json({
        message: "Not enrolled",
      });
    }

    // FIX FOR OLD DATA
    if (!enrollment.completedLectures) {
      enrollment.completedLectures = [];
    }

    // ADD ONLY IF NOT EXISTS
    if (
      !enrollment.completedLectures.includes(
        lectureIndex
      )
    ) {
      enrollment.completedLectures.push(
        lectureIndex
      );
    }

    await enrollment.save();

    res.json(enrollment);

  } catch (error) {

    console.log(
      "COMPLETE LECTURE ERROR:",
      error
    );

    res.status(500).json({
      message: error.message,
    });
  }
});

router.get("/student-stats/:id", async (req, res) => {
  try {

    const studentId = req.params.id;

    const enrollments = await Enrollment.find({
      studentId,
    });

    const totalCourses = enrollments.length;

    const certificates = enrollments.filter(
      (e) => e.completedLectures.length >= 3
    ).length;

    res.json({
      totalCourses,
      certificates,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.get("/instructor", async (req, res) => {
  try {
    const { instructorId, courseId } = req.query;

    let filter = { instructorId };

    if (courseId) {
      filter.courseId = courseId;
    }

    const enrollments = await Enrollment.find(filter)
      .populate("studentId", "name email")
      .populate("courseId", "title");

    res.json(enrollments);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// ================= CHECK ENROLLMENT =================

router.get("/check/:courseId", async (req, res) => {

  try {

    const { studentId } = req.query;

    const enrollment = await Enrollment.findOne({
      studentId,
      courseId: req.params.courseId,
    });

    if (!enrollment) {

      return res.status(404).json({
        message: "Enrollment not found",
      });
    }

    res.json(enrollment);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
});

// ===============================
// PAYMENT ROUTE (ADD THIS)
// ===============================

router.patch("/pay/:id", async (req, res) => {
  try {
    const enrollment = await Enrollment.findByIdAndUpdate(
      req.params.id,
      {
        paymentStatus: "paid",
        status: "active",
      },
      { new: true }
    );

    if (!enrollment) {
      return res.status(404).json({ message: "Enrollment not found" });
    }

    res.json(enrollment);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

// ================= PAYMENT PAGE DATA =================

router.get("/payment/:id", async (req, res) => {

  try {

    const enrollment = await Enrollment.findById(
      req.params.id
    ).populate("courseId");

    if (!enrollment) {

      return res.status(404).json({
        message: "Enrollment not found",
      });
    }

    res.json(enrollment);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
});

router.get("/instructor/:id", async (req, res) => {

  try {

    const instructorId = req.params.id;

    const enrollments = await Enrollment.find({
      instructorId,
    })
    .populate("courseId")
    .populate("studentId");

    res.json(enrollments);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }
});

router.get("/:id", async (req, res) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id);

    if (!enrollment) {
      return res.status(404).json({
        message: "Enrollment not found",
      });
    }

    res.json(enrollment);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

export default router;