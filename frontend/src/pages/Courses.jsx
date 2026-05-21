import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Courses() {

  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const role = localStorage.getItem("role");

  useEffect(() => {

    const fetchCourses = async () => {

      try {

        const response = await fetch(
          "http://localhost:5000/api/courses"
        );

        const data = await response.json();

        setCourses(data);

      } catch (error) {

        console.log("Error fetching courses");

      }
    };

    fetchCourses();

  }, []);

  useEffect(() => {

    const updateSearch = () => {
  
      setSearchTerm(
        localStorage.getItem("courseSearch") || ""
      );
    };
  
    window.addEventListener(
      "courseSearch",
      updateSearch
    );
  
    updateSearch();
  
    return () => {
  
      window.removeEventListener(
        "courseSearch",
        updateSearch
      );
    };
  
  }, []);

  return (
    <div className="min-h-screen bg-[#0B1120] text-white pt-24 px-4 md:px-6">

      {/* HERO SECTION */}
      <div className="text-center bg-[#1F2937] p-6 md:p-10 rounded-2xl shadow-lg mb-10">

        <h1 className="text-3xl sm:text-3xl md:text-4xl font-bold text-yellow-400">
          Welcome to Learnify
        </h1>

        <p className="text-gray-300 mt-3">
          Explore courses or manage your learning dashboard
        </p>
        </div>

      {/* COURSE GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

      {courses.filter((course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()))
      .map((course) => (

          <div
            key={course._id}
            className="bg-[#1F2937] p-4 md:p-5 rounded-xl hover:scale-105 transition duration-300 shadow-lg"
          >

            {/* THUMBNAIL */}
            <img
              src={
                course.thumbnail
                  ? `http://localhost:5000/uploads/${course.thumbnail}`
                  : "https://images.unsplash.com/photo-1498050108023-c5249f4df085"
              }
              alt={course.title}
              className="w-full h-48 sm:h-40 md:h-44 object-cover rounded-lg mb-4"
            />

            {/* TITLE */}
            <h2 className="text-xl font-semibold text-yellow-400">
              {course.title}
            </h2>

            {/* DESCRIPTION */}
            <p className="text-gray-300 mt-2 text-sm leading-6">
              {course.description}
            </p>

            {/* INSTRUCTOR */}
            <p className="text-sm mt-3 text-gray-400">
              Instructor: {course.createdBy?.name || "Unknown"}
            </p>

            {/* PRICE + BUTTON */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 justify-between sm:items-center mt-4">

              <span className="text-green-400 font-bold">
              ₹ {course.price}
              </span>

              <button
              onClick={() => navigate(`/course/${course._id}`)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg w-full sm:w-auto">
                View Course
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}