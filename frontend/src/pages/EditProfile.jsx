import { useState } from "react";
import axios from "axios";

export default function EditProfile() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [bio, setBio] = useState(
    user?.bio || ""
  );

  const [photo, setPhoto] = useState(
    user?.profilePhoto
      ? `http://localhost:5000/uploads/${user.profilePhoto}`
      : ""
  );

  // PHOTO UPLOAD
  const [selectedFile, setSelectedFile] = useState(null);
  
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setSelectedFile(file);
    
    // preview only (NOT saving)
    setPhoto(URL.createObjectURL(file));
  };

  // SAVE PROFILE
  const handleSave = async () => {
    const formData = new FormData();
  
    formData.append("bio", bio);
  
    if (selectedFile) {
      formData.append("profilePhoto", selectedFile);
    }
  
    const token = localStorage.getItem("token");
  
    try {
      const res = await axios.put(
        "http://localhost:5000/api/user/profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      localStorage.setItem("user", JSON.stringify(res.data));
  
      alert("Profile Updated Successfully");
  
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    }
  };

  const handleDeletePhoto = async () => {

  const token = localStorage.getItem("token");

  try {

    const res = await axios.delete(
      "http://localhost:5000/api/user/profile-photo",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    localStorage.setItem(
      "user",
      JSON.stringify(res.data)
    );

    setPhoto("");

    alert("Profile Photo Removed");

  } catch (error) {

    console.log(error);
  }
};
  
  return (
    <div className="min-h-screen bg-black text-white pt-28 px-6">

      <div className="max-w-3xl mx-auto bg-[#111] rounded-2xl p-10 border border-gray-800">

        <h1 className="text-3xl font-bold text-yellow-400 mb-10">
          Edit Profile
        </h1>

        {/* PHOTO */}
        <div className="flex flex-col items-center">

        {photo ? (
        <img
        src={photo}
        alt="profile"
        className="w-36 h-36 rounded-full object-cover border-4 border-yellow-400"
        />
        ) : (
        <div className="w-36 h-36 rounded-full bg-yellow-400 text-black flex items-center justify-center text-5xl font-bold border-4 border-yellow-400">
          {user?.name?.charAt(0).toUpperCase()}
          </div>
          )}

          <label className="mt-5 bg-yellow-400 hover:bg-yellow-500 text-black px-5 py-2 rounded-lg cursor-pointer font-semibold">
            Change Photo

            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
            />

          </label>

          <button
            onClick={handleDeletePhoto}
            className="mt-3 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg font-semibold">
              Delete Photo
            </button>

        </div>

        {/* NAME */}
        <div className="mt-10">

          <label className="text-gray-400">
            Name
          </label>

          <input
            type="text"
            value={user?.name}
            disabled
            className="w-full mt-2 bg-[#1F2937] border border-gray-700 rounded-lg p-4"
          />

        </div>

        {/* EMAIL */}
        <div className="mt-6">

          <label className="text-gray-400">
            Email
          </label>

          <input
            type="text"
            value={user?.email}
            disabled
            className="w-full mt-2 bg-[#1F2937] border border-gray-700 rounded-lg p-4"
          />

        </div>

        {/* BIO */}
        <div className="mt-6">

          <label className="text-gray-400">
            Bio
          </label>

          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows="5"
            placeholder="Write something about yourself..."
            className="w-full mt-2 bg-[#1F2937] border border-gray-700 rounded-lg p-4 outline-none resize-none"
          />

        </div>

        {/* SAVE BUTTON */}
        <button
          onClick={handleSave}
          className="mt-8 bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-3 rounded-lg font-semibold"
        >
          Save Changes
        </button>

      </div>

    </div>
  );
}