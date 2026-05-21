export default function Footer() {
    return (
      <footer className="w-full bg-[#1F2937] text-white px-4 md:px-10 pt-16 pb-6">
        {/* TOP SECTION */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
  
          {/* BRAND */}
          <div>
            <h2 className="text-yellow-400 font-bold text-xl mb-4">
              Learnify
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Learn from the best instructors around the world.
              Build your skills and grow your career with us.
            </p>
          </div>
  
          {/* COMPANY */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li className="hover:text-yellow-400 cursor-pointer">Home</li>
              <li className="hover:text-yellow-400 cursor-pointer">About Us</li>
              <li className="hover:text-yellow-400 cursor-pointer">Courses</li>
              <li className="hover:text-yellow-400 cursor-pointer">Contact</li>
            </ul>
          </div>
  
          {/* RESOURCES */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li className="hover:text-yellow-400 cursor-pointer">Help Center</li>
              <li className="hover:text-yellow-400 cursor-pointer">Privacy Policy</li>
              <li className="hover:text-yellow-400 cursor-pointer">Terms & Conditions</li>
            </ul>
          </div>
  
          {/* CONTACT */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <p className="text-gray-400 text-sm">Email: support@Learnify.com</p>
            <p className="text-gray-400 text-sm mt-2">Phone: +91 98765 43210</p>
          </div>
  
        </div>
  
        {/* BOTTOM */}
        <div className="border-t border-gray-700 mt-10 pt-4 text-center text-gray-500 text-sm">
          © 2026 Learnify. All rights reserved.
        </div>
  
      </footer>
    );
  }