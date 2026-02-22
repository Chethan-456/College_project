import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  ClipboardList,
  Settings,
  AlertTriangle,
  CheckCircle,
  DollarSign,
  Users,
  Wrench,
  Plus,
  FileText,
  Calendar,
  Cog,
  ArrowLeft,
} from "lucide-react";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();

  const Tab = ({ id, label, icon }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm transition ${
        activeTab === id
          ? "bg-black text-white"
          : "bg-white border hover:bg-gray-100"
      }`}
    >
      {icon}
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-100">

    {/* TOP HEADER BAR */}
    <div className="flex justify-between items-center px-6 py-3 bg-white ">

      <div className="flex items-center gap-3">
        <button
  onClick={() => navigate(-1)}
  className="text-gray-600 hover:text-black"
>
  <ArrowLeft size={18} />
</button>
        <div>
          <h2 className="text-sm font-semibold text-gray-800">
            Administration
          </h2>
          <p className="text-xs text-gray-500">
            HR, finance, infrastructure management
          </p>
        </div>
      </div>

      <p className="text-xs text-gray-500">
        Administrative Portal
      </p>
    </div>

    {/* MAIN CONTENT */}
    <div className="px-10 py-8">

      {/* HEADER */}
      <div className="text-center mb-10">
        <div className="w-16 h-16 mx-auto bg-gray-700 text-white flex items-center justify-center rounded-xl">
          <Settings size={26} />
        </div>
        <h1 className="text-xl font-semibold mt-4">
          Administrative Management
        </h1>
        <p className="text-sm text-gray-500">
          Comprehensive administration, finance, and operational systems
        </p>
      </div>

      {/* TABS */}
      <div className="flex gap-3 mb-8">
        <Tab id="overview" label="Overview" icon={<ClipboardList size={16} />} />
        <Tab id="alerts" label="Alerts" icon={<Bell size={16} />} />
        <Tab id="quick" label="Quick Actions" icon={<Settings size={16} />} />
      </div>

      {/* OVERVIEW */}
      {activeTab === "overview" && (
  <div className="grid grid-cols-3 gap-8 mb-12">

    <OverviewCard
  color="bg-blue-600"
  title="Human Resources"
  desc="Staff management, payroll, recruitment, and employee relations"
  icon={<Users size={16} />}
  stats={[
    { label: "Total Employees", value: "95" },
    { label: "New Hires", value: "5" },
    { label: "Pending Leaves", value: "12" },
    { label: "Active Recruitment", value: "3" },
  ]}
/>

<OverviewCard
  color="bg-green-600"
  title="Finance & Accounts"
  desc="Budget management, financial planning, and accounting operations"
  icon={<DollarSign size={16} />}
  stats={[
    { label: "Monthly Budget", value: "₹45L" },
    { label: "Pending Payments", value: "₹12L" },
    { label: "Revenue", value: "₹52L" },
    { label: "Expenses", value: "₹38L" },
  ]}
/>

<OverviewCard
  color="bg-orange-500"
  title="Infrastructure & Maintenance"
  desc="Facility management, maintenance schedules, and infrastructure planning"
  icon={<Wrench size={16} />}
  stats={[
    { label: "Active Tickets", value: "8" },
    { label: "Completed This Month", value: "25" },
    { label: "Scheduled Maintenance", value: "15" },
    { label: "Facility Utilization", value: "87%" },
  ]}
/>

  </div>
)}

      {activeTab === "alerts" && (
  <div className="mb-10">

    {/* Header Row */}
    <div className="flex justify-between items-center mb-3">
      <h3 className="text-sm font-semibold text-gray-700">
        System Alerts & Notifications
      </h3>

      <button className="text-xs border px-3 py-1 rounded-md hover:bg-gray-100">
        Mark All Read
      </button>
    </div>

    {/* Alert Rows */}
    <div className="space-y-4">
  <AlertRow
  color="bg-yellow-50 border-yellow-200"
  icon={<AlertTriangle size={16} className="text-yellow-600" />}
  title="Budget Alert"
  desc="Monthly budget utilization has reached 85%"
  time="2 hours ago"
  tag="Finance"
/>

<AlertRow
  color="bg-blue-50 border-blue-200"
  icon={<Wrench size={16} className="text-blue-600" />}
  title="Maintenance Scheduled"
  desc="Server maintenance scheduled for this weekend"
  time="4 hours ago"
  tag="IT Services"
/>

<AlertRow
  color="bg-green-50 border-green-200"
  icon={<CheckCircle size={16} className="text-green-600" />}
  title="Compliance Check"
  desc="Annual safety audit completed successfully"
  time="1 day ago"
  tag="Security"
/>

<AlertRow
  color="bg-yellow-50 border-yellow-200"
  icon={<AlertTriangle size={16} className="text-yellow-600" />}
  title="License Expiry"
  desc="5 software licenses expiring next month"
  time="2 days ago"
  tag="IT Services"
/>
</div>
  </div>
)}
      {/* QUICK ACTIONS */}
      {activeTab === "quick" && (
  <div className="grid grid-cols-3 gap-5 mb-10">

    <QuickCard
      title="Staff Directory"
      desc="View and manage employee information"
      icon={<Users size={16} />}
    />

    <QuickCard
      title="Financial Reports"
      desc="Generate financial statements and reports"
      icon={<DollarSign size={16} />}
    />

    <QuickCard
      title="Maintenance Requests"
      desc="Submit and track maintenance requests"
      icon={<Wrench size={16} />}
    />

    <QuickCard
      title="System Backup"
      desc="Manage data backup and recovery"
      icon={<FileText size={16} />}
    />

    <QuickCard
      title="Emergency Protocols"
      desc="Access emergency procedures and contacts"
      icon={<AlertTriangle size={16} />}
    />

    <QuickCard
      title="Vendor Management"
      desc="Manage supplier relationships and contracts"
      icon={<ClipboardList size={16} />}
    />

  </div>
)}

      {/* SUMMARY SECTION */}
<div className="bg-gray-50 border border-gray-200 rounded-2xl px-10 py-10 mb-12">

  <div className="flex items-center gap-2 mb-8">
    <span className="text-gray-500 text-sm">⚡</span>
    <h3 className="text-sm font-semibold text-gray-700 tracking-wide">
      Administrative Dashboard Summary
    </h3>
  </div>

  <div className="grid grid-cols-4 text-center gap-y-6">

    <div className="space-y-2">
      <p className="text-blue-600 text-xl font-semibold">95</p>
      <p className="text-xs text-gray-500">Total Staff</p>
    </div>

    <div className="space-y-2">
      <p className="text-green-600 text-xl font-semibold">₹45L</p>
      <p className="text-xs text-gray-500">Monthly Budget</p>
    </div>

    <div className="space-y-2">
      <p className="text-orange-500 text-xl font-semibold">8</p>
      <p className="text-xs text-gray-500">Active Issues</p>
    </div>

    <div className="space-y-2">
      <p className="text-purple-600 text-xl font-semibold">99.8%</p>
      <p className="text-xs text-gray-500">System Uptime</p>
    </div>

  </div>
</div>

      {/* BOTTOM ACTIONS */}
      <div className="flex justify-center gap-4">
        <ActionButton primary icon={<Plus size={16} />} label="New Request" />
        <ActionButton icon={<FileText size={16} />} label="Generate Report" />
        <ActionButton icon={<Calendar size={16} />} label="Schedule Meeting" />
        <ActionButton icon={<Cog size={16} />} label="System Settings" />
      </div>
    </div>
    </div>
  );
};

/* ---------- COMPONENTS ---------- */

const ModuleCard = ({ title, desc, icon, border }) => (
  <div className={`bg-white rounded-xl border ${border} p-6`}>
    <div className="w-10 h-10 bg-gray-700 text-white flex items-center justify-center rounded-md">
      {icon}
    </div>
    <h3 className="mt-4 font-semibold">{title}</h3>
    <p className="text-sm text-gray-500 mt-2">{desc}</p>
  </div>
);

const OverviewCard = ({ title, desc, stats, color, icon }) => (
  <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden">

    {/* Top Colored Border */}
    <div className={`h-1.5 w-full ${color}`}></div>

    <div className="p-6">

      {/* Header Row */}
      <div className="flex justify-between items-start mb-4">

        <div className="flex items-start gap-3">
          <div className={`w-10 h-10 flex items-center justify-center rounded-lg ${color} text-white`}>
            {icon}
          </div>

          <div>
            <h3 className="font-semibold text-sm">{title}</h3>
            <p className="text-xs text-gray-500 mt-1">
              {desc}
            </p>
          </div>
        </div>

        <button className="text-gray-400 hover:text-gray-600 text-lg">
          ⋮
        </button>

      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-gray-100 rounded-md py-3 text-center"
          >
            <p className="text-sm font-semibold text-gray-800">
              {item.value}
            </p>
            <p className="text-xs text-gray-500">
              {item.label}
            </p>
          </div>
        ))}
      </div>

      {/* Recent Activities */}
      <div className="text-xs text-gray-600 mb-4">
        <p className="font-medium mb-1">Recent Activities:</p>
        <ul className="list-disc list-inside space-y-1 text-gray-500">
          <li>New activity recorded</li>
          <li>System update completed</li>
        </ul>
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button className="border rounded-md py-2 text-xs hover:bg-gray-50">
          View
        </button>
        <button className="border rounded-md py-2 text-xs hover:bg-gray-50">
          Manage
        </button>
      </div>

    </div>
  </div>
);

const AlertRow = ({ color, title, desc, tag, time }) => (
  <div className={`rounded-md border ${color} px-5 py-4 flex justify-between`}>

    {/* LEFT SECTION */}
    <div>
      <h4 className="text-sm font-semibold text-gray-800">{title}</h4>
      <p className="text-xs text-gray-600 mt-1">{desc}</p>
      <p className="text-xs text-gray-400 mt-2">{time}</p>
    </div>

    {/* RIGHT SECTION */}
    <div className="flex flex-col items-end justify-between">

      {/* TAG (TOP RIGHT) */}
      <span className="text-[11px] border px-3 py-1 rounded-full bg-white text-gray-600">
        {tag}
      </span>

      {/* BUTTONS (BOTTOM RIGHT) */}
      <div className="flex items-center gap-4 mt-3">
        <button className="text-xs text-gray-500 hover:text-gray-700">
          Dismiss
        </button>

        <button className="text-xs text-blue-600 hover:underline">
          View Details
        </button>
      </div>

    </div>
  </div>
);

const QuickCard = ({ title, desc, icon }) => (
  <div className="bg-white border border-gray-200 rounded-xl px-5 py-4 flex items-start gap-3 hover:shadow-sm transition">

    {/* ICON BOX */}
    <div className="w-9 h-9 bg-gray-100 rounded-md flex items-center justify-center text-gray-600 shrink-0">
      {icon}
    </div>

    {/* TEXT */}
    <div>
      <h4 className="text-sm font-semibold text-gray-800 leading-none">
        {title}
      </h4>
      <p className="text-xs text-gray-500 mt-1 leading-snug">
        {desc}
      </p>
    </div>

  </div>
);

const ActionButton = ({ icon, label, primary }) => (
  <button
    className={`flex items-center gap-2 px-5 py-2 rounded-md text-sm transition ${
      primary
        ? "bg-black text-white hover:bg-gray-800"
        : "bg-white border hover:bg-gray-100"
    }`}
  >
    {icon}
    {label}
  </button>
  
);

export default AdminDashboard;