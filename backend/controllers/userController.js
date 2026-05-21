import User from "../models/User.js";

export const uploadProfilePhoto = async (req, res) => {

  try {

    const user = await User.findById(req.user.id);

    user.profilePhoto = req.file.filename;

    await user.save();

    res.status(200).json({
      success: true,
      profilePhoto: user.profilePhoto,
    });

  } catch (error) {

    res.status(500).json({
      message: "Upload failed",
    });

  }
};