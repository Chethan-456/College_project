import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Bell } from "lucide-react";

const notificationsData = [
  {
    title: "New Faculty Application",
    time: "2 hours ago",
    color: "bg-red-500",
    urgent: true,
  },
  {
    title: "Board Meeting Tomorrow",
    time: "1 day ago",
    color: "bg-blue-500",
    urgent: false,
  },
  {
    title: "Student Grievance Report",
    time: "2 days ago",
    color: "bg-red-500",
    urgent: true,
  },
];

const Notifications = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header />

        <main className="p-6">
          {/* Page Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-800">
              Notifications
            </h1>

            <button className="px-4 py-2 text-sm bg-white border rounded-md hover:bg-gray-50">
              Mark All Read
            </button>
          </div>

          {/* Notifications List */}
          <div className="space-y-4">
            {notificationsData.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-white rounded-lg p-5 shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-center gap-4">
                  {/* Colored Dot */}
                  <div
                    className={`w-3 h-3 rounded-full ${item.color}`}
                  ></div>

                  {/* Text */}
                  <div>
                    <p className="font-semibold text-gray-900">
                      {item.title}
                    </p>
                    <p className="text-sm text-gray-500">{item.time}</p>
                  </div>
                </div>

                {/* Urgent Badge */}
                {item.urgent && (
                  <span className="text-xs bg-red-500 text-white px-3 py-1 rounded-full">
                    Urgent
                  </span>
                )}
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Notifications;
