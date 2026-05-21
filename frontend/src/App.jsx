import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import AuthNavbar from "./components/AuthNavbar";

import Home from "./pages/Homepage";
import Login from "./pages/Login";
import Courses from "./pages/Courses";
import Footer from "./components/Footer";
import Signup from "./pages/Signup";
import About from "./pages/About";
import Contact from "./pages/Contact";
import StudentDashboard from "./pages/StudentDashboard";
import InstructorDashboard from "./pages/InstructorDashboard";
import CreateCourse from "./pages/CreateCourse";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import CourseDetails from "./pages/CourseDetails";
import ManageCourse from "./pages/ManageCourse";
import LearnCourse from "./pages/LearnCourse";
import EnrollmentForm from "./pages/EnrollmentForm";
import PaymentPage from "./pages/PaymentPage";

import ProtectedRoutes from "./components/ProtectedRoute";

import "./index.css";

/* ================= LAYOUT ================= */
function Layout() {

  const location = useLocation();

  const isLoggedIn = localStorage.getItem("token");

  // hide footer pages
  const hideFooter =
    location.pathname === "/courses" ||
    location.pathname === "/student-dashboard" ||
    location.pathname === "/instructor-dashboard" ||
    location.pathname === "/create-course" ||
    location.pathname === "/profile" ||
    location.pathname === "/edit-profile" ||
    location.pathname.startsWith("/manage-course") ||
    location.pathname.startsWith("/course/") ||
    location.pathname.startsWith("/learn/") ||
    location.pathname.startsWith("/enrollment-form") ||   
    location.pathname.startsWith("/payment"); 

  console.log("Current path:", location.pathname);

  // sidebar pages
  const showSidebar =
    location.pathname === "/profile" ||
    location.pathname === "/student-dashboard" ||
    location.pathname === "/instructor-dashboard" ||
    location.pathname === "/edit-profile";

  return (
    <>
      {/* NAVBAR */}
      {isLoggedIn ? <AuthNavbar /> : <Navbar />}

      {/* PAGE CONTENT */}
      <div className={showSidebar ? "pt-20 sm:ml-[260px]" : "pt-20"}>

        <Routes>

          {/* PUBLIC */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* COURSES */}
          <Route
            path="/courses"
            element={
              <ProtectedRoutes>
                <Courses />
              </ProtectedRoutes>
            }
          />

          <Route
            path="/course/:id"
            element={
              <ProtectedRoutes>
                <CourseDetails />
              </ProtectedRoutes>
            }
          />

          {/* LEARN COURSE */}
          <Route
            path="/learn/:id"
            element={
              <ProtectedRoutes allowedRole="student">
                <LearnCourse />
              </ProtectedRoutes>
            }
          />

          {/* PROFILE */}
          <Route
            path="/profile"
            element={
              <ProtectedRoutes>
                <Profile />
              </ProtectedRoutes>
            }
          />

          <Route
            path="/edit-profile"
            element={
              <ProtectedRoutes>
                <EditProfile />
              </ProtectedRoutes>
            }
          />

          {/* STUDENT */}
          <Route
            path="/student-dashboard"
            element={
              <ProtectedRoutes allowedRole="student">
                <StudentDashboard />
              </ProtectedRoutes>
            }
          />

          {/* INSTRUCTOR */}
          <Route
            path="/instructor-dashboard"
            element={
              <ProtectedRoutes allowedRole="instructor">
                <InstructorDashboard />
              </ProtectedRoutes>
            }
          />

          {/* CREATE COURSE */}
          <Route
            path="/create-course"
            element={
              <ProtectedRoutes allowedRole="instructor">
                <CreateCourse />
              </ProtectedRoutes>
            }
          />

          {/* MANAGE COURSE */}
          <Route
            path="/manage-course/:id"
            element={
              <ProtectedRoutes allowedRole="instructor">
                <ManageCourse />
              </ProtectedRoutes>
            }
          />

          <Route
          path="/enrollment-form/:id"
          element={<EnrollmentForm />}
          />
          
          <Route
          path="/payment/:id"
          element={<PaymentPage />}
          />

        </Routes>

        {/* FOOTER */}
        {!hideFooter && <Footer />}

      </div>
    </>
  );
}

/* ================= APP ================= */
export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}