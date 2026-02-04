const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      
      <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">

        {/* About Section */}
        <div>
          <h3 className="text-xl font-semibold mb-3">
            About Project
          </h3>

          <p className="text-gray-400">
            This Doctor Appointment System allows users to connect with doctors,
            book appointments and chat in real-time using modern MERN stack
            technology.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-3">
            Quick Links
          </h3>

          <ul className="space-y-2 text-gray-400">
            <li className="hover:text-white cursor-pointer">Home</li>
            <li className="hover:text-white cursor-pointer">Login</li>
            <li className="hover:text-white cursor-pointer">Signup</li>
            <li className="hover:text-white cursor-pointer">Contact</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold mb-3">
            Contact Us
          </h3>

          <p className="text-gray-400">Email: support@doctorapp.com</p>
          <p className="text-gray-400">Phone: +91 9876543210</p>
          <p className="text-gray-400">Location: India</p>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 text-center py-4 text-gray-400">
        <p>
          © {new Date().getFullYear()} Doctor Appointment System. All Rights Reserved.
        </p>
      </div>

    </footer>
  );
};

export default Footer;
