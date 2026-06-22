import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function EnrollmentForm() {

  const navigate = useNavigate();
  const { id } = useParams();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [formData, setFormData] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    phone: "",
    city: "",
    education: "",
    reason: "",
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
      const user = JSON.parse(localStorage.getItem("user"));
  
      const res = await axios.post(
        "https://e-learning-platform-lernify-backend.onrender.com/api/enrollments/enroll",
        {
          studentId: user._id,
          courseId: id,
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          city: formData.city,
          education: formData.education,
          reason: formData.reason
          // instructorId: null,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
  
      console.log("ENROLLMENT CREATED:", res.data);
  
      if (!res.data || !res.data._id) {
        throw new Error("Enrollment ID missing");
      }
  
      navigate(`/payment/${res.data._id}`);
  
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white pt-28 px-6 flex justify-center items-center">

      <div className="w-full max-w-4xl bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-10 shadow-2xl">

        {/* HEADER */}
        <div className="text-center mb-10">

          <h1 className="text-5xl font-black text-yellow-400">
            Enrollment Form
          </h1>

          <p className="mt-4 text-gray-300 text-lg">
            Complete your details before enrolling in the course.
          </p>

        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-2 gap-6"
        >

          {/* FULL NAME */}
          <div>

            <label className="block mb-2 font-semibold text-gray-300">
              Full Name
            </label>

            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full bg-[#111827] border border-gray-700 px-4 py-4 rounded-xl outline-none focus:border-yellow-400"
              required
            />

          </div>

          {/* EMAIL */}
          <div>

            <label className="block mb-2 font-semibold text-gray-300">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full bg-[#111827] border border-gray-700 px-4 py-4 rounded-xl outline-none focus:border-yellow-400"
              required
            />

          </div>

          {/* PHONE */}
          <div>

            <label className="block mb-2 font-semibold text-gray-300">
              Phone Number
            </label>

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="w-full bg-[#111827] border border-gray-700 px-4 py-4 rounded-xl outline-none focus:border-yellow-400"
              required
            />

          </div>

          {/* CITY */}
          <div>

            <label className="block mb-2 font-semibold text-gray-300">
              City
            </label>

            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Enter your city"
              className="w-full bg-[#111827] border border-gray-700 px-4 py-4 rounded-xl outline-none focus:border-yellow-400"
              required
            />

          </div>

          {/* EDUCATION */}
          <div className="md:col-span-2">

            <label className="block mb-2 font-semibold text-gray-300">
              Education
            </label>

            <input
              type="text"
              name="education"
              value={formData.education}
              onChange={handleChange}
              placeholder="Example: B.Tech CSE"
              className="w-full bg-[#111827] border border-gray-700 px-4 py-4 rounded-xl outline-none focus:border-yellow-400"
              required
            />

          </div>

          {/* REASON */}
          <div className="md:col-span-2">

            <label className="block mb-2 font-semibold text-gray-300">
              Why do you want to join this course?
            </label>

            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              placeholder="Write your reason..."
              className="w-full h-36 bg-[#111827] border border-gray-700 px-4 py-4 rounded-xl outline-none focus:border-yellow-400"
              required
            ></textarea>

          </div>

          {/* BUTTON */}
          <div className="md:col-span-2 mt-4">

            <button
              type="submit"
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black py-4 rounded-2xl font-bold text-xl transition duration-300"
            >
              Continue To Payment
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}
