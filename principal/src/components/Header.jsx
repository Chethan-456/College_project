import React from "react";
import { Home, Bell, MessageSquare, LogOut, Bot } from "lucide-react";

const Header = () => {
  return (
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
        {/* Home button */}
        <button className="flex items-center gap-1 bg-black text-white px-3 py-1 rounded cursor-pointer hover:opacity-90 transition-opacity">
          <Home size={16} /> Home
        </button>

        {/* Messages button */}
        <button className="flex items-center gap-1 relative text-black hover:text-black cursor-pointer bg-transparent border-none p-0">
          <MessageSquare size={16} />
          <span>Messages</span>
          <span className="absolute -top-1 -right-3 bg-red-600 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-semibold">
            2
          </span>
        </button>

        {/* Notifications button */}
        <button className="flex items-center gap-1 relative text-black hover:text-black cursor-pointer bg-transparent border-none p-0">
          <Bell size={16} />
          <span>Notifications</span>
          <span className="absolute -top-1 -right-3 bg-red-600 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-semibold">
            2
          </span>
        </button>

        {/* AI Assistant button */}
        <button className="flex items-center gap-1 text-blue-600 hover:text-blue-800 cursor-pointer bg-transparent border-none p-0 transition-colors">
          <Bot size={16} /> <span>AI Assistant</span>
        </button>

        {/* Logout button */}
        <button className="flex items-center gap-1 text-red-600 hover:text-red-800 cursor-pointer bg-transparent border-none p-0 transition-colors">
          <LogOut size={16} /> <span>Logout</span>
        </button>
      </nav>
    </header>
  );
};

export default Header;
