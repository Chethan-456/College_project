import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Building2,
  Users,
  GraduationCap,
  School,
  BookOpen,
  BarChart3,
  ShieldCheck,
  Briefcase,
  ChevronRight,
} from "lucide-react";

const ManagementDashboard = () => {
  const navigate = useNavigate();
  const sections = [
     {
      title: "Departments",
      desc: "View and manage all academic departments",
      tag: "7 Departments",
      icon: Building2,
      gradient: "from-[#56CCF2] to-[#2F80ED]", // blue gradient
      path: "/departments",
    },
    {
      title: "Committee Management",
      desc: "Academic and administrative committees",
      tag: "12 Active Committees",
      icon: Users,
      gradient: "from-[#6FCF97] to-[#27AE60]", // green gradient
      path:"/committee-management"
    },
    {
      title: "Faculty Management",
      desc: "Faculty profiles, recruitment & evaluation",
      tag: "85 Faculty Members",
      icon: GraduationCap,
      gradient: "from-[#BB6BD9] to-[#9B51E0]", // purple gradient
      path:"/faculty-management"
    },
    {
      title: "Student Affairs",
      desc: "Student admissions, records & activities",
      tag: "1,200+ Students",
      icon: School,
      gradient: "from-[#F2C94C] to-[#F2994A]", // orange-yellow gradient
      path:"/student-affairs"
    },
    {
      title: "Academic Planning",
      desc: "Curriculum, timetables & academic calendar",
      tag: "45 Courses",
      icon: BookOpen,
      gradient: "from-[#2193b0] to-[#6dd5ed]", // teal-blue gradient
      path:"/academic-planning"
    },
    {
      title: "Reports & Analytics",
      desc: "Performance reports and data insights",
      tag: "Monthly Reports",
      icon: BarChart3,
      gradient: "from-[#667EEA] to-[#764BA2]", // violet-blue gradient
      path:"/reports-analytics"
    },
    {
      title: "Approval Center",
      desc: "Budget approvals, policy decisions",
      tag: "8 Pending",
      icon: ShieldCheck,
      gradient: "from-[#F85032] to-[#E73827]", // red gradient
      path:"/approval-center"
    },
    {
      title: "Administration",
      desc: "HR, finance, infrastructure management",
      tag: "Multiple Sections",
      icon: Briefcase,
      gradient: "from-[#434343] to-[#000000]", // dark gray gradient
      path:"/administration"
    },
  ];

  return (
    <section className="p-6">
      <h2 className="text-lg font-semibold mb-5 text-gray-900">
        Management Dashboard
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sections.map((sec) => {
          const Icon = sec.icon; // store the icon component reference
          return (
            <div
              key={sec.title}
              onClick={() => sec.path && navigate(sec.path)}
              className="flex items-center justify-between bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              {/* Left side */}
              <div className="flex flex-col items-start gap-4">
                <div
                  className={`bg-linear-to-r ${sec.gradient} rounded-xl w-12 h-12 flex items-center justify-center`}
                >
                  <Icon size={24} color="white" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    {sec.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">{sec.desc}</p>
                  <span className="inline-block mt-3 text-xs font-medium bg-gray-100 text-gray-700 rounded-md px-2.5 py-1">
                    {sec.tag}
                  </span>
                </div>
              </div>

              {/* Right arrow */}
              <ChevronRight size={20} className="text-gray-400 mb-28" />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ManagementDashboard;

