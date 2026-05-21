import { useNavigate } from "react-router-dom";

export default function Contact() {
  const navigate = useNavigate();

  return (

    <div className="w-full min-h-screen bg-[#030B1D] pt-20 px-4 flex items-center justify-center">
      {/* MAIN CONTAINER */}
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-lg flex flex-col md:flex-row overflow-hidden">

        {/* LEFT SIDE (INFO) */}
        <div className="w-full md:w-1/2 bg-[#0B1120] text-white p-8 flex flex-col justify-center">

          <h2 className="text-3xl font-bold mb-4">
            Contact Us
          </h2>

          <p className="text-gray-300 mb-6">
            Have questions or need help?  
            Our team is here to assist you anytime.
          </p>

          <div className="space-y-4 text-sm">
            <p>📧 Email: support@codehub.com</p>
            <p>📞 Phone: +91 98765 43210</p>
            <p>📍 Location: India</p>
          </div>

        </div>

        {/* RIGHT SIDE (FORM) */}
        <div className="w-full md:w-1/2 p-8">

          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Send Message
          </h3>

          <form className="flex flex-col gap-4">

            <input
              type="text"
              placeholder="Your Name"
              className="border border-gray-300 px-4 py-2 rounded-md outline-none focus:border-indigo-500"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="border border-gray-300 px-4 py-2 rounded-md outline-none focus:border-indigo-500"
            />

            <input
              type="text"
              placeholder="Subject"
              className="border border-gray-300 px-4 py-2 rounded-md outline-none focus:border-indigo-500"
            />

            <textarea
              rows="4"
              placeholder="Your Message"
              className="border border-gray-300 px-4 py-2 rounded-md outline-none focus:border-indigo-500"
            ></textarea>

            <button className="bg-yellow-400 text-black py-2 rounded-md font-semibold hover:bg-yellow-500 transition">
              Send Message
            </button>

          </form>

          {/* CTA */}
          <p className="text-sm text-gray-500 mt-4">
            Want to start learning?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-indigo-600 cursor-pointer"
            >
              Sign up now
            </span>
          </p>

        </div>

      </div>
    </div>
  );
}