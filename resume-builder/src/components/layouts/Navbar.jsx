import React from "react";
import ProfileInfoCard from "../Cards/ProfileInfoCard";
import { Link } from "react-router-dom";
import { FiEdit3 } from "react-icons/fi";

const Navbar = () => {
  return <div className="sticky top-0 z-40 bg-white/70 backdrop-blur-xl border-b border-gray-200/50 shadow-sm">
    <div className="container mx-auto px-4 h-16 flex items-center justify-between">
      <Link to='/dashboard' className="flex items-center gap-2 group">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
          <FiEdit3 className="text-white text-lg" />
        </div>
        <h2 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
          ResumeBuilder
        </h2>
      </Link>

      <ProfileInfoCard />
    </div>
  </div>
};

export default Navbar;
