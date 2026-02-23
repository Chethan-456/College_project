import React from "react";

const stats = [
  { title: "Departments", value: "6", color: "text-blue-600" },
  { title: "Faculty", value: "85", color: "text-green-600" },
  { title: "Students", value: "1,200", color: "text-purple-600" },
  { title: "Courses", value: "45", color: "text-orange-600" },
];

const StatsCards = () => {
  return (
    <div className="grid grid-cols-4 gap-4 mb-6 ">
      {stats.map((item) => (
        <div
          key={item.title}
          className="bg-white  rounded-xl py-8 text-center shadow-sm"
        >
          <h3 className={`text-2xl font-bold ${item.color}`}>{item.value}</h3>
          <p className="text-gray-600 text-sm">{item.title}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
