import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StudentDashboard() {

  const navigate = useNavigate();

  const [enrolledCourses, setEnrolledCourses] =
    useState([]);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {

    const fetchEnrollments = async () => {

      try {

        const res = await axios.get(
          `https://e-learning-platform-lernify-backend.onrender.com/api/enrollments/student/${user._id}`
        );
        console.log(res.data);

        setEnrolledCourses(res.data);

      } catch (error) {

        console.log(error);

      }
    };

    fetchEnrollments();

  }, []);

  return (
    <div className="min-h-screen bg-[#0B1120] text-white pt-24 px-6">

      {/* HEADER */}
      <div className="mb-10">

        <h1 className="text-3xl font-bold text-yellow-400">
          Student Dashboard
        </h1>

        <p className="text-gray-400 mt-2">
          Welcome, {user?.name}
        </p>

      </div>

      {/* ENROLLED COURSES */}
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">

        {enrolledCourses.length > 0 ? (
          enrolledCourses.map((item) => {
            const course = item?.courseId;
          
            if (!course) return null;
          
            return (
              <div key={course._id} className="bg-[#1F2937] rounded-2xl overflow-hidden border border-gray-700">
                
                <img
                  // src={
                  //   course?.thumbnail ||
                  //   "https://images.unsplash.com/photo-1498050108023-c5249f4df085"
                  // }

                  src={
                    course.thumbnail
                      ? `https://e-learning-platform-lernify-backend.onrender.com/uploads/${course.thumbnail}`
                      : "https://images.unsplash.com/photo-1498050108023-c5249f4df085"
                  }
                  alt={course?.title}
                  className="w-full h-44 object-cover"
                />
          
                <div className="p-5">
                  <h2 className="text-xl font-bold text-yellow-400">
                    {course?.title}
                  </h2>
          
                  <p className="text-gray-400 text-sm mt-3 line-clamp-3">
                    {course?.description}
                  </p>
          
                  <button
                    onClick={() => navigate(`/learn/${course._id}`)}
                    className="mt-5 w-full bg-yellow-400 hover:bg-yellow-500 text-black py-3 rounded-lg font-semibold transition"
                  >
                    Continue Learning
                  </button>
                </div>
          
              </div>
            );
          })

        ) : (

          <div className="text-gray-400 text-lg">
            No enrolled courses yet
          </div>

        )}

      </div>

    </div>
  );
}