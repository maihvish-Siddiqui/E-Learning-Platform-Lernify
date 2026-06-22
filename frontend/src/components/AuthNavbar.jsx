import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Menu, X } from "lucide-react";

export default function AuthNavbar() {

  const navigate = useNavigate();
  const location = useLocation();
  const searchRef = useRef();

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  const role = user?.role;

  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {

    const updatedUser = JSON.parse(
      localStorage.getItem("user")
    );

    setUser(updatedUser);

  }, [location.pathname]);

  useEffect(() => {

    const handleClickOutside = (event) => {

      if (
        searchRef.current &&
        !searchRef.current.contains(event.target)
      ) {
        setResults([]);
      }

    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {

      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

    };

  }, []);

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");

  };

  const handleSearch = async (value) => {

    setSearch(value);

    if (!value.trim()) {
      setResults([]);
      return;
    }

    try {

      const res = await axios.get(
        `https://e-learning-platform-lernify-backend.onrender.com/api/courses/search?query=${value}`
      );

      setResults(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  // SIDEBAR ROUTES
  const sidebarRoutes = [
    "/profile",
    "/student-dashboard",
    "/instructor-dashboard",
    "/edit-profile",
  ];

  const showSidebar = sidebarRoutes.includes(
    location.pathname
  );

  // HIDE SEARCH
  const hideSearch =
    location.pathname === "/profile" ||
    location.pathname === "/edit-profile" ||
    location.pathname.startsWith("/learn/");

  return (
    <>

      {/* ================= NAVBAR ================= */}

      <nav
        className={`
          fixed top-0 right-0 h-16
          bg-[#111827]
          border-b border-gray-700
          px-3 md:px-6
          flex items-center justify-between
          z-50 transition-all duration-300

          ${
            showSidebar
              ? "left-0 sm:left-[260px] sm:w-[calc(100%-260px)] w-full"
              : "left-0 w-full"
          }
        `}
      >

        {/* LEFT */}
        <div className="flex items-center gap-3">

          {/* MOBILE MENU BUTTON */}
          {showSidebar && (
            <button
              onClick={() => setSidebarOpen(true)}
              className="sm:hidden text-white"
            >
              <Menu size={28} />
            </button>
          )}

          {/* LOGO */}
          <h1
            onClick={() => navigate("/courses")}
            className="text-lg sm:text-2xl font-bold text-yellow-400 cursor-pointer"
          >
            Learnify
          </h1>

        </div>

        {/* SEARCH BAR */}
        {!hideSearch && (
          <div
            ref={searchRef}
            className="hidden md:flex flex-1 justify-center relative"
          >

            <input
              type="text"
              placeholder="Search courses..."
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              className="bg-[#1F2937] text-white px-4 py-2 rounded-lg outline-none border border-gray-600 w-[250px] lg:w-[320px]"
            />

            {/* SEARCH RESULTS */}
            {search.trim() && results.length > 0 && (
              <div className="absolute top-14 bg-[#1F2937] w-[320px] rounded-lg shadow-lg max-h-60 overflow-y-auto z-50">

                {results.map((course) => (

                  <div
                    key={course._id}
                    onClick={() => {

                      navigate(`/course/${course._id}`);

                      setSearch("");
                      setResults([]);

                    }}
                    className="p-3 hover:bg-yellow-400 hover:text-black cursor-pointer border-b border-gray-700"
                  >

                    <p className="font-semibold">
                      {course.title}
                    </p>

                    <p className="text-sm text-gray-400">
                      {course.instructorName}
                    </p>

                  </div>

                ))}

              </div>
            )}

            {/* NO RESULTS */}
            {search.trim() && results.length === 0 && (
              <div className="absolute top-14 bg-[#1F2937] w-[320px] rounded-lg shadow-lg p-4 text-center text-gray-300 z-50">

                <p>No courses found</p>

                <button
                  onClick={() => {

                    navigate("/courses");

                    setSearch("");
                    setResults([]);

                  }}
                  className="mt-3 bg-yellow-400 text-black px-4 py-2 rounded-lg w-full"
                >
                  Browse All Courses
                </button>

              </div>
            )}

          </div>
        )}

        {/* RIGHT USER */}
        <div className="flex items-center gap-2 md:gap-4">

          {!user ? (
            <>

              <button
                onClick={() => navigate("/login")}
                className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold"
              >
                Login
              </button>

              <button
                onClick={() => navigate("/signup")}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                Signup
              </button>

            </>
          ) : (

            <div
              onClick={() => navigate("/profile")}
              className="flex items-center gap-3 cursor-pointer"
            >

              {user?.profilePhoto ? (
                <img
                  src={`https://e-learning-platform-lernify-backend.onrender.com/uploads/${user.profilePhoto}`}
                  alt="profile"
                  className="w-10 h-10 rounded-full border-2 border-yellow-400 object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-yellow-400 text-black flex items-center justify-center font-bold border-2 border-yellow-400">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
              )}

              <span className="hidden sm:block text-white font-medium">
                {user?.name}
              </span>

            </div>

          )}

        </div>

      </nav>

      {/* ================= SIDEBAR ================= */}

      {showSidebar && (
        <>

          {/* OVERLAY */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black/50 z-40 sm:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* SIDEBAR */}
          <div
            className={`
              fixed top-0 left-0 h-full w-[260px]
              bg-[#1F2937]
              z-50 flex flex-col shadow-lg
              transform transition-transform duration-300

              ${
                sidebarOpen
                  ? "translate-x-0"
                  : "-translate-x-full"
              }

              sm:translate-x-0
            `}
          >

            {/* HEADER */}
            <div className="px-6 py-5 border-b border-gray-700 flex items-center justify-between">

              <h2
                onClick={() => {

                  navigate("/courses");
                  setSidebarOpen(false);

                }}
                className="text-yellow-400 text-2xl font-bold cursor-pointer"
              >
                Learnify
              </h2>

              {/* MOBILE CLOSE */}
              <button
                onClick={() => setSidebarOpen(false)}
                className="sm:hidden text-white"
              >
                <X size={24} />
              </button>

            </div>

            {/* USER INFO */}
            <div className="p-6 border-b border-gray-700 text-center">

              {user?.profilePhoto ? (
                <img
                  src={`https://e-learning-platform-lernify-backend.onrender.com/uploads/${user.profilePhoto}`}
                  alt="profile"
                  className="w-20 h-20 rounded-full object-cover border-4 border-yellow-400 mx-auto"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-yellow-400 text-black flex items-center justify-center text-3xl font-bold mx-auto border-4 border-yellow-400">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
              )}

              <h3 className="text-white mt-4 font-semibold text-lg">
                {user?.name}
              </h3>

              <p className="text-gray-400 text-sm capitalize">
                {role}
              </p>

            </div>

            {/* MENU */}
            <div className="flex flex-col p-4 gap-3 flex-1">

              <button
                onClick={() => {

                  navigate("/courses");
                  setSidebarOpen(false);

                }}
                className="bg-[#111827] hover:bg-yellow-400 hover:text-black text-white px-4 py-3 rounded-lg transition"
              >
                📚 Courses
              </button>

              {role === "student" && (
                <button
                  onClick={() => {

                    navigate("/student-dashboard");
                    setSidebarOpen(false);

                  }}
                  className="bg-[#111827] hover:bg-yellow-400 hover:text-black text-white px-4 py-3 rounded-lg transition"
                >
                  🎓 Student Dashboard
                </button>
              )}

              {role === "instructor" && (
                <button
                  onClick={() => {

                    navigate("/instructor-dashboard");
                    setSidebarOpen(false);

                  }}
                  className="bg-[#111827] hover:bg-yellow-400 hover:text-black text-white px-4 py-3 rounded-lg transition"
                >
                  👨‍🏫 Instructor Dashboard
                </button>
              )}

              <button
                onClick={() => {

                  navigate("/profile");
                  setSidebarOpen(false);

                }}
                className="bg-[#111827] hover:bg-yellow-400 hover:text-black text-white px-4 py-3 rounded-lg transition"
              >
                👤 Profile
              </button>

              <button
                onClick={() => {

                  navigate("/edit-profile");
                  setSidebarOpen(false);

                }}
                className="bg-[#111827] hover:bg-yellow-400 hover:text-black text-white px-4 py-3 rounded-lg transition"
              >
                ✏️ Edit Profile
              </button>

              <div className="mt-auto">

                <hr className="border-gray-600 my-4" />

                <button
                  onClick={handleLogout}
                  className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-lg transition"
                >
                  🚪 Logout
                </button>

              </div>

            </div>

          </div>

        </>
      )}

    </>
  );
}