import React, { useState } from "react";
import { X, Users, UserCircle2, SendHorizonal, Mail } from "lucide-react";
const NewMessageModal = ({ isOpen, onClose }) => {

  const [selectedOption, setSelectedOption] = useState(null);

  if (!isOpen) return null;

  const handleSelect = (option) => setSelectedOption(option);


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      {/* Modal Container */}
      <div className="bg-white rounded-lg w-[600px] p-6 shadow-lg animate-scaleIn">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Compose Message</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            <X size={20} />
          </button>
        </div>

        {/* Message Textarea */}
        <div>
          <label className="text-sm font-semibold text-gray-700">Message Content</label>
          <textarea
            rows="4"
            className="w-full mt-1 border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Type your message here..."
          ></textarea>
        </div>

        {/* Send To Section */}
        <div className="mt-6">
          <label className="text-sm font-semibold text-gray-700">Send To:</label>

          <div className="grid grid-cols-2 gap-3 mt-2">

            <button
              onClick={() => handleSelect("hods")}
              className={`flex items-center gap-2 border rounded-md px-4 py-2 text-sm 
              ${selectedOption === "hods" ? "bg-gray-900 text-white" : "bg-white"}`}
            >
              <Users size={16} /> All HODs
            </button>

            <button
              onClick={() => handleSelect("faculty")}
              className={`flex items-center gap-2 border rounded-md px-4 py-2 text-sm 
              ${selectedOption === "faculty" ? "bg-gray-900 text-white" : "bg-white"}`}
            >
              <UserCircle2 size={16} /> All Faculty
            </button>

            <button
              onClick={() => handleSelect("all")}
              className={`flex items-center gap-2 border rounded-md px-4 py-2 text-sm 
              ${selectedOption === "all" ? "bg-gray-900 text-white" : "bg-white"}`}
            >
              <Users size={16} /> Post to All
            </button>

            <button
              onClick={() => handleSelect("personal")}
              className={`flex items-center gap-2 border rounded-md px-4 py-2 text-sm 
              ${selectedOption === "personal" ? "bg-gray-900 text-white" : "bg-white"}`}
            >
              <Mail size={16} /> Send Personally
            </button>

          </div>
        </div>

        {/* Email Input (only for Send Personally) */}
        {selectedOption === "personal" && (
          <div className="mt-4">
            <label className="text-sm font-semibold text-gray-700">Email Address</label>
            <input
              type="email"
              placeholder="Enter email address"
              className="w-full mt-1 border rounded-md p-3 focus:ring-2 focus:ring-blue-400"
            />
          </div>
        )}

        {/* Footer Buttons */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm border rounded-md hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            <SendHorizonal size={16} /> Send Message
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewMessageModal;

