// AnalyticsDashboard.jsx
import React from "react";
import {
  BarChart3,
  Users,
  Building2,
  IndianRupee,
  GraduationCap,
  Activity,
  Eye,
  Download,
  Filter,
  FileText,
  Plus,
  SlidersHorizontal,
  Target,
  Calendar,
} from "lucide-react";

/* ================= STATIC DATA ================= */

const cards = [
  {
    title: "Student Performance Analytics",
    description:
      "Comprehensive analysis of student performance and academic progress",
    icon: BarChart3,
    color: "blue",
    badge: "+5.2%",
    badgeText: "updated",
    stats: [
      { label: "Total Students", value: "1205" },
      { label: "Average Grade", value: "85.2" },
      { label: "Attendance Rate", value: "92.5%" },
      { label: "Pass Rate", value: "94.8%" },
    ],
  },
  {
    title: "Faculty Performance",
    description:
      "Faculty workload, student feedback ratings, and teaching effectiveness",
    icon: Users,
    color: "green",
    badge: "+2.8%",
    badgeText: "updated",
    stats: [
      { label: "Total Faculty", value: "85" },
      { label: "Average Rating", value: "4.6" },
      { label: "Courses per Faculty", value: "3.2" },
      { label: "Research Papers", value: "45" },
    ],
  },
  {
    title: "Department Performance",
    description:
      "Department-wise student enrollment, faculty ratio, and resource utilization",
    icon: Building2,
    color: "purple",
    badge: "+1.5%",
    badgeText: "updated",
    stats: [
      { label: "Total Departments", value: "9" },
      { label: "Avg Enrollment", value: "134" },
      { label: "Faculty Student Ratio", value: "1:14" },
      { label: "Resource Utilization", value: "87%" },
    ],
  },
  {
    title: "Financial Analytics",
    description:
      "Budget allocation, expenditure tracking, and revenue analysis",
    icon: IndianRupee,
    color: "orange",
    badge: "+12.3%",
    badgeText: "updated",
    stats: [
      { label: "Total Budget", value: "₹2.5 Cr" },
      { label: "Utilized", value: "78%" },
      { label: "Pending Payments", value: "₹4.5 L" },
      { label: "Revenue", value: "₹3.2 Cr" },
    ],
  },
  {
    title: "Academic Progress",
    description:
      "Semester progress, exam schedules, and academic milestone tracking",
    icon: GraduationCap,
    color: "teal",
    badge: "On Track",
    badgeText: "active",
    stats: [
      { label: "Semester Progress", value: "65%" },
      { label: "Exams Completed", value: "12" },
      { label: "Assignments Submitted", value: "89%" },
      { label: "Projects Ongoing", value: "28" },
    ],
  },
  {
    title: "Infrastructure Utilization",
    description:
      "Classroom usage, lab equipment status, and facility management",
    icon: Activity,
    color: "indigo",
    badge: "+3.1%",
    badgeText: "operational",
    stats: [
      { label: "Classroom Utilization", value: "85%" },
      { label: "Lab Equipment Status", value: "94%" },
      { label: "Maintenance Requests", value: "8" },
      { label: "Facility Rating", value: "4.3" },
    ],
  },
];

const reports = [
  {
    title: "Monthly Academic Performance Report",
    tag: "Academic",
    meta: "All Departments • Generated: 1/15/2024",
    downloads: 45,
  },
  {
    title: "Faculty Workload Analysis Q4",
    tag: "Administrative",
    meta: "HR Department • Generated: 1/12/2024",
    downloads: 23,
  },
  {
    title: "Student Attendance Trends",
    tag: "Performance",
    meta: "Academic Office • Generated: 1/10/2024",
    downloads: 67,
  },
  {
    title: "Infrastructure Maintenance Report",
    tag: "Administrative",
    meta: "Facilities • Generated: 1/08/2024",
    downloads: 12,
  },
];

/* ================= UTIL ================= */

const colorMap = {
  blue: "border-blue-500 bg-blue-50 text-blue-600",
  green: "border-green-500 bg-green-50 text-green-600",
  purple: "border-purple-500 bg-purple-50 text-purple-600",
  orange: "border-orange-500 bg-orange-50 text-orange-600",
  teal: "border-teal-500 bg-teal-50 text-teal-600",
  indigo: "border-indigo-500 bg-indigo-50 text-indigo-600",
};

/* ================= COMPONENTS ================= */

const StatCard = ({ card }) => {
  const Icon = card.icon;
  const colors = colorMap[card.color];

  return (
    <div className={`bg-white border-t-4 ${colors.split(" ")[0]} rounded-xl shadow-sm p-5 hover:shadow-md transition`}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-3">
          <div className={`p-2 rounded-lg ${colors.split(" ").slice(1).join(" ")}`}>
            <Icon size={18} />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-800">
              {card.title}
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              {card.description}
            </p>
          </div>
        </div>

        <div className="text-right">
          <p className="text-xs text-green-600 font-medium">
            {card.badge}
          </p>
          <p className="text-[10px] text-gray-400">
            {card.badgeText}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        {card.stats.map((stat, i) => (
          <div key={i} className="bg-gray-50 rounded-md p-2 text-center">
            <p className="text-sm font-semibold text-gray-800">
              {stat.value}
            </p>
            <p className="text-[11px] text-gray-500">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <button className="flex-1 flex items-center justify-center gap-2 text-xs border border-gray-200 rounded-md py-2 hover:bg-gray-50">
          <Eye size={14} /> View
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 text-xs border border-gray-200 rounded-md py-2 hover:bg-gray-50">
          <Download size={14} /> Export
        </button>
      </div>
    </div>
  );
};

const ReportRow = ({ report }) => (
  <div className="flex justify-between items-center bg-white border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition">
    <div>
      <div className="flex items-center gap-2">
        <FileText size={16} className="text-gray-400" />
        <h4 className="text-sm font-medium text-gray-800">
          {report.title}
        </h4>
        <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded-md text-gray-600">
          {report.tag}
        </span>
      </div>
      <p className="text-xs text-gray-500 mt-1">
        {report.meta}
      </p>
    </div>

    <div className="flex items-center gap-3 text-xs text-gray-500">
      {report.downloads} downloads
      <Eye size={14} />
      <Download size={14} />
    </div>
  </div>
);

/* ================= PAGE ================= */

const AnalyticsDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-lg font-semibold text-gray-800">
            Reports & Analytics
          </h1>
          <p className="text-xs text-gray-500">
            Data insights and performance analytics
          </p>
        </div>

        <span className="text-xs text-gray-500">
          Analytics Dashboard
        </span>
      </div>

      {/* Center Icon Section */}
      <div className="flex flex-col items-center text-center mb-8">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-4 rounded-xl shadow-md mb-3">
          <BarChart3 className="text-white" size={22} />
        </div>
        <h2 className="text-sm font-semibold text-gray-800">
          Analytics Dashboard
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          Comprehensive reporting and data analysis for informed decision making
        </p>
      </div>

      {/* Filters */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-3">
          <select className="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white">
            <option>All Reports</option>
          </select>
          <select className="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white">
            <option>Monthly</option>
            <option>Weekly</option>
            <option>Quarterly</option>
            <option>Yearly</option>
          </select>
        </div>

        <button className="flex items-center gap-2 px-4 py-2 text-xs border border-gray-200 bg-white rounded-lg hover:bg-gray-50">
          <Filter size={14} /> Advanced Filters
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
        {cards.map((card, i) => (
          <StatCard key={i} card={card} />
        ))}
      </div>

      {/* Recent Reports */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">
          Recent Reports
        </h3>
        <div className="space-y-3">
          {reports.map((r, i) => (
            <ReportRow key={i} report={r} />
          ))}
        </div>
      </div>

      {/* Bottom Buttons */}
      <div className="flex flex-wrap gap-3">
        <button className="flex items-center gap-2 px-4 py-2 text-xs bg-black text-white rounded-md hover:bg-gray-800">
          <Plus size={14} /> Generate New Report
        </button>
        <button className="flex items-center gap-2 px-4 py-2 text-xs border border-gray-300 rounded-md bg-white hover:bg-gray-50">
          <SlidersHorizontal size={14} /> Custom Analytics
        </button>
        <button className="flex items-center gap-2 px-4 py-2 text-xs border border-gray-300 rounded-md bg-white hover:bg-gray-50">
          <Target size={14} /> Set KPI Targets
        </button>
        <button className="flex items-center gap-2 px-4 py-2 text-xs border border-gray-300 rounded-md bg-white hover:bg-gray-50">
          <Calendar size={14} /> Schedule Reports
        </button>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;