import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import signupImg from "../assets/signup.png";

export default function Signup() {
  const navigate = useNavigate();

  const [role, setRole] = useState("student");

  // FORM STATE
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // HANDLE SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    // PASSWORD MATCH CHECK
    if (formData.password !== formData.confirmPassword) {
      return alert("Passwords do not match");
    }

    try {
      const res = await axios.post(
        "https://e-learning-platform-lernify-backend.onrender.com/api/auth/signup",
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role,
        }
      );

      console.log(res.data);

      alert("Signup successful");

      // Redirect to login
      navigate("/login");

    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#0B1120] flex items-center justify-center px-4">

      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg flex overflow-hidden">

        {/* LEFT IMAGE */}
        <div className="hidden md:flex w-1/2 bg-[#1F2937] items-center justify-center p-6">
          <img
            src={signupImg}
            alt="signup"
            className="className=w-[420px]"
          />
        </div>

        {/* RIGHT FORM */}
        <div className="w-full md:w-1/2 bg-[#1F2937] p-8">

          <h2 className="text-2xl font-bold text-white">
            Create Account
          </h2>

          <p className="text-sm text-yellow-500 mt-1">
            Join as a Student or Instructor
          </p>

          {/* ROLE TOGGLE */}
          <div className="flex bg-gray-100 rounded-full p-1 mt-4 w-fit">

            <button
              type="button"
              onClick={() => setRole("student")}
              className={`px-4 py-1 rounded-full text-sm font-medium ${
                role === "student"
                  ? "bg-yellow-400 text-black"
                  : "text-gray-600"
              }`}
            >
              Student
            </button>

            <button
              type="button"
              onClick={() => setRole("instructor")}
              className={`px-4 py-1 rounded-full text-sm font-medium ${
                role === "instructor"
                  ? "bg-yellow-400 text-black"
                  : "text-gray-600"
              }`}
            >
              Instructor
            </button>

          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="mt-6 flex flex-col gap-4"
          >

            {/* NAME */}
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="border border-gray-300 px-4 py-2 rounded-md outline-none focus:border-indigo-500"
              required
            />

            {/* EMAIL */}
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="border border-gray-300 px-4 py-2 rounded-md outline-none focus:border-indigo-500"
              required
            />

            {/* PASSWORD */}
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="border border-gray-300 px-4 py-2 rounded-md outline-none focus:border-indigo-500"
              required
            />

            {/* CONFIRM PASSWORD */}
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="border border-gray-300 px-4 py-2 rounded-md outline-none focus:border-indigo-500"
              required
            />

            {/* OPTIONAL FIELD */}
            {role === "instructor" && (
              <input
                type="text"
                placeholder="Your Expertise (e.g. Web Development)"
                className="border border-gray-300 px-4 py-2 rounded-md outline-none focus:border-indigo-500"
              />
            )}

            {/* BUTTON */}
            <button className="bg-yellow-400 text-black py-2 rounded-md font-semibold hover:bg-yellow-500 transition">
              Sign Up as {role}
            </button>

          </form>

          {/* LOGIN LINK */}
          <p className="text-sm text-gray-500 mt-4">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-indigo-600 cursor-pointer"
            >
              Login
            </span>
          </p>

        </div>
      </div>
    </div>
  );
}