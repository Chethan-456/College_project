import React from "react";
import { useNavigate } from "react-router-dom";

const RoleSelection = () => {
  const navigate = useNavigate();

  const roles = [
    {
      title: "PRINCIPAL",
      desc: "Administrator & Head of Institution",
      letter: "P",
      gradient: "from-purple-500 to-pink-500",
      path: "/admin-login",
    },
    {
      title: "HOD",
      desc: "Head of Department & Coordinator",
      letter: "HOD",
      gradient: "from-yellow-400 to-pink-500",
      path: "/hod",
    },
    {
      title: "FACULTY",
      desc: "Teaching Staff & Mentors",
      letter: "F",
      gradient: "from-green-400 via-blue-400 to-purple-500",
      path: "/faculty",
    },
    {
      title: "STUDENT",
      desc: "Learners & Campus Members",
      letter: "S",
      gradient: "from-pink-400 to-purple-500",
      path: "/student",
    },
  ];

  return (
    <div className="min-h-screen bg-white font-[Verdana] text-[14px]">


      {/* 🔷 CONTENT */}
      <div className="flex flex-col items-center mt-12 px-4">

        <h2 className="text-[20px] font-bold text-gray-800">
          Select Your Role
        </h2>
        <p className="text-gray-600 mt-2 mb-10">
          Please choose your login role to proceed
        </p>

        <div className="w-full max-w-xl space-y-6">
          {roles.map((role, index) => (
            <div
              key={index}
              onClick={() => navigate(role.path)}
              className={`cursor-pointer flex justify-between items-center p-6 rounded-2xl shadow-xl 
              bg-linear-to-r ${role.gradient} text-white 
              hover:scale-105 transition duration-300`}
            >
              <div>
                <h3 className="text-[18px] font-bold tracking-wide">
                  {role.title}
                </h3>
                <p className="mt-1">{role.desc}</p>
              </div>

              <div className="bg-white text-black w-14 h-14 flex items-center justify-center rounded-full font-bold shadow-md">
                {role.letter}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 🔷 HELP BUTTON */}
      <div className="fixed bottom-6 right-6">
        <button className="w-14 h-14 rounded-full bg-linear-to-r from-blue-500 to-purple-600 text-white text-xl shadow-lg hover:scale-110 transition">
          ?
        </button>
      </div>
    </div>
  );
};

export default RoleSelection;