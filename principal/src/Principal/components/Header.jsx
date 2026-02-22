import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Home, Bell, MessageSquare, LogOut, Bot, X, Send } from "lucide-react";



const Header = () => {
  const navigate = useNavigate();
  const [showAI, setShowAI] = useState(false);
  useEffect(() => {
  if (showAI) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  return () => {
    document.body.style.overflow = "auto";
  };
}, [showAI]);

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <>
      <header className="flex justify-between items-center bg-white px-8 py-4">
        {/* Left section */}
        <div>
          <h1 className="text-base font-semibold text-gray-900">
            Principal Dashboard
          </h1>
          <p className="text-xs text-gray-700 mt-1">
            College Administration Portal
          </p>
        </div>

        {/* Right section */}
        <nav className="flex items-center gap-6 text-sm">

          <NavLink to="/principal"
            className={({ isActive }) =>
              `flex items-center gap-1 px-3 py-1 rounded transition ${
                isActive ? "bg-black text-white" : "text-black hover:bg-gray-200"
              }`
            }
          >
            <Home size={16} /> Home
          </NavLink>

          <NavLink to="/messages"
            className={({ isActive }) =>
              `flex items-center gap-1 px-3 py-1 rounded transition ${
                isActive ? "bg-black text-white" : "text-black hover:bg-gray-200"
              }`
            }
          >
            <MessageSquare size={16} /> Messages
          </NavLink>

          <NavLink to="/notifications"
            className={({ isActive }) =>
              `flex items-center gap-1 px-3 py-1 rounded transition ${
                isActive ? "bg-black text-white" : "text-black hover:bg-gray-200"
              }`
            }
          >
            <Bell size={16} /> Notifications
          </NavLink>

          {/* ✅ AI Button */}
          <button
            onClick={() => setShowAI(true)}
            className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition"
          >
            <Bot size={16} /> AI Assistant
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1 text-red-600 hover:text-red-800 transition"
          >
            <LogOut size={16} /> Logout
          </button>

        </nav>
      </header>

      {/* ================= AI MODAL ================= */}
      {showAI && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white w-full max-w-xl h-[80vh] rounded-xl shadow-xl flex flex-col">

            {/* Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b">
              <div className="flex items-center gap-3">
                <div className="bg-linear-to-r from-purple-500 to-blue-500 p-2 rounded-full text-white">
                  <Bot size={18} />
                </div>
                <div>
                  <h2 className="text-sm font-semibold">AI Assistant</h2>
                  <p className="text-xs text-gray-500">
                    Your intelligent college management helper
                  </p>
                </div>
              </div>

              <X
                size={18}
                className="cursor-pointer text-gray-500 hover:text-black"
                onClick={() => setShowAI(false)}
              />
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-6 overflow-y-auto">
              <div className="bg-gray-100 p-3 rounded-lg text-sm text-gray-700 max-w-sm">
                Hello Dr. Mehta! I'm your AI assistant. How can I help you manage college affairs today?
              </div>
            </div>

            {/* Input */}
            <div className="border-t p-4 flex items-center gap-2">
              <input
                type="text"
                placeholder="Ask me anything about college management..."
                className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button className="bg-gray-700 text-white p-2 rounded-lg hover:bg-black transition">
                <Send size={16} />
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default Header;