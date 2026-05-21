
export const createEnrollment = async (req, res) => {
    try {
      const enrollment = await Enrollment.create({
        studentId: req.body.studentId,
        courseId: req.body.courseId,
        fullName: req.body.fullName,
        email: req.body.email,
        phone: req.body.phone,
        paymentStatus: "pending",   // IMPORTANT
        status: "initiated"
      });
  
      res.json(enrollment);
  
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

// ======================================
// PAYMENT UPDATE (MARK AS PAID)
// ======================================

export const markPaid = async (req, res) => {
    try {
      const updated = await Enrollment.findByIdAndUpdate(
        req.params.id,
        {
          paymentStatus: "paid",
          status: "active"
        },
        { new: true }
      );
  
      res.json(updated);
  
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };