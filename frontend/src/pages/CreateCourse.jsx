import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CreateCourse() {
  const [thumbnail, setThumbnail] = useState(null);
  const [instructorPhone, setInstructorPhone] =
  useState("");

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    learnings: [""],
    content: [""],
    level: ""
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();
  
    try {
  
      const user = JSON.parse(
        localStorage.getItem("user")
      );
  
      const courseData = new FormData();
  
      courseData.append(
        "title",
        formData.title
      );
  
      courseData.append(
        "description",
        formData.description
      );
  
      courseData.append(
        "price",
        formData.price
      );
  
      courseData.append(
        "category",
        formData.category
      );
  
      courseData.append(
        "level",
        formData.level
      );
  
      courseData.append(
        "createdBy",
        user._id
      );
  
      courseData.append(
        "instructorName",
        user.name
      );
  
      // arrays
      courseData.append(
        "learnings",
        JSON.stringify(
          formData.learnings.split(",")
        )
      );
  
      courseData.append(
        "content",
        JSON.stringify(
          formData.content.split(",")
        )
      );

      courseData.append(
        "instructorPhone",
        instructorPhone
      );
  
      // thumbnail image
      if (thumbnail) {
        courseData.append(
          "thumbnail",
          thumbnail
        );
      }
  
      await axios.post(
        "https://e-learning-platform-lernify-backend.onrender.com/api/courses/create",
        courseData
      );
  
      alert("Course Created Successfully");
  
      navigate("/instructor-dashboard");
  
    } catch (error) {
  
      console.log(error);
  
      alert("Error Creating Course");
  
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1120] text-white pt-24 px-6 flex justify-center">

      <div className="w-full max-w-3xl bg-[#1F2937] p-8 rounded-2xl shadow-lg">

        <h1 className="text-3xl font-bold text-yellow-400 mb-6">
          Create New Course
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5"
        >

          {/* TITLE */}
          <input
            type="text"
            name="title"
            placeholder="Course Title"
            value={formData.title}
            onChange={handleChange}
            className="bg-[#111827] border border-gray-600 px-4 py-3 rounded-lg outline-none focus:border-yellow-400"
            required
          />

          {/* DESCRIPTION */}
          <textarea
            name="description"
            placeholder="Course Description"
            value={formData.description}
            onChange={handleChange}
            className="bg-[#111827] border border-gray-600 px-4 py-3 rounded-lg outline-none focus:border-yellow-400 h-32"
            required
          />

          {/* PRICE */}
          <input
            type="text"
            name="price"
            placeholder="Course Price"
            value={formData.price}
            onChange={handleChange}
            className="bg-[#111827] border border-gray-600 px-4 py-3 rounded-lg outline-none focus:border-yellow-400"
            required
          />

<input
  type="text"
  placeholder="Instructor Phone"
  value={instructorPhone}
  onChange={(e) =>
    setInstructorPhone(e.target.value)
  }
  className="w-full p-3 rounded-lg bg-[#111827] border border-gray-700"
/>

          {/* CATEGORY */}
          <input
            type="text"
            name="category"
            placeholder="Course Category"
            value={formData.category}
            onChange={handleChange}
            className="bg-[#111827] border border-gray-600 px-4 py-3 rounded-lg outline-none focus:border-yellow-400"
            required
          />

          {/* THUMBNAIL */}
          <input 
            type="file"
            accept="image/*"
            onChange={(e) =>
              setThumbnail(e.target.files[0])
            }
            className="text-white"
          />

          {/* LEVEL */}
          <select
          name="level"
          value={formData.level}
          onChange={handleChange}
          className="bg-[#111827] border border-gray-600 px-4 py-3 rounded-lg outline-none focus:border-yellow-400"
          required
          >
            <option value="">Select Level</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
            </select>

          {/* LEARNINGS */}
          <textarea
            name="learnings"
            placeholder="What students will learn (comma separated)"
            value={formData.learnings}
            onChange={handleChange}
            className="bg-[#111827] border border-gray-600 px-4 py-3 rounded-lg outline-none focus:border-yellow-400 h-28"
            required
          />

          {/* CONTENT */}
          <textarea
            name="content"
            placeholder="Course content/modules (comma separated)"
            value={formData.content}
            onChange={handleChange}
            className="bg-[#111827] border border-gray-600 px-4 py-3 rounded-lg outline-none focus:border-yellow-400 h-28"
            required
          />

          {/* BUTTON */}
          <button
            type="submit"
            className="bg-yellow-400 text-black py-3 rounded-lg font-semibold hover:bg-yellow-500 transition"
          >
            Create Course
          </button>

        </form>

      </div>

    </div>
  );
}