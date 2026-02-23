import React, { useState } from "react";
import {
  FiArrowLeft,
  FiSearch,
  FiFilter,
  FiPhone,
  FiMail,
  FiCalendar,
  FiUsers,
  FiStar,
} from "react-icons/fi";

const categories = [
  "All Categories",
  "Academic",
  "Administrative",
  "Welfare",
  "Extracurricular",
  "Career",
  "Technical",
  "Networking",
  "Communication",
];

const committeeData = [
  {
    id: 1,
    title: "Academic Council",
    category: "Academic",
    color: "#2563eb", // Blue
    icon: (
      <svg
        width="24"
        height="24"
        fill="#2563eb"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        style={{ borderRadius: 6, backgroundColor: "#e0e7ff", padding: 4 }}
      >
        <rect width="24" height="24" rx="6" fill="#2563eb" />
      </svg>
    ),
    convenor: "Dr. Sunita Mehta",
    convenorDept: "Administration",
    phone: "+91 98765 43210",
    email: "academic.council@college.edu",
    schedule: "Monthly - First Monday",
    membersCount: 12,
    description: "Academic policy formulation and curriculum oversight",
    status: "Active",
  },
  {
    id: 2,
    title: "Admission Committee",
    category: "Administrative",
    color: "#4b5563", // Gray
    icon: (
      <svg
        width="24"
        height="24"
        fill="#4b5563"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        style={{ borderRadius: 6, backgroundColor: "#e0e0e0", padding: 4 }}
      >
        <rect width="24" height="24" rx="6" fill="#4b5563" />
      </svg>
    ),
    convenor: "Dr. Rajesh Kumar",
    convenorDept: "BCA",
    phone: "+91 98765 43211",
    email: "admissions@college.edu",
    schedule: "Weekly during admission season",
    membersCount: 8,
    description: "Student admission process and eligibility verification",
    status: "Active",
  },
  {
    id: 3,
    title: "Examination Committee",
    category: "Academic",
    color: "#2563eb",
    icon: (
      <svg
        width="24"
        height="24"
        fill="#2563eb"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        style={{ borderRadius: 6, backgroundColor: "#e0e7ff", padding: 4 }}
      >
        <rect width="24" height="24" rx="6" fill="#2563eb" />
      </svg>
    ),
    convenor: "Dr. Priya Sharma",
    convenorDept: "BCOM",
    phone: "+91 98765 43212",
    email: "examinations@college.edu",
    schedule: "Bi-weekly",
    membersCount: 6,
    description: "Examination scheduling and evaluation oversight",
    status: "Active",
  },
  {
    id: 4,
    title: "Internship Committee",
    category: "Career",
    color: "#f97316", // Orange
    icon: (
      <svg
        width="24"
        height="24"
        fill="#f97316"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        style={{ borderRadius: 6, backgroundColor: "#fee7d3", padding: 4 }}
      >
        <rect width="24" height="24" rx="6" fill="#f97316" />
      </svg>
    ),
    convenor: "Prof. Ashok Tiwari",
    convenorDept: "BBA",
    phone: "+91 98765 43234",
    email: "internship@college.edu",
    schedule: "Bi-weekly",
    membersCount: 9,
    description: "Student internship coordination and monitoring",
    status: "Active",
  },
  {
    id: 5,
    title: "Innovation Committee",
    category: "Academic",
    color: "#2563eb",
    icon: (
      <svg
        width="24"
        height="24"
        fill="#2563eb"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        style={{ borderRadius: 6, backgroundColor: "#e0e7ff", padding: 4 }}
      >
        <rect width="24" height="24" rx="6" fill="#2563eb" />
      </svg>
    ),
    convenor: "Dr. Techno Geek",
    convenorDept: "BCA",
    phone: "+91 98765 43235",
    email: "innovation@college.edu",
    schedule: "Monthly",
    membersCount: 7,
    description: "Innovation projects and startup incubation",
    status: "Active",
  },
  {
    id: 6,
    title: "Media Committee",
    category: "Communication",
    color: "#14b8a6", // Teal
    icon: (
      <svg
        width="24"
        height="24"
        fill="#14b8a6"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        style={{ borderRadius: 6, backgroundColor: "#d1faf6", padding: 4 }}
      >
        <rect width="24" height="24" rx="6" fill="#14b8a6" />
      </svg>
    ),
    convenor: "Prof. Ravi Journalist",
    convenorDept: "General",
    phone: "+91 98765 43236",
    email: "media@college.edu",
    schedule: "Weekly",
    membersCount: 8,
    description: "College media relations and publicity",
    status: "Active",
  },
];

const statistics = [
  {
    label: "Total Committees",
    value: 27,
    color: "#2563eb",
  },
  {
    label: "Total Members",
    value: 223,
    color: "#22c55e",
  },
  {
    label: "Categories",
    value: 8,
    color: "#a855f7",
  },
  {
    label: "Active Status",
    value: "100%",
    color: "#f97316",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        stroke="#f97316"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="feather feather-message-circle"
      >
        <path d="M21 11.5a8.38 8.38 0 0 1-15.5 4.5v-10a8.38 8.38 0 0 1 15.5 4.5z" />
      </svg>
    ),
  },
];

export default function CommitteeManagement() {
  const [filter, setFilter] = useState("All Categories");
  const filteredData =
    filter === "All Categories"
      ? committeeData
      : committeeData.filter((c) => c.category === filter);

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", padding: 20, backgroundColor: "#f9fafb" }}>
      {/* Header */}
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <FiArrowLeft size={20} />
          <div>
            <h1 style={{ margin: 0, fontWeight: 600, fontSize: 18, color: "#111827" }}>
              Committee Management
            </h1>
            <p style={{ margin: 0, fontSize: 12, color: "#6b7280" }}>
              Manage all college committees and convenors
            </p>
          </div>
        </div>
        <div
          style={{
            border: "1px solid #d1d5db",
            borderRadius: 12,
            padding: "4px 12px",
            fontSize: 12,
            fontWeight: 500,
            color: "#6b7280",
            userSelect: "none",
          }}
        >
          27 Committees
        </div>
      </header>

      {/* Search & Filter */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 12,
          backgroundColor: "#f3f4f6",
          borderRadius: 6,
          padding: "6px 12px",
          fontSize: 14,
          color: "#6b7280",
        }}
      >
        <FiSearch size={16} />
        <input
          type="text"
          placeholder="Search committees, convenors, or departments..."
          style={{
            flex: 1,
            border: "none",
            outline: "none",
            backgroundColor: "#f3f4f6",
            fontSize: 14,
            fontFamily: "inherit",
          }}
        />
        <select
          style={{
            padding: "6px 8px",
            fontSize: 14,
            borderRadius: 6,
            border: "1px solid #d1d5db",
            backgroundColor: "white",
            color: "#111827",
            cursor: "pointer",
          }}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <button
          style={{
            padding: "6px 12px",
            fontSize: 14,
            borderRadius: 6,
            border: "1px solid #d1d5db",
            backgroundColor: "white",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <FiFilter size={16} /> Filter
        </button>
      </div>

      {/* Cards grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: 16,
          marginBottom: 24,
        }}
      >
        {filteredData.map((committee) => (
          <div
  key={committee.id}
  style={{
  backgroundColor: "white",
  borderRadius: 3,
  boxShadow: "0 1px 3px rgb(0 0 0 / 0.1)",
  padding: 16,
  borderTop: `4px solid ${committee.color}`,  // Only top border colored
  display: "flex",
  flexDirection: "column",
  gap: 8,
}}
>
            
          
            {/* Top bar */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              {/* Icon + title */}
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {/* Custom icon container */}
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    backgroundColor: committee.color + "22",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontWeight: 700,
                    fontSize: 14,
                    color: committee.color,
                  }}
                >
                  {/* Use placeholder letter if no icon */}
                  {committee.title.charAt(0)}
                </div>
                <div>
                  <h3
                    style={{
                      margin: 0,
                      fontWeight: 700,
                      fontSize: 14,
                      color: "#111827",
                      cursor: "default",
                    }}
                    title={committee.title}
                  >
                    {committee.title}
                  </h3>
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 600,
                      backgroundColor: "#e0e0e0",
                      borderRadius: 6,
                      padding: "2px 6px",
                      color: "#4b5563",
                      userSelect: "none",
                      display: "inline-block",
                      marginTop: 2,
                    }}
                  >
                    {committee.category}
                  </span>
                </div>
              </div>
              {/* Status star */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: 12,
                  color: "#fbbf24",
                  fontWeight: 600,
                  gap: 4,
                  userSelect: "none",
                }}
              >
                <FiStar size={16} />
                <span>Active</span>
              </div>
            </div>

            {/* Convenor section */}
            <div
              style={{
                backgroundColor: "#f9fafb",
                borderRadius: 6,
                padding: 8,
                fontSize: 12,
                color: "#374151",
                display: "flex",
                flexDirection: "column",
                gap: 2,
                marginBottom: 8,
                userSelect: "none",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 4, color: "#6b7280" }}>
                <FiUsers size={14} />
                <span>Convenor</span>
              </div>
              <strong style={{ fontSize: 13, color: "#111827" }}>{committee.convenor}</strong>
              <span style={{ fontSize: 11, color: "#6b7280" }}>{committee.convenorDept}</span>
            </div>

            {/* Contact info */}
            <div style={{ fontSize: 12, color: "#6b7280", display: "flex", flexDirection: "column", gap: 4 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <FiPhone size={14} />
                <span>{committee.phone}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <FiMail size={14} />
                <span>{committee.email}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <FiCalendar size={14} />
                <span>{committee.schedule}</span>
              </div>
            </div>

            {/* Members count and description */}
            <div
              style={{
                marginTop: "auto",
                borderTop: "1px solid #e5e7eb",
                paddingTop: 8,
                display: "flex",
                justifyContent: "space-between",
                fontSize: 12,
                color: "#6b7280",
              }}
            >
              <div>
                <div style={{ fontWeight: 600 }}>Members</div>
                <div>{committee.description}</div>
              </div>
              <div
                style={{
                  backgroundColor: "#f3f4f6",
                  borderRadius: 100,
                  width: 28,
                  height: 28,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontWeight: 600,
                  color: "#4b5563",
                }}
              >
                {committee.membersCount}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Statistics */}
      <div
        style={{
          backgroundColor: "white",
          borderRadius: 8,
          padding: 20,
          display: "flex",
          justifyContent: "space-around",
          color: "#374151",
          fontSize: 12,
          userSelect: "none",
        }}
      >
        {statistics.map(({ label, value, color, icon }, i) => (
          <div
            key={label}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
              flex: "1 1 0",
              textAlign: "center",
              fontWeight: 600,
            }}
          >
            <div style={{ fontSize: 24, color }}>{value}</div>
            <div style={{ fontWeight: 400, color: "#374151" }}>{label}</div>
            {icon && <div style={{ marginTop: 6 }}>{icon}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
