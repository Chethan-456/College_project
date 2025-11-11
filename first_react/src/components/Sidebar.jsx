import React from "react";
import { Mail, Phone, MapPin, Hash, GraduationCap, Calendar, Droplet } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="w-80 flex-shrink-0 min-h-screen flex flex-col shadow-md">
      {/* 🔹 Top Profile Section with Gradient */}
      <div className="bg-gradient-to-r from-[#4f46e5] to-[#9333ea] text-white p-6 text-center">
        <img
          src="https://via.placeholder.com/80"
          alt="Profile"
          className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-white"
        />
        <h2 className="text-lg font-semibold">Priya Reddy</h2>
        <p className="text-sm opacity-90">Bachelor of Commerce</p>
        <span className="mt-2 inline-block bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
          STU2024002
        </span>
      </div>

      {/* 🔸 Bottom White Details Section */}
      <div className="bg-white flex-1 text-gray-800 p-6 space-y-6">
        {/* Personal Info */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
            Personal Information
          </h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center space-x-2">
              <Hash size={16} className="text-indigo-500" />
              <span>STU2024002</span>
            </li>
            <li className="flex items-center space-x-2">
              <Mail size={16} className="text-indigo-500" />
              <span>priya.reddy@student.college.edu</span>
            </li>
            <li className="flex items-center space-x-2">
              <Phone size={16} className="text-indigo-500" />
              <span>+91 9876543210</span>
            </li>
            <li className="flex items-center space-x-2">
              <MapPin size={16} className="text-indigo-500" />
              <span>Student Hostel, College Campus</span>
            </li>
          </ul>
        </div>

        {/* Academic Details */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
            Academic Details
          </h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center space-x-2">
              <GraduationCap size={16} className="text-indigo-500" />
              <span>1st Year | CGPA: 8.45</span>
            </li>
            <li className="flex items-center space-x-2">
              <Calendar size={16} className="text-indigo-500" />
              <span>2022 - 2026</span>
            </li>
          </ul>
        </div>

        {/* Family Details */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
            Family Details
          </h3>
          <ul className="text-sm space-y-2">
            <li>
              Father’s Name: <span className="font-semibold text-gray-900">Father Name</span>
            </li>
            <li>
              Mother’s Name: <span className="font-semibold text-gray-900">Mother Name</span>
            </li>
            <li>
              Blood Group: <span className="font-semibold text-gray-900">B+</span>
            </li>
            <li>
              Category: <span className="font-semibold text-gray-900">General</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
