import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/User.js";

const router = express.Router();


// ================= SIGNUP =================

router.post("/signup", async (req, res) => {
  try {

    const { name, email, password, role } = req.body;

    // CHECK EXISTING USER
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    // CREATE USER
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    res.status(201).json({
      message: "Signup Successful",
    });

  } catch (error) {

    res.status(500).json({
      message: "Server Error",
    });

  }
});


// ================= LOGIN =================

router.post("/login", async (req, res) => {
  try {

    const { email, password, role } = req.body;

    // FIND USER
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid Credentials",
      });
    }

    // CHECK PASSWORD
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Credentials",
      });
    }

    // ✅ CHECK ROLE
    if (user.role !== role) {
      return res.status(400).json({
        message: `This account is registered as ${user.role}`,
      });
    }

    // CREATE TOKEN
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      "secretkey",
      {
        expiresIn: "7d",
      }
    );

    // RESPONSE
    res.json({
      token,

      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profilePhoto: user.profilePhoto,
        bio: user.bio,
      },
    });

  } catch (error) {

    res.status(500).json({
      message: "Server Error",
    });

  }
});

export default router;