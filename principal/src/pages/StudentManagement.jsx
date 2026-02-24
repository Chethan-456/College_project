import React, { useState } from "react";

const studentsData = [
  {
    name: "Arjun Sharma",
    roll: "BCA001",
    department: "BCA",
    year: "3rd Year",
    cgpa: 8.5,
    attendance: 92,
    phone: "+91 98765 10001",
    email: "arjun.sharma@student.college.edu",
    address: "123 Main Street, Delhi",
    father: "Rajesh Sharma",
    mother: "Sunita Sharma",
    paid: 45000,
    pending: 0,
    grade: "B+",
    border: "border-blue-500",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Priya Patel",
    roll: "BCOM002",
    department: "BCOM",
    year: "2nd Year",
    cgpa: 7.8,
    attendance: 88,
    phone: "+91 98765 10002",
    email: "priya.patel@student.college.edu",
    address: "456 Park Avenue, Mumbai",
    father: "Vikram Patel",
    mother: "Kavita Patel",
    paid: 20000,
    pending: 15000,
    grade: "C+",
    border: "border-green-500",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Rahul Singh",
    roll: "BBA003",
    department: "BBA",
    year: "1st Year",
    cgpa: 8.2,
    attendance: 95,
    phone: "+91 98765 10003",
    email: "rahul.singh@student.college.edu",
    address: "789 College Road, Bangalore",
    father: "Suresh Singh",
    mother: "Rekha Singh",
    paid: 25000,
    pending: 15000,
    grade: "A+",
    border: "border-purple-500",
    image: "https://randomuser.me/api/portraits/men/55.jpg",
  },
  {
    name: "Vikram Shastri",
    roll: "SAN013",
    department: "Sanskrit",
    year: "3rd Year",
    cgpa: 9.2,
    attendance: 98,
    phone: "+91 98765 10013",
    email: "vikram@student.college.edu",
    address: "Varanasi, India",
    father: "Pandit Ramesh Shastri",
    mother: "Shubha Shastri",
    paid: 20000,
    pending: 0,
    grade: "A",
    border: "border-indigo-500",
    image: "https://randomuser.me/api/portraits/men/60.jpg",
  },
  {
    name: "Divya Acharya",
    roll: "SAN014",
    department: "Sanskrit",
    year: "1st Year",
    cgpa: 8.9,
    attendance: 99,
    phone: "+91 98765 10014",
    email: "divya@student.college.edu",
    address: "Rishikesh, India",
    father: "Guru Mahesh Acharya",
    mother: "Bharti Acharya",
    paid: 10000,
    pending: 10000,
    grade: "B",
    border: "border-pink-500",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
];

const StudentCard = ({ student }) => {
  const total = student.paid + student.pending;

  return (
    <div className={`bg-white rounded-xl shadow border-t-4 ${student.border} p-6 hover:shadow-lg transition`}>

      {/* Header with Photo */}
      <div className="flex justify-between items-start">
        <div className="flex gap-3">
          <img
            src={student.image}
            alt={student.name}
            className="w-14 h-14 rounded-full object-cover border"
          />
          <div>
            <h2 className="text-lg font-semibold">{student.name}</h2>
            <p className="text-xs text-gray-500">{student.roll}</p>
            <div className="flex gap-2 mt-1">
              <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                {student.department}
              </span>
              <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                {student.year}
              </span>
            </div>
          </div>
        </div>

        <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">
          active
        </span>
      </div>

      {/* CGPA & Attendance */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="bg-gray-100 rounded-lg p-4 text-center">
          <h3 className="text-blue-600 font-bold">{student.cgpa}</h3>
          <p className="text-xs text-gray-500">CGPA</p>
        </div>
        <div className="bg-green-50 rounded-lg p-4 text-center">
          <h3 className="text-green-600 font-bold">
            {student.attendance}%
          </h3>
          <p className="text-xs text-gray-500">Attendance</p>
        </div>
      </div>

      {/* Contact */}
      <div className="text-sm mt-4 space-y-1 text-gray-600">
        <p>📞 {student.phone}</p>
        <p>✉ {student.email}</p>
        <p>📍 {student.address}</p>
      </div>

      {/* Family */}
      <div className="bg-gray-50 rounded-lg p-4 mt-4 text-sm">
        <p className="font-medium mb-1">Family</p>
        <p>Father: {student.father}</p>
        <p>Mother: {student.mother}</p>
      </div>

      {/* Fees */}
      <div className="grid grid-cols-3 gap-2 mt-4 text-xs text-center">
        <div className="bg-green-100 text-green-700 p-2 rounded">
          ₹{student.paid.toLocaleString()} <br /> Paid
        </div>
        <div className="bg-red-100 text-red-600 p-2 rounded">
          ₹{student.pending.toLocaleString()} <br /> Pending
        </div>
        <div className="bg-blue-100 text-blue-600 p-2 rounded">
          ₹{total.toLocaleString()} <br /> Total
        </div>
      </div>

      {/* Grade */}
      <div className="mt-4 text-sm">
        <span className="text-red-500 font-medium">● {student.grade}</span>
      </div>
    </div>
  );
};

export default function StudentManagement() {
  const [search, setSearch] = useState("");

  const filtered = studentsData.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-gray-100 min-h-screen p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-700">
            Student Management
          </h1>
          <p className="text-sm text-gray-400">
            Manage all student details and records
          </p>
        </div>
        <button className="bg-gray-200 px-4 py-2 rounded-lg text-sm">
          {filtered.length} Students
        </button>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search students..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-6 border rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
      />

      {/* Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {filtered.map((student, index) => (
          <StudentCard key={index} student={student} />
        ))}
      </div>

    </div>
  );
}