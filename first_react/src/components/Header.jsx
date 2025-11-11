import React, { useState } from "react";
import { ArrowLeft, Bot, Bell, LogOut, X, Bookmark, User, FileText, Clock, DollarSign } from "lucide-react"; // Import necessary icons
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false); // 👈 NEW STATE

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  // Static notification data based on your screenshot
  const notifications = [
    { 
      source: "Principal Office", 
      role: "PRINCIPAL", 
      title: "Important: Academic Calendar Update", 
      detail: "The mid-semester examinations have been rescheduled. Please check the updated academic calendar for new dates.", 
      date: "12/6/2024",
      icon: <Bookmark size={18} className="text-red-600" />
    },
    { 
      source: "Dr. Smith (Mathematics)", 
      role: "FACULTY", 
      title: "Assignment Submission Reminder", 
      detail: "Please submit your calculus assignment by December 15th. Late submissions will not be accepted.", 
      date: "12/7/2024",
      icon: <FileText size={18} className="text-green-600" />
    },
    { 
      source: "HOD Computer Science", 
      role: "HOD", 
      title: "Technical Symposium Registration", 
      detail: "Registration is now open for the annual technical symposium. Last date to register is December 20th.", 
      date: "12/6/2024",
      icon: <User size={18} className="text-blue-600" />
    },
  ];

  return (
    <header className="flex justify-between items-center bg-white px-8 py-4 border-b">
      {/* Left Section (omitted for brevity) */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleGoBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition"
        >
          <ArrowLeft size={18} strokeWidth={1.8} />
          <span className="text-sm font-medium">Back</span>
        </button>

        <div>
          <h1 className="text-[20px] font-bold text-gray-800">
            Student Dashboard
          </h1>
          <p className="text-sm text-gray-500">Welcome back, Priya!</p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* AI Assistant Button */}
        <button
          onClick={() => setIsAiAssistantOpen(true)}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-purple-600 border border-purple-500 rounded-lg hover:bg-purple-50 transition"
        >
          <Bot size={16} strokeWidth={1.8} />
          <span>AI Assistant</span>
        </button>

        {/* Notifications Button (Changed from Link to Button) */}
        <button
          onClick={() => setIsNotificationsOpen(true)} // 👈 Open Notifications Modal
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 border border-blue-500 rounded-lg hover:bg-blue-50 transition"
        >
          <Bell size={16} strokeWidth={1.8} />
          <span>Notifications</span>
        </button>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-500 bg-white border border-red-500 rounded-lg hover:bg-red-500 hover:text-white transition"
        >
          <LogOut size={16} strokeWidth={1.8} />
          <span>Logout</span>
        </button>
      </div>

      {/* --- AI Assistant Modal JSX (Omitted for brevity) --- */}
      {/* ... (Keep the previous AI Assistant Modal JSX here) ... */}
      
      {/* 🔔 Notifications Modal (NEW) 🔔 */}
      {isNotificationsOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm h-full max-h-[90vh] mt-[5vh] mr-4 relative flex flex-col overflow-hidden">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b">
              <div className="flex items-center gap-3">
                <Bell size={24} className="text-gray-800" />
                <h3 className="text-xl font-semibold text-gray-800">Notifications</h3>
              </div>
              <button 
                onClick={() => setIsNotificationsOpen(false)} // 👈 Close modal
                className="text-gray-400 hover:text-gray-600 transition p-1"
              >
                <X size={20} />
              </button>
            </div>

            {/* Sub-Header */}
            <div className="px-6 py-3 bg-gray-50 border-b">
              <p className="text-sm text-gray-600">
                View important announcements and updates from the college administration.
              </p>
            </div>

            {/* Notification List (Scrollable) */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {notifications.map((note, index) => (
                <div key={index} className="bg-white p-4 border rounded-xl shadow-sm">
                  {/* Source and Role */}
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-semibold text-gray-600">{note.source}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${note.role === 'PRINCIPAL' ? 'bg-red-100 text-red-600' : note.role === 'FACULTY' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                      {note.role}
                    </span>
                  </div>
                  
                  {/* Title and Detail */}
                  <h4 className="text-sm font-bold text-gray-800 flex items-center gap-2 mb-1">
                    {note.icon} {note.title}
                  </h4>
                  <p className="text-sm text-gray-700 mb-2">{note.detail}</p>
                  
                  {/* Date */}
                  <p className="text-xs text-gray-500">{note.date}</p>
                </div>
              ))}
            </div>
            
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;