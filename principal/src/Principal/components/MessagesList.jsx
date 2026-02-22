
import { MessageCircle } from "lucide-react";
import React, { useState } from "react";
import NewMessageModal from "../components/NewMessageModal";

const messagesData = [
  {
    initials: "DP",
    name: "Dr. Priya Sharma (HOD - BCA)",
    message: "Budget approval needed for new lab equipment",
    time: "1 hour ago",
  },
  {
    initials: "AO",
    name: "Admin Officer",
    message: "Annual inspection scheduled next week",
    time: "3 hours ago",
  },
  {
    initials: "SC",
    name: "Student Council",
    message: "Request for cultural fest approval",
    time: "1 day ago",
  },
];

const MessagesList = () => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Messages</h2>

        <button onClick={() => setModalOpen(true)} 
        className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-md text-sm hover:bg-black transition">
          <MessageCircle size={18} />
          New Message
        </button>
      </div>
       {/* Modal */}
      <NewMessageModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />

      {/* Message Cards */}
      <div className="space-y-4">
        {messagesData.map((msg, index) => (
          <div
            key={index}
            className="flex items-start gap-4 bg-white rounded-lg p-5 shadow-sm hover:shadow-md transition cursor-pointer"
          >
            {/* Avatar Circle */}
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
              {msg.initials}
            </div>

            {/* Info */}
            <div className="flex-1">
              <p className="font-semibold text-gray-900">{msg.name}</p>
              <p className="text-gray-600 text-sm mt-1">{msg.message}</p>
              <p className="text-gray-400 text-xs mt-2">{msg.time}</p>
            </div>
          </div>
          
        ))}
        {/* Modal */}
      <NewMessageModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
      </div>
      
    </>
  );
};

export default MessagesList;
