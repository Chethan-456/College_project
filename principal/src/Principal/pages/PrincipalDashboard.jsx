import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import WelcomeCard from "../components/WelcomeCard";
import StatsCards from "../components/StatsCards";
import ManagementDashboard from "../components/ManagementDashboard";
import RecentActivities from "../components/RecentActivities";

const PrincipalDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-6 space-y-6">
          <WelcomeCard />
          <StatsCards />
          <ManagementDashboard />
          <RecentActivities />
        </main>
      </div>
    </div>
  );
};

export default PrincipalDashboard;
