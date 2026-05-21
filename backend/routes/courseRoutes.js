import express from "express";
import Course from "../models/Course.js";
import Enrollment from "../models/Enrollment.js";
import upload from "../middleware/upload.js";

const router = express.Router();


// ================= CREATE COURSE =================

router.post(
  "/create",
  upload.single("thumbnail"),
  async (req, res) => {

    try {

      const {
        title,
        description,
        price,
        category,
        createdBy,
        instructorName,
        instructorPhone,
        level,
      } = req.body;

      // convert arrays back
      const learnings = JSON.parse(
        req.body.learnings
      );

      const content = JSON.parse(
        req.body.content
      );

      // uploaded thumbnail
      let thumbnail = "";

      if (req.file) {
        thumbnail = req.file.filename;
      }

      const newCourse = new Course({
        title,
        description,
        price,
        category,
        thumbnail: req.file ? req.file.filename : "",
        createdBy,
        instructorName,
        instructorPhone,
        learnings,
        content,
        level,
        students: 0,
      });

      await newCourse.save();

      res.status(201).json({
        message: "Course Created Successfully",
        course: newCourse,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: error.message,
      });

    }
  }
);


// ================= GET ALL COURSES =================

router.get("/", async (req, res) => {

  try {

    const courses = await Course.find()
      .populate("createdBy", "name");

    res.json(courses);

  } catch (error) {

    res.status(500).json({
      message: "Server Error",
    });

  }
});


// ================= GET ONLY INSTRUCTOR COURSES =================

router.get("/instructor/:id", async (req, res) => {

  try {

    const courses = await Course.find({
      createdBy: req.params.id,
    }).populate("createdBy", "name");

    res.json(courses);

  } catch (error) {

    res.status(500).json({
      message: "Server Error",
    });

  }
});


// ================= DELETE COURSE =================

router.delete("/delete/:id", async (req, res) => {

  try {

    await Course.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Course Deleted Successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: "Server Error",
    });

  }
});

// ================= SEARCH =================
router.get("/search", async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const courses = await Course.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { instructorName: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } }
      ]
    });

    res.json(courses);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});


// ================= ADD LECTURE (FIXED) ================
router.put("/add-lecture/:id",
upload.fields([
  { name: "video", maxCount: 1 },
  { name: "pdf", maxCount: 1 },
]),
  async (req, res) => {
  try {
    console.log("ID:", req.params.id);
    console.log("BODY:", req.body);

    const {
      title,
      videoType,
      videoUrl,
      pdfType,
      pdf,
      assignment,
    } = req.body;
    
    let finalVideoUrl = videoUrl;
    let finalPdf = pdf;
    
    // VIDEO
    if (
      req.files &&
      req.files.video
    ) {
      finalVideoUrl =
        req.files.video[0].filename;
    }
    
    // PDF
    if (
      req.files &&
      req.files.pdfFile
    ) {
      finalPdf =
        req.files.pdf[0].filename;
    }

    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    course.lectures.push({
      title,
      videoType,
      videoUrl: finalVideoUrl,
      pdfType,
      pdf: finalPdf,
      assignment,
    });

    await course.save();

    return res.json({
      message: "Lecture Added Successfully",
      course,
    });

  } catch (error) {
    console.log("ADD LECTURE ERROR:", error.message);
    return res.status(500).json({ message: error.message });
  }
});

router.get("/learn/:id", async (req, res) => {

  try {

    const { studentId } = req.query;

    // FIND ENROLLMENT
    const enrollment = await Enrollment.findOne({
      studentId,
      courseId: req.params.id,
    });

    // NOT ENROLLED
    if (!enrollment) {

      return res.status(403).json({
        message: "Please enroll first",
      });
    }

    // PAYMENT NOT DONE
    if (enrollment.status !== "active") {

      return res.status(403).json({
        message: "Please complete payment first",
      });
    }

    // FETCH COURSE
    const course = await Course.findById(
      req.params.id
    );

    if (!course) {

      return res.status(404).json({
        message: "Course not found",
      });
    }

    res.json({
      ...course._doc,
      completedLectures:
        enrollment.completedLectures,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
});

router.get("/instructor-stats/:id", async (req, res) => {
  try {

    const instructorId = req.params.id;

    const courses = await Course.find({
      instructor: instructorId,
    });

    const totalCourses = courses.length;

    const enrollments = await Enrollment.find({
      courseId: {
        $in: courses.map((c) => c._id),
      },
    });

    const totalStudents = enrollments.length;

    res.json({
      totalCourses,
      totalStudents,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// ================= GET SINGLE COURSE =================

router.get("/:id", async (req, res) => {

  try {

    const course = await Course.findById(
      req.params.id
    );

    res.json(course);

  } catch (error) {

    res.status(500).json({
      message: "Server Error",
    });

  }
});


export default router;