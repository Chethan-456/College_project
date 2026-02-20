import React from "react";
import { NavLink } from "react-router-dom";
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
        
      <NavLink
  to="/" 
  className={({ isActive }) =>
            `flex items-center gap-1 px-3 py-1 rounded transition ${
              isActive ? "bg-black text-white" : "text-black hover:bg-gray-200"
            }`
          }
          >
          
          <Home size={16} /> Home

        </NavLink>

        {/* Messages button */}
        <NavLink
  to="/messages"
  className={({ isActive }) =>
            `flex items-center gap-1 relative px-3 py-1 rounded transition ${
              isActive ? "bg-black text-white" : "text-black hover:bg-gray-200"
            }`
          }
  
>
  <MessageSquare size={16} />
  <span>Messages</span>

  {/*<span className="absolute -top-1 -right-3 bg-red-600 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-semibold">
    2
  </span>*/}
</NavLink>


        {/* Notifications button */}
         <NavLink
          to="/notifications"
          className={({ isActive }) =>
            `flex items-center gap-1 relative px-3 py-1 rounded transition ${
              isActive ? "bg-black text-white" : "text-black hover:bg-gray-200"
            }`
          }
        >
          <Bell size={16} />
          <span>Notifications</span>
           {/*<span className="absolute -top-1 -right-3 bg-red-600 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-semibold">
            2
          </span>*/}
        </NavLink>

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
