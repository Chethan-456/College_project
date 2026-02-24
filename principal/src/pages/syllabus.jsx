import React, { useState } from "react";

const InfoBox = ({ title, value, color }) => (
  <div className="flex-1 bg-gray-100 rounded-xl p-6 text-center">
    <h3 className={`text-xl font-bold ${color}`}>{value}</h3>
    <p className="text-sm text-gray-500">{title}</p>
  </div>
);

const StatCard = ({ title, value, color }) => (
  <div className="flex-1 bg-white rounded-xl shadow p-6 text-center">
    <p className="text-sm text-gray-500">{title}</p>
    <h2 className={`text-2xl font-bold ${color}`}>{value}</h2>
  </div>
);

export default function SyllabusPage() {
  const [year, setYear] = useState("1st Year");
  const [semester, setSemester] = useState("1st Semester");

  return (
    <div className="bg-gray-100 min-h-screen p-6">

      {/* Top Header */}
      <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
        <div>
          <h1 className="text-lg font-semibold text-gray-700">
            BCA Syllabus
          </h1>
          <p className="text-sm text-gray-400">
            {year} - {semester}
          </p>
        </div>

        <div className="flex gap-3">
          <button className="bg-gray-100 px-4 py-2 rounded-lg text-sm hover:bg-gray-200 transition">
            5 Subjects
          </button>
          <button className="bg-gray-100 px-4 py-2 rounded-lg text-sm hover:bg-gray-200 transition">
            Export
          </button>
        </div>
      </div>

      {/* Gradient Banner */}
      <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-teal-500 rounded-xl p-8 text-white shadow-lg">
        <h2 className="text-2xl font-semibold">
          Bachelor in Computer Applications
        </h2>
        <p className="text-sm opacity-90 mt-1">
          Academic Year 2024-25 Curriculum
        </p>

        <div className="grid grid-cols-3 gap-6 mt-8 text-center">
          <div>
            <h2 className="text-3xl font-bold">15</h2>
            <p className="text-sm opacity-80">Total Credits</p>
          </div>
          <div>
            <h2 className="text-3xl font-bold">225</h2>
            <p className="text-sm opacity-80">Total Hours</p>
          </div>
          <div>
            <h2 className="text-3xl font-bold">5</h2>
            <p className="text-sm opacity-80">Subjects</p>
          </div>
        </div>
      </div>

      {/* Dropdown Filters */}
      <div className="flex flex-wrap gap-6 mt-6 items-end">

        <div>
          <label className="block text-sm text-gray-500 mb-1">
            Year
          </label>
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="border rounded-lg px-4 py-2 bg-white shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
          >
            <option>1st Year</option>
            <option>2nd Year</option>
            <option>3rd Year</option>
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-500 mb-1">
            Semester
          </label>
          <select
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            className="border rounded-lg px-4 py-2 bg-white shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
          >
            <option>1st Semester</option>
            <option>2nd Semester</option>
            <option>3rd Semester</option>
            <option>4th Semester</option>
            <option>5th Semester</option>
            <option>6th Semester</option>
          </select>
        </div>

      </div>

      {/* Subject Card */}
      <div className="bg-white rounded-xl shadow p-6 mt-6">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div>
            <h2 className="text-xl font-semibold">
              Programming Fundamentals
            </h2>
            <p className="text-sm text-gray-500">
              Introduction to programming concepts using C language
            </p>
          </div>
          <span className="bg-blue-100 text-blue-600 text-xs px-3 py-1 rounded-full">
            Core
          </span>
        </div>

        {/* Subject Stats */}
        <div className="grid md:grid-cols-4 gap-4 mt-6">
          <InfoBox title="Credits" value="4" color="text-blue-600" />
          <InfoBox title="Total Hours" value="60" color="text-green-600" />
          <InfoBox title="Theory" value="45" color="text-purple-600" />
          <InfoBox title="Practical" value="15" color="text-orange-500" />
        </div>

        {/* Progress */}
        <div className="mt-6">
          <p className="text-sm text-gray-600 mb-2">
            Theory vs Practical Distribution
          </p>
          <div className="w-full bg-gray-200 h-3 rounded-full">
            <div className="bg-black h-3 rounded-full w-3/4"></div>
          </div>
          <p className="text-right text-xs text-gray-500 mt-1">
            75% Theory
          </p>
        </div>

        {/* Learning Objectives */}
        <div className="mt-6">
          <h3 className="font-semibold mb-2">
            Learning Objectives
          </h3>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
            <li>Understand basic programming concepts</li>
            <li>Develop problem-solving skills</li>
            <li>Learn C language syntax</li>
          </ul>
        </div>

        {/* Prerequisites */}
        <div className="mt-4">
          <h3 className="font-semibold mb-2">
            Prerequisites
          </h3>
          <span className="bg-yellow-100 text-yellow-700 text-xs px-3 py-1 rounded-full">
            Basic Mathematics
          </span>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-4 gap-4 mt-6">
        <StatCard title="Total Credits" value="15" color="text-blue-600" />
        <StatCard title="Total Hours" value="225" color="text-green-600" />
        <StatCard title="Theory Hours" value="190" color="text-purple-600" />
        <StatCard title="Practical Hours" value="35" color="text-orange-500" />
      </div>

      {/* Academic Info */}
      <div className="bg-white rounded-xl shadow p-6 mt-6">
        <h3 className="font-semibold mb-4">
          Academic Information
        </h3>

        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
          <div>
            <p><strong>Semester Duration:</strong> 6 months</p>
            <p><strong>Teaching Weeks:</strong> 18 weeks</p>
            <p><strong>Examination Period:</strong> 2 weeks</p>
          </div>
          <div>
            <p><strong>Assessment Pattern:</strong> Continuous + Final</p>
            <p><strong>Passing Criteria:</strong> 40% minimum</p>
            <p><strong>Credit System:</strong> Choice Based</p>
          </div>
        </div>
      </div>

    </div>
  );
}