import React from "react";
import {
  ArrowLeft,
  Users,
  BookOpen,
  GraduationCap,
  Laptop,
  Landmark,
  Briefcase,
  Languages,
  Sigma,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Departments = () => {
  const navigate = useNavigate();

  const departments = [
    {
      name: "Bachelor in Computer Applications",
      desc: "Computer Science and Application Development",
      hod: "Dr. Rajesh Kumar",
      students: 180,
      faculty: 12,
      courses: 8,
      border: "from-[#56CCF2] to-[#2F80ED]",
      badge: "BCA",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      icon: Laptop,
    },
    {
      name: "Bachelor of Commerce",
      desc: "Commerce, Economics and Business Studies",
      hod: "Dr. Priya Sharma",
      students: 220,
      faculty: 15,
      courses: 10,
      border: "from-[#6FCF97] to-[#27AE60]",
      badge: "BCOM",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      icon: Landmark,
    },
    {
      name: "Bachelor of Commerce (Accounting & Finance)",
      desc: "Specialized Accounting and Financial Management",
      hod: "Dr. Amit Verma",
      students: 140,
      faculty: 8,
      courses: 7,
      border: "from-[#f7971e] to-[#ff512f]",   // orange → red gradient
      badge: "BCOM A&F",
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
      icon: Landmark,
    },
    {
      name: "Bachelor of Business Administration",
      desc: "Business Management and Administration",
      hod: "Dr. Neha Gupta",
      students: 160,
      faculty: 10,
      courses: 9,
      border: "from-[#BB6BD9] to-[#9B51E0]",
      badge: "BBA",
      iconBg: "bg-pink-100",
      iconColor: "text-pink-600",
      icon: Briefcase,
    },
    {
      name: "Department of Kannada Language & Literature",
      desc: "Kannada Language, Literature and Cultural Studies",
      hod: "Dr. Padmavathi Rao",
      students: 85,
      faculty: 6,
      courses: 5,
      border: "from-[#f7971e] to-[#ff6a00]",   // orange gradient like screenshot
      badge: "Kannada",
      iconBg: "bg-orange-100",
      badgeColor: "text-orange-600 bg-orange-50",
      icon: Languages,
},
{
  name: "Department of Hindi Language & Literature",
  desc: "Hindi Language, Literature and Linguistics",
  hod: "Dr. Ramesh Chandra Sharma",
  students: 95,
  faculty: 7,
  courses: 6,
  border: "from-[#ff5f6d] to-[#ffc371]",   // pink/red gradient
  badge: "Hindi",
  iconBg: "bg-pink-100",
  badgeColor: "text-pink-600 bg-pink-50",
  icon: Languages,
},
{
  name: "Department of Sanskrit Studies",
  desc: "Sanskrit Language, Vedic Studies and Ancient Literature",
  hod: "Dr. Vidya Shankar Mishra",
  students: 65,
  faculty: 5,
  courses: 4,
  border: "from-[#7f7fd5] to-[#86a8e7]",   // soft violet-blue like screenshot
  badge: "Sanskrit",
  iconBg: "bg-violet-100",
  badgeColor: "text-violet-600 bg-violet-50",
  icon: Languages,
},
{
  name: "Department of English Literature",
  desc: "English Language, Literature and Communication Studies",
  hod: "Dr. Margaret Thompson",
  students: 120,
  faculty: 9,
  courses: 7,
  border: "from-[#00c6ff] to-[#0072ff]",   // cyan-blue gradient
  badge: "English Literature",
  iconBg: "bg-cyan-100",
  badgeColor: "text-cyan-600 bg-cyan-50",
  icon: BookOpen,
},
{
  name: "Department of Mathematics",
  desc: "Pure and Applied Mathematics, Statistics and Data Analysis",
  hod: "Dr. Suresh Kumar Singh",
  students: 150,
  faculty: 11,
  courses: 8,
  border: "from-[#00b09b] to-[#96c93d]",   // green gradient
  badge: "Mathematics",
  iconBg: "bg-emerald-100",
  badgeColor: "text-emerald-600 bg-emerald-50",
  icon: Sigma,
},

  ];

  return (
    <div className="p-6 bg-[#f9f9f9] min-h-screen">

      {/* ✅ Header */}
      <div className="bg-[#ffffff] flex items-center gap-3 mb-5">
        <ArrowLeft
          size={20}
          className="cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <div>
          <h1 className="text-base font-semibold">Departments</h1>
          <p className="text-xs text-gray-500">
            Manage all academic departments
          </p>
        </div>
      </div>

      {/* ✅ Top Banner */}
      <div className="bg-[#f3f7ff] rounded-xl py-6 mb-5 flex flex-col items-center justify-center border border-[#eef2ff]">

  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center shadow-sm mb-3">
    <GraduationCap size={22} color="white" />
  </div>

  <p className="text-sm font-medium text-gray-800">
    Academic Departments
  </p>

  <p className="text-xs text-gray-500 mt-1">
    Select a department to view details and manage operations
  </p>
</div>

      {/* ✅ Cards */}
      <div className="flex flex-col gap-4">
        {departments.map((dept) => {
  const Icon = dept.icon;

  return (

          <div
            key={dept.name}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
          >
            {/* Top Border */}
            <div className={`h-1 bg-linear-to-r ${dept.border}`} />

            <div className="p-5">

  {/* Top Row */}
  <div className="flex justify-between items-start">

    <div className="flex gap-3">
      <div className={`${dept.iconBg} w-10 h-10 rounded-lg flex items-center justify-center`}>
  <Icon size={18} className={dept.iconColor} />

</div>


      <div>
        <h3 className="text-sm font-semibold">{dept.name}</h3>
        <p className="text-xs text-gray-500 mt-1">{dept.desc}</p>
        <p className="text-xs text-gray-400 mt-2">
          HOD: {dept.hod}
        </p>
      </div>
    </div>

    {/* Badge */}
    <div className={`text-xs font-medium px-3 py-1 rounded-full ${dept.badgeColor}`}>
      {dept.badge}
    </div>
  </div>

  {/* Stats Row */}
  <div className="flex justify-around mt-5 text-xs">

    <div className="flex flex-col items-center text-gray-600">
      <Users size={16} className="mb-1" />
      <span className="font-medium">{dept.students}</span>
      <span className="text-gray-400 text-[11px]">Students</span>
    </div>

    <div className="flex flex-col items-center text-gray-600">
      <GraduationCap size={16} className="mb-1" />
      <span className="font-medium">{dept.faculty}</span>
      <span className="text-gray-400 text-[11px]">Faculty</span>
    </div>

    <div className="flex flex-col items-center text-gray-600">
      <BookOpen size={16} className="mb-1" />
      <span className="font-medium">{dept.courses}</span>
      <span className="text-gray-400 text-[11px]">Courses</span>
          </div>
        </div>
      </div>
    </div>
  );
})}
      </div>

      {/* ✅ Bottom Summary */}
      <div className="grid grid-cols-3 gap-4 mt-7">
        <div className="bg-white rounded-xl p-4 shadow-sm text-center">
          <p className="text-xs text-gray-400">Total Departments</p>
          <p className="text-lg font-semibold text-blue-600">9</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm text-center">
          <p className="text-xs text-gray-400">Total Students</p>
          <p className="text-lg font-semibold text-green-600">1215</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm text-center">
          <p className="text-xs text-gray-400">Total Faculty</p>
          <p className="text-lg font-semibold text-purple-600">83</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm text-center">
          <p className="text-xs text-gray-400">Total Courses</p>
          <p className="text-lg font-semibold text-orange-600">64</p>
        </div>
      </div>
    </div>
  );
};

export default Departments;