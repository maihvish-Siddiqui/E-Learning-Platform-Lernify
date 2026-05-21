import { useNavigate } from "react-router-dom"; 
import aboutImg from "../assets/about.png";
export default function About() {
    const navigate = useNavigate();
    return (
      <div className="w-full pt-20">
  
        {/* HERO SECTION */}
        <section className="bg-[#0B1120] text-white py-16 px-6 text-center">
          <h1 className="text-3xl md:text-4xl font-bold">
            About Learnify
          </h1>
          <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
            Learn new skills, advance your career, and achieve your goals with our
            expert-led courses and modern learning platform.
          </p>
        </section>
  
        {/* ABOUT CONTENT */}
        <section className="py-16 px-6 max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
  
          {/* LEFT IMAGE */}
          <div className="w-full md:w-1/2">
            <img
              src={aboutImg}
              alt="about"
              className="rounded-xl shadow-lg w-full"
            />
          </div>
  
          {/* RIGHT TEXT */}
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl font-bold mb-4">
              Who We Are
            </h2>
            <p className="text-gray-600 mb-4">
              CodeHub is an online learning platform designed to help students and
              professionals gain in-demand skills. We connect learners with
              industry experts to provide high-quality education.
            </p>
  
            <p className="text-gray-600">
              Whether you are a beginner or an experienced professional, our
              courses are tailored to help you grow, learn, and succeed in your
              career.
            </p>
          </div>
  
        </section>
  
        {/* FEATURES SECTION */}
        <section className="bg-gray-100 py-16 px-6">
          <h2 className="text-2xl font-bold text-center mb-10">
            Why Choose Us
          </h2>
  
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
  
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-semibold mb-2">Expert Instructors</h3>
              <p className="text-gray-600 text-sm">
                Learn from industry professionals with real-world experience.
              </p>
            </div>
  
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-semibold mb-2">Flexible Learning</h3>
              <p className="text-gray-600 text-sm">
                Study at your own pace, anytime and anywhere.
              </p>
            </div>
  
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-semibold mb-2">Career Growth</h3>
              <p className="text-gray-600 text-sm">
                Gain skills that help you grow in your career.
              </p>
            </div>
  
          </div>
        </section>
  
        {/* CTA SECTION */}
        <section className="py-16 text-center">
          <h2 className="text-2xl font-bold">
            Start Your Learning Journey Today
          </h2>
            
          <button onClick={() => navigate("/signup")}
          className="mt-6 bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500">
            Get Started
          </button>
        </section>
  
      </div>
    );
  }