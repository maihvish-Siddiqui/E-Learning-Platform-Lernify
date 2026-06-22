import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function InstructorDashboard() {

  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

 

  useEffect(() => {

    const loadData = async () => {
      try {
        const courseRes = await fetch(
          `https://e-learning-platform-lernify-backend.onrender.com/api/courses/instructor/${user._id}`
        );
        
        const coursesData = await courseRes.json();
        
        setCourses(coursesData);
        
        // FETCH ENROLLMENTS
        const enrollRes = await axios.get(
          `https://e-learning-platform-lernify-backend.onrender.com/api/enrollments/instructor/${user._id}`
        );
        
        setEnrollments(enrollRes.data);
      } catch (err) {
        console.log(err);
      }
    };
  
    loadData();
  
  }, []);

  const handleDeleteCourse = async (courseId) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this course?"
    );
  
    if (!confirmDelete) return;
  
    try {
  
      await axios.delete(
        `https://e-learning-platform-lernify-backend.onrender.com/api/courses/delete/${courseId}`
      );
  
      // REMOVE COURSE FROM UI
      setCourses(
        courses.filter(
          (course) => course._id !== courseId
        )
      );
  
      alert("Course Deleted Successfully");
  
    } catch (error) {
  
      console.log(error);
  
      alert("Error deleting course");
  
    }
  };


  return (
    <div className="min-h-screen bg-[#0B1120] text-white pt-24 px-4 sm:px-6 lg:ml-[260px] overflow-x-hidden">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-10">

        <div>
          <h1 className="text-3xl font-bold text-yellow-400">
            Instructor Dashboard
          </h1>

          <p className="text-gray-400 mt-2">
            Welcome, {user?.name}
          </p>
        </div>

        <button
          onClick={() => navigate("/create-course")}
          className="bg-yellow-400 text-black px-5 py-2 rounded-md font-semibold hover:bg-yellow-500 w-full sm:w-auto"
        >
          + Create Course
        </button>

      </div>

      {/* COURSES */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

        {courses.length > 0 ? (

          courses.map((course) => (

            <div
              key={course._id}
              className="bg-[#1F2937] p-5 rounded-xl shadow-lg"
            >

              <img
                src={
                  course.thumbnail
                    ? `https://e-learning-platform-lernify-backend.onrender.com/uploads/${course.thumbnail}`
                    : "https://images.unsplash.com/photo-1498050108023-c5249f4df085"
                }
                alt={course.title}
                className="w-full h-40 sm:h-48 object-cover rounded-lg"
              />

              <h2 className="text-lg sm:text-xl text-yellow-400 mt-4 break-words">
                {course.title}
              </h2>

              <p className="text-gray-300 mt-2 text-sm">
                {course.description}
              </p>

              <div className="flex justify-between items-center mt-4">

                <span className="text-green-400 font-bold">
                  {course.price}
                </span>

                <span className="text-gray-400 text-sm">
                  {course.category}
                </span>

              </div>

              <button
              onClick={() => navigate(`/manage-course/${course._id}`)}
              className="mt-4 w-full bg-yellow-400 hover:bg-yellow-500 text-black py-2 rounded-lg font-semibold"
              >
                Manage Course
              </button>

              <button
              onClick={() => handleDeleteCourse(course._id)}
              className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg">
                Delete Course
              </button>

            </div>

          ))

        ) : (

          <div className="text-gray-400">
            No courses created yet
          </div>

        )}

      </div>

      <div className="mt-16">

  <h2 className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-8">
    Enrolled Students
  </h2>

  <div className="space-y-6">

    {enrollments.map((item) => (

      <div
        key={item._id}
        className="bg-[#1F2937] p-4 sm:p-6 rounded-2xl overflow-hidden break-words"
      >

        <h3 className="text-xl sm:text-2xl font-bold text-white break-words">
          {item.fullName}
        </h3>

        <p>Email: {item.email}</p>

        <p>Phone: {item.phone}</p>

        <p>City: {item.city}</p>

        <p>Education: {item.education}</p>

        <p className="text-yellow-400">
          Course: {item.courseId?.title}
        </p>

        <p>
          Payment:
          {item.status}
        </p>

        <p>
          Progress:
          {item.completedLectures.length}
          /
          {item.courseId?.lectures?.length || 0}
        </p>

      </div>

    ))}

  </div>

</div>

    </div>
  );
}