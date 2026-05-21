const Course = require("../models/Course");

exports.getCourses = async (req, res) => {
  res.json(await Course.find());
};

exports.createCourse = async (req, res) => {
  res.json(await Course.create(req.body));
};


// ===============================
// BLOCK UNPAID USERS
// ===============================

if (!enrollment || enrollment.paymentStatus !== "paid") {
  return res.status(403).json({
    message: "Payment required to access course"
  });
}