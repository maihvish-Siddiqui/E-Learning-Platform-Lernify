import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function LearnCourse() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState([]);

  useEffect(() => {

    const fetchCourse = async () => {
  
      try {
  
        setLoading(true);
  
        const user = JSON.parse(
          localStorage.getItem("user")
        );
  
        const res = await axios.get(
          `http://localhost:5000/api/courses/learn/${id}?studentId=${user._id}`
        );
  
        setCourse(res.data);
  
        setCompleted(
          res.data.completedLectures || []
        );
  
        setLoading(false);
  
      } catch (err) {

        console.log(err);
      
        const message =
          err.response?.data?.message;
      
        const user = JSON.parse(
          localStorage.getItem("user")
        );
      
        // PAYMENT NOT COMPLETED
        if (message === "Please complete payment first") {
      
          alert("Please complete payment first");
      
          const enrollRes = await axios.get(
            `http://localhost:5000/api/enrollments/check/${id}?studentId=${user._id}`
          );
      
          navigate(`/payment/${enrollRes.data._id}`);
      
          return;
        }
      
        // NOT ENROLLED
        if (message === "Please enroll first") {
      
          alert("Please enroll first");
      
          navigate(`/course/${id}`);
      
          return;
        }
      
        alert(message || "Access Denied");
      }
    };
  
    fetchCourse();
  
  }, [id, navigate]);

  // if (!course) {
  //   return (
  //     <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center text-3xl">
  //       Loading...
  //     </div>
  //   );
  // }
  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center text-3xl">
        Loading...
      </div>
    );
  }
  
  if (!course) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white pt-28 px-6">

      {/* TOP SECTION */}
      <div className="max-w-7xl mx-auto">

        {/* <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl p-10 text-black shadow-2xl"> */}
        {/* <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-black rounded-3xl p-10 text-white shadow-2xl border border-gray-700"> */}
        {/* <div className="bg-gradient-to-r from-emerald-500 via-green-600 to-teal-700 rounded-3xl p-10 text-white shadow-2xl"> */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-10 text-white shadow-2xl">

          <h1 className="text-5xl font-black">
            {course.title}
          </h1>

          <p className="mt-4 text-lg font-medium max-w-3xl">
            Continue learning and track your progress.
          </p>

          {/* PROGRESS BAR */}
          <div className="mt-8">

            <div className="flex justify-between mb-2 font-bold">
              <span>Course Progress</span>

              <span>
                {completed.length} / {course.lectures?.length}
              </span>
            </div>

            <div className="w-full bg-black/20 h-4 rounded-full overflow-hidden">

              <div
                className="bg-gradient-to-r from-yellow-300 to-orange-500 h-4 rounded-full transition-all duration-500"
                style={{
                  width: `${
                    (completed.length /
                      course.lectures?.length) * 100
                  }%`,
                }}
              ></div>

            </div>

          </div>

        </div>

      </div>

      {/* LECTURES */}
      <div className="max-w-7xl mx-auto mt-12 space-y-10">

        {course.lectures?.map((lecture, index) => (

          <div
            key={index}
            className="bg-[#111827] border border-gray-800 rounded-3xl overflow-hidden shadow-xl"
          >

            {/* HEADER */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 p-6 border-b border-gray-800">

              <div>

                <p className="text-yellow-400 font-semibold text-sm tracking-wider uppercase">
                  Lecture {index + 1}
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  {lecture.title}
                </h2>

              </div>

              <button
                onClick={async () => {

                  if (completed.includes(index)) return;

                  const user = JSON.parse(
                    localStorage.getItem("user")
                  );

                  try {

                    await axios.post(
                      "http://localhost:5000/api/enrollments/complete-lecture",
                      {
                        studentId: user._id,
                        courseId: id,
                        lectureIndex: index,
                      }
                    );

                    setCompleted((prev) => [
                      ...prev,
                      index,
                    ]);

                  } catch (err) {

                    console.log(err);

                  }
                }}

                className={`px-6 py-3 rounded-xl font-bold transition ${
                  completed.includes(index)
                    ? "bg-green-500"
                    : "bg-yellow-400 hover:bg-yellow-500 text-black"
                }`}
              >

                {completed.includes(index)
                  ? "✓ Completed"
                  : "Mark Complete"}

              </button>

            </div>

            {/* CONTENT */}
            <div className="p-6 grid lg:grid-cols-3 gap-8">

              {/* VIDEO */}
<div className="lg:col-span-2">

{lecture.videoType === "youtube" ? (

  <iframe
    width="100%"
    height="450"
    src={lecture.videoUrl.replace(
      "watch?v=",
      "embed/"
    )}
    title="Lecture Video"
    className="rounded-2xl w-full"
    allowFullScreen
  ></iframe>

) : (

  <video
    controls
    className="rounded-2xl w-full"
    height="450"
  >
    <source
      src={`http://localhost:5000/uploads/${lecture.videoUrl}`}
      type="video/mp4"
    />

    Your browser does not support video.
  </video>

)}

</div>

              {/* RIGHT SIDEBAR */}
              <div className="space-y-6">

                {/* PDF */}
                <div className="bg-[#1F2937] p-6 rounded-2xl border border-gray-700">

                  <h3 className="text-xl font-bold text-blue-400">
                    PDF Notes
                  </h3>

                  <p className="text-gray-400 mt-3 text-sm leading-7">
                    Open lecture notes and study material.
                  </p>

                  <a
                    href={`http://localhost:5000/uploads/${lecture.pdf}`}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-block bg-blue-500 hover:bg-blue-600 px-5 py-3 rounded-xl font-semibold transition"
                  >
                    Open PDF
                  </a>

                </div>

                {/* ASSIGNMENT */}
                <div className="bg-[#1F2937] p-6 rounded-2xl border border-gray-700">

                  <h3 className="text-xl font-bold text-green-400">
                    Assignment
                  </h3>

                  <p className="mt-4 text-gray-300 leading-7">
                    {lecture.assignment}
                  </p>

                </div>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}