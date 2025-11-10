
"use client";
import React from "react";
import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-white via-blue-50 to-blue-100 dark:from-[#050A1F] dark:via-[#0A1438] dark:to-[#0B112A] text-gray-800 dark:text-gray-300 transition-colors duration-700">
      {/* Animated background gradient in dark mode */}
      <div className="absolute inset-0 hidden dark:block bg-gradient-to-tr from-blue-500/20 via-purple-600/20 to-indigo-500/20 blur-3xl animate-pulse opacity-40" />

      {/* Decorative Wave Divider */}
      <svg
        className="absolute -top-1 left-0 w-full text-blue-100 dark:text-[#0a1333]"
        viewBox="0 0 1440 100"
        fill="currentColor"
      >
        <path d="M0,32L80,58.7C160,85,320,139,480,154.7C640,171,800,149,960,122.7C1120,96,1280,64,1360,48L1440,32V0H0Z" />
      </svg>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 z-10">
        {/* Brand Info */}
        <div className="space-y-5">
          <h3 className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-Poppins">
            ELearning LMS
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            Empowering learners worldwide with next-generation courses and
            industry-leading mentors to help shape your future.
          </p>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <FaEnvelope className="text-blue-500 dark:text-blue-400" />
              <span>support@elearning.com</span>
            </div>
            <div className="flex items-center gap-2">
              <FaPhone className="text-blue-500 dark:text-blue-400" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-blue-500 dark:text-blue-400" />
              <span>123 Education St, Learning City</span>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4 relative after:content-[''] after:w-10 after:h-[2px] after:bg-blue-500 after:absolute after:-bottom-1 after:left-0">
            Quick Links
          </h4>
          <ul className="space-y-2 text-sm">
            {[
              ["All Courses", "/courses"],
              ["Categories", "/categories"],
              ["Become an Instructor", "/instructors"],
              ["Pricing Plans", "/pricing"],
              ["Blog", "/blog"],
            ].map(([label, href]) => (
              <li key={href}>
                <Link
                  href={href}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-lg font-semibold mb-4 relative after:content-[''] after:w-10 after:h-[2px] after:bg-blue-500 after:absolute after:-bottom-1 after:left-0">
            Company
          </h4>
          <ul className="space-y-2 text-sm">
            {[
              ["Our Story", "/about"],
              ["Careers", "/careers"],
              ["Contact Us", "/contact"],
              ["FAQ", "/faq"],
              ["Help Center", "/help"],
            ].map(([label, href]) => (
              <li key={href}>
                <Link
                  href={href}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-lg font-semibold mb-4 relative after:content-[''] after:w-10 after:h-[2px] after:bg-blue-500 after:absolute after:-bottom-1 after:left-0">
            Stay Connected
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Join our newsletter for updates, offers, and the latest eLearning
            insights.
          </p>
          <div className="flex items-center mb-6">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-3 py-2 rounded-l-md bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-r-md transition-all">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-200 dark:border-gray-800 relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-5">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()}{" "}
            <span className="text-blue-600 dark:text-blue-400 font-semibold">
              ELearning
            </span>
            . All rights reserved.
          </p>

          {/* Socials */}
          <div className="flex gap-4">
            {[
              [FaFacebookF, "https://facebook.com"],
              [FaTwitter, "https://twitter.com"],
              [FaInstagram, "https://instagram.com"],
              [FaLinkedinIn, "https://linkedin.com"],
              [FaYoutube, "https://youtube.com"],
            ].map(([Icon, href], i) => (
              <Link
                key={i}
                href={href as string}
                target="_blank"
                className="p-2 bg-white/10 dark:bg-gray-800 rounded-full hover:scale-110 hover:text-blue-400 transition-transform duration-300"
              >
                <Icon className="w-5 h-5" />
              </Link>
            ))}
          </div>

          {/* Back to top */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-sm text-gray-700 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1 transition-all"
          >
            <span>Back to Top</span>
            <svg
              className="w-4 h-4 animate-bounce"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
