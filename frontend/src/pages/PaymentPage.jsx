import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function PaymentPage() {
  const navigate = useNavigate();

  // IMPORTANT: this is ENROLLMENT ID (not course id)
  const { id } = useParams();

  const [enrollment, setEnrollment] = useState(null);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEnrollmentAndCourse = async () => {
      try {
        console.log("ENROLLMENT ID:", id);
  
        const user = JSON.parse(
          localStorage.getItem("user")
        );
        
        const res = await axios.get(
          `https://e-learning-platform-lernify-backend.onrender.com/api/enrollments/payment/${id}?studentId=${user._id}`
        );
  
        console.log("ENROLLMENT DATA:", res.data);
  
        setEnrollment(res.data);
  
        setCourse(res.data.courseId);
      } catch (error) {
        console.log("ERROR FETCHING PAYMENT DATA:", error.response?.data || error.message);
      }
    };
  
    fetchEnrollmentAndCourse();
  }, [id]);

  // ===============================
// STEP: PAYMENT SUCCESS (FAKE PAYMENT)
// ===============================

const handlePayment = async () => {
  try {
    setLoading(true);

    const token = localStorage.getItem("token");

    await axios.patch(
      `https://e-learning-platform-lernify-backend.onrender.com/api/enrollments/pay/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Payment Successful 🎉 Course Unlocked");

    navigate("/student-dashboard");

  } catch (error) {
    console.log(error);
    alert("Payment Failed");
  } finally {
    setLoading(false);
  }
};

  if (!course || !enrollment) {
    return (
      <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center text-3xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white pt-28 px-6 flex justify-center items-center">
      <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-10">

        {/* LEFT */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-2xl">

          <h1 className="text-4xl font-black text-yellow-400 mb-8">
            Complete Payment
          </h1>

          <div className="space-y-6">

            <div className="bg-[#111827] p-5 rounded-xl border border-gray-700">
              <p className="text-gray-400">Student</p>
              <h2 className="text-xl font-bold">{enrollment.fullName}</h2>
            </div>

            <div className="bg-[#111827] p-5 rounded-xl border border-gray-700">
              <p className="text-gray-400">Email</p>
              <h2 className="text-xl font-bold">{enrollment.email}</h2>
            </div>

            <div className="bg-[#111827] p-5 rounded-xl border border-gray-700">
              <p className="text-gray-400">Payment Method</p>
              <h2 className="text-xl font-bold">Mock Payment</h2>
            </div>

            <button
              onClick={handlePayment}
              disabled={loading}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black py-4 rounded-2xl font-bold text-xl transition"
            >
              {loading ? "Processing..." : `Pay ₹${course.price}`}
            </button>

          </div>
        </div>

        {/* RIGHT */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-2xl">

          <h2 className="text-3xl font-black text-green-400 mb-6">
            Course Summary
          </h2>

          <img
            src={`https://e-learning-platform-lernify-backend.onrender.com/uploads/${course.thumbnail}`}
            alt={course.title}
            className="w-full h-60 object-cover rounded-2xl"
          />

          <h3 className="text-2xl font-bold mt-6">{course.title}</h3>

          <p className="text-gray-400 mt-3">{course.description}</p>

          <div className="mt-6 space-y-3 text-lg">
            <div className="flex justify-between">
              <span>Instructor</span>
              <span>{course.instructorName}</span>
            </div>

            <div className="flex justify-between">
              <span>Category</span>
              <span>{course.category}</span>
            </div>

            <div className="flex justify-between">
              <span>Level</span>
              <span>{course.level}</span>
            </div>

            <div className="border-t border-gray-700 pt-4 flex justify-between text-2xl font-bold text-yellow-400">
              <span>Total</span>
              <span>₹{course.price}</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}