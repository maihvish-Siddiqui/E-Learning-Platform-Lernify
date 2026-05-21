import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="w-full bg-[#0B1120] text-white px-4 md:px-10 py-4 flex items-center justify-between fixed top-0 left-0 z-50 border-b border-gray-700">

      {/* LEFT */}
      <div className="flex items-center space-x-8">
        <h1 className="text-yellow-400 font-bold text-lg">
          Learnify
        </h1>

        <div className="hidden md:flex items-center space-x-6">
          <span onClick={() => navigate("/")} className="text-yellow-400 cursor-pointer">Home</span>
          <span onClick={() => navigate("/about")} className="cursor-pointer">About Us</span>
          <span onClick={() => navigate("/contact")} className="cursor-pointer">Contact Us</span>
        </div>
      </div>

      

      {/* RIGHT */}
      <div className="flex items-center space-x-2 md:space-x-4">
        <button
          onClick={() => navigate("/login")}
          className="border border-gray-500 px-4 py-1 rounded-md hover:bg-gray-700"
        >
          Login
        </button>

        <button
          onClick={() => navigate("/signup")}
          className="border border-gray-500 px-4 py-1 rounded-md hover:bg-gray-700"
        >
          Signup
        </button>
      </div>

    </nav>
  );
}