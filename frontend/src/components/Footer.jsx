import { FaShieldAlt, FaGavel } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-rose-100 :bg-gray-950 text-gray-800 :text-gray-400 py-4 px-4 shadow-inner mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm sm:text-base">
        {/* Left text - Copyright */}
        <div className="mb-3 md:mb-0 text-center md:text-left">
          © {new Date().getFullYear()} <span className="font-semibold text-maroon-700 :text-yellow-400">Lost & Found</span>. All rights reserved.
        </div>

        {/* Right text - Links */}
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-center md:text-right">
          <a
            href="/privacy-policy"
            className="flex items-center gap-1 hover:text-maroon-700 :hover:text-yellow-400 transition-colors duration-200"
          >
            <FaShieldAlt className="inline-block" />
            Privacy Policy
          </a>
          <span className="hidden md:inline-block">·</span>
          <a
            href="/terms-of-service"
            className="flex items-center gap-1 hover:text-maroon-700 :hover:text-yellow-400 transition-colors duration-200"
          >
            <FaGavel className="inline-block" />
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
