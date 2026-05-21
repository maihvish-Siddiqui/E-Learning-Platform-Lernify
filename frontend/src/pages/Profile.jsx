import axios from "axios";
import { useEffect, useState } from "react";

export default function Profile() {

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  const [courses, setCourses] = useState([]);
  const [stats, setStats] = useState(null);

  const bio = user?.bio || "";

  useEffect(() => {

    const fetchProfileData = async () => {

      try {

        const res = await axios.get(
          `http://localhost:5000/api/users/profile-data/${user._id}`
        );

        setCourses(res.data.instructorCourses || []);

        setStats({
          enrolledCourses: res.data.enrolledCourses || [],
          totalStudents: res.data.totalStudents || 0,
        });

      } catch (error) {
        console.log(error);
      }
    };

    fetchProfileData();

  }, []);

  // PHOTO UPLOAD
  const handlePhotoUpload = async (e) => {

    const file = e.target.files[0];

    if (!file) return;

    try {

      const formData = new FormData();

      formData.append("profilePhoto", file);

      const token = localStorage.getItem("token");

      const res = await axios.put(
        "http://localhost:5000/api/users/upload-photo",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const updatedUser = {
        ...user,
        profilePhoto: res.data.profilePhoto,
      };

      localStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      );

      setUser(updatedUser);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    // <div className="min-h-screen bg-black text-white px-3 sm:px-6 pb-12 overflow-x-hidden pt-20">
    <div className="min-h-screen bg-black text-white overflow-x-hidden pt-20">
      {/* <div className="w-full max-w-6xl mx-auto"> */}
      <div className="max-w-6xl mx-auto px-3 sm:px-6 pb-12">

        {/* TOP PROFILE SECTION */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12 border-b border-gray-800 pt-6 sm:pt-10 pb-12 w-full">

          {/* PROFILE PHOTO */}
          <div className="flex flex-col items-center">

            {user?.profilePhoto ? (
              <img
                src={`http://localhost:5000/uploads/${user.profilePhoto}`}
                alt="profile"
                className="w-28 h-28 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-yellow-400"
              />
            ) : (
              <div className="w-28 h-28 sm:w-40 sm:h-40 rounded-full bg-yellow-400 text-black flex items-center justify-center text-4xl sm:text-6xl font-bold border-4 border-yellow-400">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
            )}

          </div>

          {/* RIGHT CONTENT */}
          <div className="flex-1 w-full overflow-hidden">

            {/* NAME */}
            <h1 className="text-2xl sm:text-4xl font-bold text-center lg:text-left break-words">
              {user?.name}
            </h1>

            {/* ROLE */}
            <p className="text-yellow-400 font-semibold capitalize text-base sm:text-lg mt-3 text-center lg:text-left">
              {user?.role}
            </p>

            {/* STATS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">

              {/* INSTRUCTOR */}
              {user?.role === "instructor" && (
                <>
                  <div className="bg-[#111827] border border-gray-800 rounded-2xl p-6 shadow-lg">

                    <h2 className="text-4xl font-bold text-yellow-400">
                      {courses.length}
                    </h2>

                    <p className="text-gray-400 mt-2">
                      Courses Posted
                    </p>

                  </div>

                  <div className="bg-[#111827] border border-gray-800 rounded-2xl p-4 sm:p-6 shadow-lg">

                    <h2 className="text-4xl font-bold text-green-400">
                      {stats?.totalStudents || 0}
                    </h2>

                    <p className="text-gray-400 mt-2">
                      Total Students
                    </p>

                  </div>
                </>
              )}

              {/* STUDENT */}
              {user?.role === "student" && (
              <>
              <div className="bg-[#111827] border border-gray-800 rounded-2xl p-6 shadow-lg">
                <h2 className="text-4xl font-bold text-yellow-400">
                  {stats?.enrolledCourses?.length || 0}
                </h2>
                <p className="text-gray-400 mt-2">Enrolled Courses</p>
              </div>
              
              <div className="bg-[#111827] border border-gray-800 rounded-2xl p-6 shadow-lg">
                <h2 className="text-4xl font-bold text-blue-400">
                  {
                  (stats?.enrolledCourses || []).filter(
                    (course) => course.completed === true
                  ).length
                  }
                </h2>
                <p className="text-gray-400 mt-2">Completed Courses</p>
              </div>
              </>
              )}

            </div>

            {/* BIO */}
            <div className="mt-8 bg-[#111827] border border-gray-800 rounded-2xl p-4 sm:p-6">

              <h3 className="text-xl font-semibold text-yellow-400 mb-3">
                Bio
              </h3>

              <p className="text-gray-300 leading-7">
                {bio || "No bio added yet."}
              </p>

            </div>

            {/* STUDENT PROGRESS */}
            {user?.role === "student" && (
              <div className="mt-14">

                <h2 className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-8">
                  Learning Progress
                </h2>

                <div className="space-y-6">
                {(stats?.enrolledCourses || []).map((course, index) => {
                  const progress = course.progress || 0;
                  
                return (
                
                <div
                key={index}
                className="bg-[#111827] border border-gray-800 rounded-2xl p-4 sm:p-6">
                  
                <div className="flex justify-between items-center mb-4">
                  
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-white">
                    {course.title || "Untitled Course"}
                  </h3>
                  <p className="text-gray-400 text-sm mt-1">Continue learning</p>
                </div>
                <span className="text-yellow-400 font-bold text-lg">
                  {progress}%
                </span>
              </div>
              
              {/* PROGRESS BAR */}
              <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
                <div
                className="bg-gradient-to-r from-cyan-400 to-blue-500 h-4 rounded-full transition-all duration-500"
                style={{
                  width: `${progress}%`,
                }}
              />
              </div>
              </div>
            );
            })}

                </div>

              </div>
            )}

            {/* INSTRUCTOR ANALYTICS */}
            {user?.role === "instructor" && (
              <div className="mt-14">

                <h2 className="text-3xl font-bold text-yellow-400 mb-8">
                  Course Analytics
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  {courses.map((course) => (

                    <div
                      key={course._id}
                      className="bg-[#111827] border border-gray-800 rounded-2xl p-6"
                    >

                      <h3 className="text-2xl font-semibold text-white">
                        {course.title}
                      </h3>

                      <div className="mt-5 flex justify-between items-center">

                        <p className="text-gray-400">
                          Total Students
                        </p>

                        <span className="text-green-400 text-2xl font-bold">
                          {course.students || 0}
                        </span>

                      </div>

                    </div>

                  ))}

                </div>

              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}