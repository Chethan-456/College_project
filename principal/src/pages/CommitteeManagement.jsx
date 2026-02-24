import React, { useState } from "react";

const committeesData = [
  {
    name: "Academic Council",
    category: "Academic",
    convener: "Dr. Sunita Mehta",
    department: "Administration",
    phone: "+91 98765 43210",
    email: "academic.council@college.edu",
    meeting: "Monthly - First Monday",
    members: 12,
    description: "Academic policy formulation and curriculum oversight",
    color: "border-blue-500",
  },
  {
    name: "Admission Committee",
    category: "Administrative",
    convener: "Dr. Rajesh Kumar",
    department: "BCA",
    phone: "+91 98765 43211",
    email: "admissions@college.edu",
    meeting: "Weekly during admission season",
    members: 8,
    description: "Student admission process and eligibility verification",
    color: "border-gray-500",
  },
  {
    name: "Examination Committee",
    category: "Academic",
    convener: "Dr. Priya Sharma",
    department: "BCOM",
    phone: "+91 98765 43212",
    email: "examinations@college.edu",
    meeting: "Bi-weekly",
    members: 10,
    description: "Examination scheduling and evaluation oversight",
    color: "border-blue-600",
  },
  {
    name: "Internship Committee",
    category: "Career",
    convener: "Prof. Ashok Tiwari",
    department: "BBA",
    phone: "+91 98765 43234",
    email: "internship@college.edu",
    meeting: "Bi-weekly",
    members: 9,
    description: "Student internship coordination and monitoring",
    color: "border-orange-500",
  },
  {
    name: "Innovation Committee",
    category: "Academic",
    convener: "Dr. Techno Geek",
    department: "BCA",
    phone: "+91 98765 43235",
    email: "innovation@college.edu",
    meeting: "Monthly",
    members: 7,
    description: "Innovation projects and startup incubation",
    color: "border-indigo-500",
  },
  {
    name: "Media Committee",
    category: "Communication",
    convener: "Prof. Ravi Journalist",
    department: "General",
    phone: "+91 98765 43236",
    email: "media@college.edu",
    meeting: "Weekly",
    members: 8,
    description: "College media relations and publicity",
    color: "border-teal-500",
  },
];

const CommitteeCard = ({ committee }) => (
  <div
    className={`bg-white rounded-xl shadow border-t-4 ${committee.color} p-6 hover:shadow-lg transition`}
  >
    <div className="flex justify-between items-start">
      <div>
        <h2 className="text-lg font-semibold">{committee.name}</h2>
        <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
          {committee.category}
        </span>
      </div>
      <span className="text-yellow-500 text-sm">★ Active</span>
    </div>

    <div className="bg-gray-50 rounded-lg p-4 mt-4 text-sm">
      <p className="font-medium">Convener</p>
      <p>{committee.convener}</p>
      <p className="text-gray-500">{committee.department}</p>
    </div>

    <div className="text-sm mt-4 space-y-1 text-gray-600">
      <p>📞 {committee.phone}</p>
      <p>✉ {committee.email}</p>
      <p>🗓 {committee.meeting}</p>
    </div>

    <div className="flex justify-between items-center mt-4 text-sm">
      <span className="text-gray-500">
        Members
      </span>
      <span className="bg-gray-200 px-2 py-1 rounded-full text-xs">
        {committee.members}
      </span>
    </div>

    <p className="text-xs text-gray-500 mt-3">
      {committee.description}
    </p>
  </div>
);

export default function CommitteeManagement() {
  const [category, setCategory] = useState("All Categories");
  const [search, setSearch] = useState("");

  const filteredCommittees = committeesData.filter((c) => {
    const matchesCategory =
      category === "All Categories" || c.category === category;
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-gray-100 min-h-screen p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <div>
          <h1 className="text-xl font-semibold text-gray-700">
            Committee Management
          </h1>
          <p className="text-sm text-gray-400">
            Manage all college committees and convenors
          </p>
        </div>
        <button className="bg-gray-200 px-4 py-2 rounded-lg text-sm">
          {filteredCommittees.length} Committees
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Search committees..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border rounded-lg px-4 py-2 bg-white shadow-sm"
        >
          <option>All Categories</option>
          <option>Academic</option>
          <option>Administrative</option>
          <option>Career</option>
          <option>Communication</option>
        </select>

        <button className="bg-gray-200 px-4 py-2 rounded-lg">
          Filter
        </button>
      </div>

      {/* Committee Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {filteredCommittees.map((committee, index) => (
          <CommitteeCard key={index} committee={committee} />
        ))}
      </div>

      {/* Statistics */}
      <div className="bg-white rounded-xl shadow p-6 mt-8">
        <h3 className="font-semibold mb-4">
          Committee Statistics
        </h3>

        <div className="grid md:grid-cols-4 gap-6 text-center">
          <div>
            <h2 className="text-2xl font-bold text-blue-600">
              27
            </h2>
            <p className="text-sm text-gray-500">
              Total Committees
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-green-600">
              223
            </h2>
            <p className="text-sm text-gray-500">
              Total Members
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-purple-600">
              8
            </h2>
            <p className="text-sm text-gray-500">
              Categories
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-orange-500">
              100%
            </h2>
            <p className="text-sm text-gray-500">
              Active Status
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}