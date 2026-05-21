import { useNavigate } from "react-router-dom";
import learningImg from "../assets/learning.png";
import instructorImg from "../assets/instructor.png";

export default function Home() {

  const navigate = useNavigate();

  return (
    <>

      {/* HERO SECTION */}
      <section className="min-h-screen bg-[#0B1120] text-white flex flex-col justify-center items-center text-center px-4 md:px-6 pt-20">

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 max-w-4xl leading-tight">
          Empower Your Future With Coding Skills
        </h1>

        <button
          onClick={() => navigate("/signup")}
          className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold transition"
        >
          Signup
        </button>

      </section>


      {/* ===== SKILLS SECTION ===== */}
      <section className="bg-gray-100 py-16 md:py-20 px-4 md:px-12">

        {/* TITLE */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 max-w-4xl mx-auto">
          Get the Skills you need for a Job that is in demand.
        </h2>

        {/* CONTENT */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">

          {/* LEFT SIDE */}
          <div className="flex flex-col gap-8 max-w-2xl">

            {/* ITEM */}
            <div className="flex gap-4">

              <div className="text-blue-500 text-2xl">
                ●
              </div>

              <div>
                <h3 className="font-semibold text-lg">
                  Leadership
                </h3>

                <p className="text-gray-600 mt-1 text-sm leading-6">
                  Demonstrating leadership qualities, taking initiative, and being proactive in identifying opportunities
                </p>
              </div>

            </div>


            {/* ITEM */}
            <div className="flex gap-4">

              <div className="text-pink-500 text-2xl">
                ●
              </div>

              <div>
                <h3 className="font-semibold text-lg">
                  Problem-Solving Abilities
                </h3>

                <p className="text-gray-600 mt-1 text-sm leading-6">
                  This includes critical thinking, analytical reasoning, and the ability to approach problems systematically
                </p>
              </div>

            </div>


            {/* ITEM */}
            <div className="flex gap-4">

              <div className="text-green-500 text-2xl">
                ●
              </div>

              <div>
                <h3 className="font-semibold text-lg">
                  Communication Skills
                </h3>

                <p className="text-gray-600 mt-1 text-sm leading-6">
                  Effective communication skills, both verbal and written, are essential for collaborating with team members
                </p>
              </div>

            </div>


            {/* ITEM */}
            <div className="flex gap-4">

              <div className="text-yellow-500 text-2xl">
                ●
              </div>

              <div>
                <h3 className="font-semibold text-lg">
                  Teamwork and Collaboration
                </h3>

                <p className="text-gray-600 mt-1 text-sm leading-6">
                  Working effectively in a team environment is often essential for completing projects successfully
                </p>
              </div>

            </div>

          </div>


          {/* RIGHT IMAGE */}
          <div className="w-full max-w-xl">

            <img
              src={learningImg}
              alt="learning"
              className="w-full h-[250px] sm:h-[300px] md:h-[350px] object-cover rounded-2xl shadow-xl"
            />

          </div>

        </div>


        {/* BUTTON */}
        <div className="flex justify-center mt-14">

          <button
            onClick={() => navigate("/signup")}
            className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-3 rounded-lg font-semibold transition"
          >
            Learn More
          </button>

        </div>

      </section>



      {/* ===== INSTRUCTOR SECTION ===== */}
      <section className="bg-[#0B1120] py-16 md:py-20 px-4 md:px-16">

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-14">

          {/* LEFT IMAGE */}
          <div className="flex-1 flex justify-center">

            <img
              src={instructorImg}
              alt="Instructor"
              className="w-full max-w-md object-contain"
            />

          </div>


          {/* RIGHT CONTENT */}
          <div className="flex-1 max-w-xl">

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Become an Instructor
            </h2>

            <p className="text-gray-400 leading-8 mb-8">
              Instructors from around the world teach millions of students.
              We provide the tools and skills to teach what you love and help
              learners grow their careers.
            </p>

            <button
              onClick={() => navigate("/signup")}
              className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-3 rounded-full font-semibold transition"
            >
              Start Learning Today
            </button>

          </div>

        </div>

      </section>

    </>
  );
}