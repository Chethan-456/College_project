import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import MessagesList from "../components/MessagesList";

const Messages = () => {
  return (
   <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-6 space-y-6">
          <MessagesList />
        </main>
      </div>
    </div>
  );
};

export default Messages;
