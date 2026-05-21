import express from "express";
import EnrollmentForm from "../models/EnrollmentForm.js";

const router = express.Router();


// CREATE FORM
router.post("/submit", async (req, res) => {

  try {

    const form = await EnrollmentForm.create(
      req.body
    );

    res.status(201).json(form);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }
});

export default router;