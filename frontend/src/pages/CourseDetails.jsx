import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function CourseDetails() {

  const { id } = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [course, setCourse] = useState(null);

  const handleEnroll = () => {

    const user = JSON.parse(
      localStorage.getItem("user")
    );
  
    if (!user) {
      alert("Please login first");
      navigate("/login");
      return;
    }
  
    if (user.role === "instructor") {
      alert("Instructors cannot enroll");
      return;
    }
  
    navigate(`/enrollment-form/${id}`);
  };

  useEffect(() => {

    const fetchCourse = async () => {

      try {

        const res = await axios.get(
          `http://localhost:5000/api/courses/${id}`
        );

        setCourse(res.data);

      } catch (error) {

        console.log(error);

      }
    };


    fetchCourse();

  }, [id]);

  if (!course) {
    return (
      <div className="min-h-screen bg-[#0B1120] text-white flex items-center justify-center text-2xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B1120] text-white pt-24 px-6">
      <button
  onClick={() => navigate("/courses")}
  className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 mb-6"
>
  ← Browse Courses
</button>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10">

        {/* LEFT */}
        <div className="lg:col-span-2">

          <img
            src={
              course.thumbnail
                ? `http://localhost:5000/uploads/${course.thumbnail}`
                : "https://images.unsplash.com/photo-1498050108023-c5249f4df085"
            }
            alt={course.title}
            className="w-full h-[400px] object-cover rounded-2xl"
          />

          <h1 className="text-4xl font-bold text-yellow-400 mt-8">
            {course.title}
          </h1>

          <p className="text-gray-300 mt-6 leading-8 text-lg">
            {course.description}
          </p>

          {/* WHAT YOU WILL LEARN */}
          <div className="mt-12">

            <h2 className="text-2xl font-bold text-yellow-400 mb-6">
              What You'll Learn
            </h2>

            <div className="grid md:grid-cols-2 gap-4">

              {course.learnings?.map((item, index) => (

                <div
                  key={index}
                  className="bg-[#1F2937] p-4 rounded-xl border border-gray-700"
                >
                  ✅ {item}
                </div>

              ))}

            </div>

          </div>

          {/* COURSE CONTENT */}
          <div className="mt-14">

            <h2 className="text-2xl font-bold text-yellow-400 mb-6">
              Course Content
            </h2>

            <div className="space-y-4">

              {course.content?.map((item, index) => (

                <div
                  key={index}
                  className="bg-[#1F2937] p-5 rounded-xl border border-gray-700 flex justify-between items-center"
                >

                  <span>
                    📘 {item}
                  </span>

                  <span className="text-sm text-gray-400">
                    Lecture {index + 1}
                  </span>

                </div>

              ))}

            </div>

          </div>

        </div>

        {/* RIGHT */}
        <div>

          <div className="bg-[#1F2937] rounded-2xl p-6 sticky top-24 border border-gray-700">

          <h2 className="text-4xl font-bold text-green-400">
            ₹ {course.price}
            </h2>

{user?.role === "instructor" ? (

<p className="text-red-400 font-semibold mt-6 text-center">
  Instructors cannot enroll in courses
</p>

) : (

<button
  onClick={handleEnroll}
  className="w-full mt-6 bg-yellow-400 hover:bg-yellow-500 text-black py-4 rounded-xl font-bold text-lg transition"
>
  Enroll Now
</button>

)}

            <div className="mt-8 space-y-5 text-gray-300">

              <div className="flex justify-between">
                <span>Instructor</span>

                <span className="text-white">
                  {course.instructorName || "Instructor"}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Category</span>

                <span className="text-white">
                  {course.category}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Students</span>

                <span className="text-white">
                  {course.students || 0}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Level</span>

                <span className="text-white">
                    {course.level}
                </span>
              </div>

            </div>

          </div>

        </div>

        {/* Instructor Contact */}
<div className="mt-8 bg-[#111827] p-5 rounded-2xl border border-gray-700">

<h2 className="text-xl font-bold text-yellow-400">
  Instructor Contact
</h2>

<p className="mt-3 text-lg text-white">
  {course.instructorName}
</p>

<p className="text-gray-400 mt-2">
  📞 {course.instructorPhone}
</p>

</div>

      </div>

    </div>
  );
}