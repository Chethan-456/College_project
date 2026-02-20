import React from "react";

const activities = [
  { title: "Faculty Meeting Completed", time: "2 hours ago", desc: "Discussed new curriculum updates", color: "bg-blue-50" },
  { title: "Budget Approval Processed", time: "4 hours ago", desc: "Approved lab equipment purchase", color: "bg-green-50" },
  { title: "New Faculty Interview Scheduled", time: "Tomorrow 10:00 AM", desc: "CS Department", color: "bg-purple-50" },
];

const RecentActivities = () => {
  return (
    <section className="bg-white p-4 rounded-xl shadow-sm border mt-6">
      <h2 className="text-lg font-semibold mb-3">Recent Activities</h2>
      <div className="space-y-2">
        {activities.map((act) => (
          <div
            key={act.title}
            className={`${act.color} rounded-lg p-3 flex flex-col`}
          >
            <h3 className="font-medium text-gray-800">{act.title}</h3>
            <p className="text-sm text-gray-600">{act.desc}</p>
            <span className="text-xs text-gray-500">{act.time}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentActivities;
