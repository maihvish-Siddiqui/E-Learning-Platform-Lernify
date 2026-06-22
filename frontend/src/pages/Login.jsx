import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import loginImg from "../assets/login.png";

export default function Login() {

  const navigate = useNavigate();

  const [role, setRole] = useState("student");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {

      const response = await axios.post(
        "https://e-learning-platform-lernify-backend.onrender.com/api/auth/login",
        {
          email: formData.email,
          password: formData.password,
          role,
        }
      );

      // SAVE TOKEN
      localStorage.setItem(
        "token",
        response.data.token
      );

      // SAVE USER
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      // SAVE ROLE
      localStorage.setItem(
        "role",
        response.data.user.role
      );

      // NAVIGATE
      navigate("/courses");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Login Failed"
      );

    }
  };

  return (
    <div className="w-full min-h-screen bg-[#0B1120] flex items-center justify-center px-4">

      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg flex overflow-hidden">

        {/* LEFT IMAGE */}
        <div className="hidden md:flex w-1/2 bg-[#1F2937] items-center justify-center p-6">
          <img
            src={loginImg}
            alt="login"
            className="className=w-[420px]"
          />
        </div>

        {/* RIGHT FORM */}
        <div className="w-full md:w-1/2 bg-[#1F2937] p-8">

          <h2 className="text-2xl font-bold text-white">
            Welcome Back
          </h2>

          <p className="text-sm text-yellow-500 mt-1">
            Login as Student or Instructor
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
            onSubmit={handleLogin}
            className="mt-6 flex flex-col gap-4"
          >

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="border border-gray-300 px-4 py-2 rounded-md"
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="border border-gray-300 px-4 py-2 rounded-md"
              required
            />

            <button
              type="submit"
              className="bg-yellow-400 text-black py-2 rounded-md font-semibold hover:bg-yellow-500 transition"
            >
              Login as {role}
            </button>

          </form>

          {/* SIGNUP */}
          <p className="text-sm text-gray-500 mt-4">
            Don’t have an account?{" "}

            <span
              onClick={() => navigate("/signup")}
              className="text-indigo-600 cursor-pointer"
            >
              Signup
            </span>

          </p>

        </div>

      </div>

    </div>
  );
}