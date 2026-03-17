// App.jsx
import Navbar from "./components/Navbar";
import {
  Calendar,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Briefcase,
  Clock,
  BookOpen,
} from "lucide-react";

export default function App() {
  const workingHours = [
    { day: "Monday", hours: "7:30 AM - 2:30 PM" },
    { day: "Tuesday", hours: "7:30 AM - 2:30 PM" },
    { day: "Wednesday", hours: "7:30 AM - 2:30 PM" },
    { day: "Thursday", hours: "7:30 AM - 2:30 PM" },
  ];

  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* SIDEBAR */}
      <aside className="w-[230px] min-w-[230px] min-h-screen bg-white border-r border-gray-200 overflow-y-auto px-4 py-5 flex-shrink-0">

        <div className="flex flex-col items-center mb-4">
          <div className="relative">
            <img
              src="https://i.pravatar.cc/150?img=68"
              className="w-[80px] h-[80px] rounded-full object-cover"
            />
            <span className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white" />
          </div>
          <h3 className="mt-2 font-semibold text-sm text-gray-900 text-center leading-tight">
            Dr. Rajesh Kumar
          </h3>
          <p className="text-xs text-gray-500 text-center mt-0.5">
            Head of Department - BCA
          </p>
          <span className="mt-2 px-4 py-0.5 text-xs border border-gray-300 rounded-full text-gray-600">
            Active
          </span>
        </div>

        <div className="mb-4">
          <p className="text-xs font-semibold text-gray-800 mb-2">Personal Information</p>
          <div className="space-y-2 text-xs text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar size={12} className="text-gray-400 shrink-0" />
              <span><span className="font-medium text-gray-700">DOB:</span> 15th March, 1975</span>
            </div>
            <div className="flex items-start gap-2">
              <Mail size={12} className="text-gray-400 shrink-0 mt-0.5" />
              <span><span className="font-medium text-gray-700">Email:</span><br />rajesh.kumar@college.edu</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={12} className="text-gray-400 shrink-0" />
              <span><span className="font-medium text-gray-700">Phone:</span> +91 98765 43210</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={12} className="text-gray-400 shrink-0" />
              <span><span className="font-medium text-gray-700">Office:</span> BCA Block, Room 301</span>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-xs font-semibold text-gray-800 flex items-center gap-1.5 mb-2">
            <GraduationCap size={12} className="text-gray-500" />
            Education
          </p>
          <ul className="list-disc list-inside text-xs text-gray-600 space-y-1">
            <li>Ph.D. in Computer Science - IIT Delhi (2005)</li>
            <li>M.Tech in Software Engineering - IIT Bombay (2001)</li>
            <li>B.Tech in Computer Science - Delhi University (1998)</li>
          </ul>
        </div>

        <div className="mb-4">
          <p className="text-xs font-semibold text-gray-800 flex items-center gap-1.5 mb-2">
            <Briefcase size={12} className="text-gray-500" />
            Experience &amp; Specialization
          </p>
          <p className="text-xs text-gray-600">Experience: 20+ Years</p>
          <p className="text-xs text-gray-600">Specialization: Software Engineering, AI &amp; ML</p>
        </div>

        <div>
          <p className="text-xs font-semibold text-gray-800 flex items-center gap-1.5 mb-2">
            <Clock size={12} className="text-gray-500" />
            Working Hours
          </p>
          {workingHours.map((w) => (
            <div key={w.day} className="flex justify-between text-xs mb-1.5">
              <span className="text-gray-600">{w.day}</span>
              <span className="text-green-600 font-medium">{w.hours}</span>
            </div>
          ))}
        </div>

      </aside>

      {/* RIGHT SIDE */}
      <div className="flex flex-col flex-1">

        {/* NAVBAR */}
        <Navbar activeLabel="Classes" />

        {/* MAIN CONTENT */}
        <main className="flex-1 p-5 overflow-y-auto bg-gray-100">
          <div className="bg-white rounded-xl border border-gray-200 min-h-full p-8">

            <div className="flex items-center gap-2 mb-20">
              <BookOpen size={16} className="text-gray-700" />
              <h2 className="font-semibold text-sm text-gray-800">Classes Management</h2>
            </div>

            <div className="flex flex-col items-center justify-center">
              <BookOpen size={60} className="text-gray-300 mb-3" />
              <p className="text-gray-400 text-sm mb-8">
                Manage class schedules, assignments, and student progress
              </p>

              <div className="grid grid-cols-2 gap-3 w-[420px]">
                <button className="bg-[#0f172a] text-white py-3 rounded-lg text-sm font-medium hover:bg-[#1e293b] transition-colors">
                  View Classes
                </button>
                <button className="border border-gray-200 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                  Attendance
                </button>
                <button className="border border-gray-200 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                  Assignments
                </button>
                <button className="border border-gray-200 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                  Grades
                </button>
              </div>
            </div>

          </div>
        </main>

      </div>
    </div>
  );
}