import React, { useState } from "react";

const studentsData = [
  {
    id: 1,
    name: "Arjun Sharma",
    roll: "BCA001",
    year: "3rd Year",
    dept: "BCA",
    deptColor: "#2563EB", // blue
    cgpa: 8.5,
    attendance: 92,
    phone: "+91 98765 10001",
    email: "arjun.sharma@student.college.edu",
    address: "123 Main Street, Delhi",
    dob: "5/15/2003",
    family: {
      father: "Rajesh Sharma",
      mother: "Sunita Sharma",
      phone: "+91 98765 20001",
    },
    fees: { paid: 45000, pending: 0, total: 45000 },
    bloodGroup: "B+",
    status: "active",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 2,
    name: "Priya Patel",
    roll: "BCOM002",
    year: "2nd Year",
    dept: "BCOM",
    deptColor: "#16A34A", // green
    cgpa: 7.8,
    attendance: 88,
    phone: "+91 98765 10002",
    email: "priya.patel@student.college.edu",
    address: "456 Park Avenue, Mumbai",
    dob: "3/22/2004",
    family: {
      father: "Vikram Patel",
      mother: "Kavita Patel",
      phone: "+91 98765 20002",
    },
    fees: { paid: 20000, pending: 15000, total: 35000 },
    bloodGroup: "O+",
    status: "active",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 3,
    name: "Rahul Singh",
    roll: "BBA003",
    year: "1st Year",
    dept: "BBA",
    deptColor: "#8B5CF6", // purple
    cgpa: 8.2,
    attendance: 95,
    phone: "+91 98765 10003",
    email: "rahul.singh@student.college.edu",
    address: "789 College Road, Bangalore",
    dob: "1/10/2005",
    family: {
      father: "Suresh Singh",
      mother: "Rekha Singh",
      phone: "+91 98765 20003",
    },
    fees: { paid: 25000, pending: 15000, total: 40000 },
    bloodGroup: "A+",
    status: "active",
    img: "https://randomuser.me/api/portraits/men/65.jpg",
  },
  {
    id: 4,
    name: "Vikram Shastri",
    roll: "SAN013",
    year: "3rd Year",
    dept: "Sanskrit",
    deptColor: "#8B5CF6", // purple
    cgpa: 9.2,
    attendance: 98,
    phone: "+91 98765 10013",
    email: "vikram.shastri@student.college.edu",
    address: "852 Gurukul Society, Varanasi",
    dob: "1/8/2003",
    family: {
      father: "Pandit Ramesh Shastri",
      mother: "Sushma Shastri",
      phone: "+91 98765 20013",
    },
    fees: { paid: 20000, pending: 0, total: 20000 },
    bloodGroup: "A-",
    status: "active",
    img: "https://randomuser.me/api/portraits/men/43.jpg",
  },
  {
    id: 5,
    name: "Divya Acharya",
    roll: "SAN014",
    year: "1st Year",
    dept: "Sanskrit",
    deptColor: "#8B5CF6",
    cgpa: 8.9,
    attendance: 99,
    phone: "+91 98765 10014",
    email: "divya.acharya@student.college.edu",
    address: "963 Vedic Campus, Rishikesh",
    dob: "9/3/2005",
    family: {
      father: "Guru Mahesh Acharya",
      mother: "Bharati Acharya",
      phone: "+91 98765 20014",
    },
    fees: { paid: 10000, pending: 10000, total: 20000 },
    bloodGroup: "B-",
    status: "active",
    img: "https://randomuser.me/api/portraits/women/50.jpg",
  },
];

const badgeStyle = {
  fontSize: 11,
  fontWeight: "bold",
  padding: "2px 6px",
  borderRadius: 6,
  color: "white",
  display: "inline-block",
  lineHeight: 1,
};

const StudentCard = ({ student }) => {
  const {
    name,
    roll,
    year,
    dept,
    deptColor,
    cgpa,
    attendance,
    phone,
    email,
    address,
    dob,
    family,
    fees,
    bloodGroup,
    status,
    img,
  } = student;

  return (
    <div
      style={{
        width: 320,
        backgroundColor: "white",
        borderRadius: 8,
        boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
        borderTop: `4px solid ${deptColor}`,
        padding: 16,
        display: "flex",
        flexDirection: "column",
        gap: 12,
        fontFamily:
          '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen',
        fontSize: 13,
        color: "#1F2937",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <img
          src={img}
          alt={name}
          style={{ width: 40, height: 40, borderRadius: "50%" }}
        />
        <div style={{ flexGrow: 1 }}>
          <div style={{ fontWeight: 600 }}>{name}</div>
          <div
            style={{
              fontWeight: "bold",
              fontSize: 11,
              color: "#374151",
              marginTop: 2,
            }}
          >
            {roll}
          </div>
          <div style={{ marginTop: 6, display: "flex", gap: 6 }}>
            <span
              style={{
                ...badgeStyle,
                backgroundColor: deptColor,
                color: "white",
                textTransform: "uppercase",
              }}
            >
              {dept}
            </span>
            <span
              style={{
                fontSize: 11,
                padding: "2px 6px",
                borderRadius: 6,
                border: "1px solid #D1D5DB",
                color: "#4B5563",
                fontWeight: "normal",
                textTransform: "capitalize",
              }}
            >
              {year}
            </span>
          </div>
        </div>
      </div>

      {/* CGPA & Attendance */}
      <div style={{ display: "flex", gap: 12 }}>
        <div
          style={{
            flex: 1,
            backgroundColor: "#E0E7FF",
            borderRadius: 6,
            textAlign: "center",
            padding: "10px 0",
            fontWeight: "bold",
            color: "#2563EB",
          }}
        >
          {cgpa}
          <div style={{ fontWeight: 400, fontSize: 11, marginTop: 2 }}>
            CGPA
          </div>
        </div>
        <div
          style={{
            flex: 1,
            backgroundColor: attendance >= 90 ? "#DCFCE7" : "#FEE2E2",
            borderRadius: 6,
            textAlign: "center",
            padding: "10px 0",
            fontWeight: "bold",
            color: attendance >= 90 ? "#16A34A" : "#DC2626",
          }}
        >
          {attendance}%
          <div
            style={{
              fontWeight: 400,
              fontSize: 11,
              marginTop: 2,
              color: attendance >= 90 ? "#16A34A" : "#DC2626",
            }}
          >
            Attendance
          </div>
        </div>
      </div>

      {/* Contact Info */}
      <div style={{ color: "#6B7280", fontSize: 12, lineHeight: 1.4 }}>
        <div>📞 {phone}</div>
        <div>✉️ {email}</div>
        <div>🏠 {address}</div>
        <div>🎂 DOB: {dob}</div>
      </div>

      {/* Family */}
      <div
        style={{
          backgroundColor: "#E0E7FF",
          borderRadius: 6,
          padding: 10,
          fontSize: 12,
          color: "#374151",
        }}
      >
        <strong>Family</strong>
        <div>Father: {family.father}</div>
        <div>Mother: {family.mother}</div>
        <div>📞 {family.phone}</div>
      </div>

      {/* Fees */}
      <div style={{ display: "flex", gap: 8, fontSize: 12 }}>
        <div
          style={{
            flex: 1,
            backgroundColor: "#DCFCE7",
            borderRadius: 6,
            textAlign: "center",
            fontWeight: "bold",
            color: "#16A34A",
            padding: "6px 0",
          }}
        >
          ₹{fees.paid.toLocaleString()}
          <div style={{ fontWeight: "normal", fontSize: 10 }}>Paid</div>
        </div>
        <div
          style={{
            flex: 1,
            backgroundColor: "#FFEDD5",
            borderRadius: 6,
            textAlign: "center",
            fontWeight: "bold",
            color: "#F97316",
            padding: "6px 0",
          }}
        >
          ₹{fees.pending.toLocaleString()}
          <div style={{ fontWeight: "normal", fontSize: 10 }}>Pending</div>
        </div>
        <div
          style={{
            flex: 1,
            backgroundColor: "#DBEAFE",
            borderRadius: 6,
            textAlign: "center",
            fontWeight: "bold",
            color: "#2563EB",
            padding: "6px 0",
          }}
        >
          ₹{fees.total.toLocaleString()}
          <div style={{ fontWeight: "normal", fontSize: 10 }}>Total</div>
        </div>
      </div>

      {/* Bottom row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 12,
          alignItems: "center",
          marginTop: 6,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span
            style={{
              display: "inline-block",
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor:
                bloodGroup.includes("+") ? "#EF4444" : "#6366F1",
            }}
          ></span>
          {bloodGroup}
        </div>
        <div
          style={{
            backgroundColor: "#DCFCE7",
            color: "#16A34A",
            padding: "2px 8px",
            borderRadius: 6,
            textTransform: "lowercase",
            fontWeight: "bold",
          }}
        >
          {status}
        </div>
      </div>
    </div>
  );
};

const StudentManagement = () => {
  const [departmentFilter, setDepartmentFilter] = useState("All Departments");
  const [yearFilter, setYearFilter] = useState("All Years");

  const departments = [
    "All Departments",
    "BCA",
    "BCOM",
    "BBA",
    "Sanskrit",
  ];
  const years = ["All Years", "1st Year", "2nd Year", "3rd Year"];

  const filteredStudents = studentsData.filter((student) => {
    const deptMatch =
      departmentFilter === "All Departments" || student.dept === departmentFilter;
    const yearMatch = yearFilter === "All Years" || student.year === yearFilter;
    return deptMatch && yearMatch;
  });

  const totalStudents = studentsData.length;
  const avgCGPA =
    studentsData.reduce((sum, s) => sum + s.cgpa, 0) / totalStudents;
  const avgAttendance =
    studentsData.reduce((sum, s) => sum + s.attendance, 0) / totalStudents;
  const totalPendingFees = studentsData.reduce(
    (sum, s) => sum + s.fees.pending,
    0
  );

  return (
    <div
      style={{
        backgroundColor: "#F9FAFB",
        padding: 20,
        minHeight: "100vh",
        fontFamily:
          '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen',
        color: "#1F2937",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 20,
          alignItems: "center",
        }}
      >
        <div>
          <div style={{ fontWeight: "bold", fontSize: 18, marginBottom: 4 }}>
            Student Management
          </div>
          <div style={{ fontSize: 13, color: "#6B7280" }}>
            Manage all student details and records
          </div>
        </div>
        <div
          style={{
            backgroundColor: "white",
            borderRadius: 9999,
            padding: "6px 12px",
            fontSize: 11,
            color: "#374151",
            boxShadow: "0 1px 2px rgb(0 0 0 / 0.05)",
            fontWeight: "bold",
          }}
        >
          {totalStudents} Students
        </div>
      </div>

      {/* Search and filters */}
      <div
        style={{
          display: "flex",
          gap: 12,
          marginBottom: 20,
          alignItems: "center",
        }}
      >
        <input
          type="text"
          placeholder="Search students by name, roll no, email, or phone..."
          style={{
            flexGrow: 1,
            padding: 10,
            borderRadius: 6,
            border: "1px solid #E5E7EB",
            fontSize: 14,
            outline: "none",
          }}
        />
        <select
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
          style={{
            padding: 8,
            borderRadius: 6,
            border: "1px solid #E5E7EB",
            fontSize: 13,
            backgroundColor: "white",
          }}
        >
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
        <select
          value={yearFilter}
          onChange={(e) => setYearFilter(e.target.value)}
          style={{
            padding: 8,
            borderRadius: 6,
            border: "1px solid #E5E7EB",
            fontSize: 13,
            backgroundColor: "white",
          }}
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <button
          style={{
            padding: "8px 12px",
            borderRadius: 6,
            border: "1px solid #E5E7EB",
            backgroundColor: "white",
            cursor: "pointer",
          }}
        >
          Filter
        </button>
      </div>

      {/* Cards grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: 16,
        }}
      >
        {filteredStudents.map((student) => (
          <StudentCard key={student.id} student={student} />
        ))}
      </div>

      {/* Stats bar */}
      <div
        style={{
          marginTop: 30,
          backgroundColor: "white",
          borderRadius: 10,
          padding: 15,
          display: "flex",
          gap: 24,
          justifyContent: "space-between",
          boxShadow: "0 1px 3px rgb(0 0 0 / 0.1)",
          fontSize: 13,
          color: "#374151",
          alignItems: "center",
        }}
      >
        <div>
          <div style={{ fontWeight: "bold", color: "#3B82F6" }}>
            {totalStudents}
          </div>
          <div>Total Students</div>
        </div>
        <div>
          <div style={{ fontWeight: "bold", color: "#22C55E" }}>
            {avgCGPA.toFixed(1)}
          </div>
          <div>Avg CGPA</div>
        </div>
        <div>
          <div style={{ fontWeight: "bold", color: "#8B5CF6" }}>
            {avgAttendance.toFixed(0)}%
          </div>
          <div>Avg Attendance</div>
        </div>
        <div>
          <div style={{ fontWeight: "bold", color: "#F97316" }}>
            ₹{totalPendingFees.toLocaleString()}K
          </div>
          <div>Pending Fees</div>
        </div>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="#F97316"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            width="28"
            height="28"
            viewBox="0 0 24 24"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default StudentManagement;
