// import { useNavigate } from "react-router-dom";

// export default function Sidebar() {

//   const navigate = useNavigate();

//   const user = JSON.parse(localStorage.getItem("user"));
//   const role = user?.role;

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/login");
//   };

//   return (
//     <div className="fixed top-0 left-0 h-full w-[260px] bg-[#1F2937] z-50 flex flex-col">

//       {/* HEADER */}
//       <div className="px-6 py-5 border-b border-gray-700">
//         <h2 className="text-yellow-400 text-2xl font-bold">
//           LearnHub
//         </h2>
//       </div>

//       {/* USER */}
//       <div className="p-6 border-b border-gray-700 text-center">

//         <div className="w-16 h-16 rounded-full bg-yellow-400 text-black flex items-center justify-center text-2xl font-bold mx-auto">
//           {user?.name?.charAt(0)}
//         </div>

//         <h3 className="text-white mt-3 font-semibold">
//           {user?.name}
//         </h3>

//         <p className="text-gray-400 text-sm capitalize">
//           {role}
//         </p>

//       </div>

//       {/* MENU */}
//       <div className="flex flex-col p-4 gap-3">

//         <button
//           onClick={() => navigate("/courses")}
//           className="bg-[#111827] hover:bg-yellow-400 hover:text-black text-white px-4 py-3 rounded-lg"
//         >
//           📚 Courses
//         </button>

//         {role === "student" && (
//           <button
//             onClick={() => navigate("/student-dashboard")}
//             className="bg-[#111827] hover:bg-yellow-400 hover:text-black text-white px-4 py-3 rounded-lg"
//           >
//             🎓 Student Dashboard
//           </button>
//         )}

//         {role === "instructor" && (
//           <button
//             onClick={() => navigate("/instructor-dashboard")}
//             className="bg-[#111827] hover:bg-yellow-400 hover:text-black text-white px-4 py-3 rounded-lg"
//           >
//             👨‍🏫 Instructor Dashboard
//           </button>
//         )}

//         <button
//           onClick={() => navigate("/profile")}
//           className="bg-[#111827] hover:bg-yellow-400 hover:text-black text-white px-4 py-3 rounded-lg"
//         >
//           👤 Profile
//         </button>

//         <button
//           onClick={() => navigate("/edit-profile")}
//           className="bg-[#111827] hover:bg-yellow-400 hover:text-black text-white px-4 py-3 rounded-lg"
//         >
//           ✏️ Edit Profile
//         </button>

//         <hr className="border-gray-600 my-2" />

//         <button
//           onClick={handleLogout}
//           className="bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-lg"
//         >
//           🚪 Logout
//         </button>

//       </div>

//     </div>
//   );
// }