import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import enrollmentRoutes from "./routes/enrollmentRoutes.js";
import userRoutes from "./routes/userRoutes.js";
// import enrollmentFormRoutes from "./routes/enrollmentFormRoutes.js";

// ADD THESE IMPORTS
import User from "./models/User.js";
import authMiddleware from "./middleware/authMiddleware.js";
import upload from "./middleware/upload.js";

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/users", userRoutes);
// app.use("/api/enrollment-form", enrollmentFormRoutes);

// serve uploaded files
app.use("/uploads", express.static("uploads"));

// ===============================
// ✅ PROFILE UPDATE ROUTE (ADD THIS)
// ===============================
app.put(
  "/api/user/profile",
  authMiddleware,
  upload.single("profilePhoto"),
  async (req, res) => {
    try {
      const userId = req.user.id;

      const updateData = {
        bio: req.body.bio,
      };

      if (req.file) {
        updateData.profilePhoto = req.file.filename;
      }

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        updateData,
        { new: true }
      );

      res.json(updatedUser);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server Error" });
    }
  }
);

app.delete(
  "/api/user/profile-photo",
  authMiddleware,
  async (req, res) => {
    try {
      const userId = req.user.id;

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          profilePhoto: "",
        },
        { new: true }
      );

      res.json(updatedUser);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: "Server Error",
      });
    }
  }
);
// REMOVE duplicate express.json() (you had it twice)
// app.use(express.json()); ❌ (already declared above)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});