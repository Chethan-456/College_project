// Dashboard.jsx
import React from "react";

/* =======================
   STATIC DATA
======================= */

const days = [
  { name: "Monday", date: "Sep 23" },
  { name: "Tuesday", date: "Sep 24" },
  { name: "Wednesday", date: "Sep 25" },
  { name: "Thursday", date: "Sep 26" },
  { name: "Friday", date: "Sep 27" },
  { name: "Saturday", date: "Sep 28" },
];

const timetable = [
  {
    time: "8:00-9:00",
    data: [
      { subject: "Programming in C", room: "103", teacher: "Malhotra" },
      { subject: "Computer Fundamentals", room: "104", teacher: "Nair" },
      { subject: "Mathematics-I", room: "105", teacher: "Singh" },
      { subject: "English Language", room: "Lab-1", teacher: "Patel" },
      { subject: "Environmental Studies", room: "Lab-2", teacher: "Kumar" },
      { subject: "Physical Education", room: "201", teacher: "Malhotra" },
    ],
  },
  {
    time: "9:00-10:00",
    data: [
      { subject: "Computer Fundamentals", room: "104", teacher: "Nair" },
      { subject: "Mathematics-I", room: "105", teacher: "Singh" },
      { subject: "English Language", room: "Lab-1", teacher: "Patel" },
      { subject: "Environmental Studies", room: "Lab-2", teacher: "Kumar" },
      { subject: "Physical Education", room: "201", teacher: "Malhotra" },
      { subject: "Programming in C", room: "202", teacher: "Nair" },
    ],
  },
  { time: "10:00-10:30", break: true },
  {
    time: "10:30-11:30",
    data: [
      { subject: "English Language", room: "Lab-1", teacher: "Patel" },
      { subject: "Environmental Studies", room: "Lab-2", teacher: "Kumar" },
      { subject: "Physical Education", room: "201", teacher: "Malhotra" },
      { subject: "Programming in C", room: "202", teacher: "Nair" },
      { subject: "Computer Fundamentals", room: "Auditorium", teacher: "Singh" },
      { subject: "Mathematics-I", room: "101", teacher: "Patel" },
    ],
  },
  {
    time: "11:30-12:30",
    data: [
      { subject: "Environmental Studies", room: "Lab-2", teacher: "Kumar" },
      { subject: "Physical Education", room: "201", teacher: "Malhotra" },
      { subject: "Programming in C", room: "202", teacher: "Nair" },
      { subject: "Computer Fundamentals", room: "Auditorium", teacher: "Singh" },
      { subject: "Mathematics-I", room: "101", teacher: "Patel" },
      { subject: "English Language", room: "102", teacher: "Kumar" },
    ],
  },
  {
    time: "12:30-13:30",
    data: [
      { subject: "Physical Education", room: "201", teacher: "Malhotra" },
      { subject: "Programming in C", room: "202", teacher: "Nair" },
      { subject: "Computer Fundamentals", room: "Auditorium", teacher: "Singh" },
      { subject: "Mathematics-I", room: "101", teacher: "Patel" },
      { subject: "English Language", room: "102", teacher: "Kumar" },
      { subject: "-", room: "", teacher: "" },
    ],
  },
  {
    time: "13:30-14:30",
    data: [
      { subject: "Programming in C", room: "202", teacher: "Nair" },
      { subject: "Computer Fundamentals", room: "Auditorium", teacher: "Singh" },
      { subject: "Mathematics-I", room: "101", teacher: "Patel" },
      { subject: "English Language", room: "102", teacher: "Kumar" },
      { subject: "Environmental Studies", room: "103", teacher: "Malhotra" },
      { subject: "-", room: "", teacher: "" },
    ],
  },
];

/* =======================
   REUSABLE COMPONENTS
======================= */

const SubjectCard = ({ item }) => {
  if (item.subject === "-") {
    return (
      <div className="h-full flex items-center justify-center text-gray-400 text-xs">
        ---
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 h-full hover:shadow-sm transition">
      <p className="text-xs font-semibold text-gray-800">
        {item.subject}
      </p>
      <p className="text-[11px] text-gray-500 mt-1">{item.room}</p>
      <p className="text-[11px] text-gray-500">{item.teacher}</p>
    </div>
  );
};

const InfoCard = ({ title, children }) => (
  <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
    <h3 className="text-sm font-semibold text-gray-700 mb-4">{title}</h3>
    {children}
  </div>
);

/* =======================
   MAIN COMPONENT
======================= */

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Top Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-lg font-semibold text-gray-800">
            Principal Dashboard - Timetable
          </h1>
          <p className="text-xs text-gray-500">
            Academic Year 2024-25
          </p>
        </div>

        <div className="flex gap-3">
          <button className="px-4 py-2 text-xs bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
            Export
          </button>
          <button className="px-4 py-2 text-xs bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
            Print
          </button>
        </div>
      </div>

      {/* Gradient Banner */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white mb-6">
        <h2 className="text-base font-semibold">College Timetable</h2>
        <p className="text-xs mt-1">
          Working Hours 8:00 AM - 2:30 PM
        </p>

        <div className="flex gap-3 mt-4">
          <button className="px-3 py-1 text-xs bg-white/20 rounded-md">
            1st Year
          </button>
          <button className="px-3 py-1 text-xs bg-white/20 rounded-md">
            1st Semester
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <select className="px-3 py-2 text-sm border border-gray-200 bg-white rounded-lg">
          <option>BCA</option>
          <option>B.COM</option>
          <option>BBA</option>
        </select>

        <select className="px-3 py-2 text-sm border border-gray-200 bg-white rounded-lg">
          <option>1st Year</option>
          <option>2nd Year</option>
        </select>

        <select className="px-3 py-2 text-sm border border-gray-200 bg-white rounded-lg">
          <option>1st Semester</option>
          <option>2nd Semester</option>
        </select>
      </div>

      {/* Timetable Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-x-auto mb-8">
        <div className="min-w-[1100px]">
          {/* Header Row */}
          <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-600">
            <div className="p-3 border-r border-gray-200">Time</div>
            {days.map((day, index) => (
              <div
                key={index}
                className="p-3 border-r border-gray-200 last:border-r-0"
              >
                <p>{day.name}</p>
                <p className="text-[11px] text-gray-400">{day.date}</p>
              </div>
            ))}
          </div>

          {/* Rows */}
          {timetable.map((row, idx) => (
            <div
              key={idx}
              className="grid grid-cols-7 border-b border-gray-200 last:border-b-0"
            >
              <div className="p-3 text-xs text-gray-600 border-r border-gray-200 bg-gray-50">
                {row.time}
              </div>

              {row.break ? (
                <div className="col-span-6 bg-orange-100 text-orange-600 text-xs font-semibold flex items-center justify-center py-4 border-r border-gray-200">
                  BREAK
                </div>
              ) : (
                row.data.map((item, i) => (
                  <div
                    key={i}
                    className="p-3 border-r border-gray-200 last:border-r-0"
                  >
                    <SubjectCard item={item} />
                  </div>
                ))
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <InfoCard title="Daily Schedule">
          <div className="text-xs text-gray-600 space-y-2">
            <p>First Session: 8:00 AM - 10:00 AM</p>
            <p>Break Time: 10:00 AM - 10:30 AM</p>
            <p>Second Session: 10:30 AM - 12:30 PM</p>
            <p>Third Session: 12:30 PM - 2:30 PM</p>
            <p className="font-semibold">Total Duration: 6.5 hours</p>
          </div>
        </InfoCard>

        <InfoCard title="Class Information">
          <div className="text-xs text-gray-600 space-y-2">
            <p>Classes per Day: 6 periods</p>
            <p>Period Duration: 1 hour</p>
            <p>Break Duration: 30 minutes</p>
            <p>Saturday Classes: Half Day</p>
            <p>Working Days: 6 days/week</p>
          </div>
        </InfoCard>

        <InfoCard title="Current Status">
          <div className="text-xs text-gray-600 space-y-2">
            <p>Department: BCA</p>
            <p>Academic Year: 2024-25</p>
            <p>Current Week: Week 4</p>
            <p>Today: Thursday</p>
            <p>User Role: Principal</p>
          </div>
        </InfoCard>
      </div>
    </div>
  );
};

export default Dashboard;