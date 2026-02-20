import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import PrincipalDashboard from "./pages/PrincipalDashboard";
import Messages from "./pages/messages"; // <-- create & import this page
import Departments from "./pages/departments";
import CommitteeManagement from "./pages/CommitteeManagement";
import FacultyManagement from "./pages/FacultyManagement";
import StudentAffairs from "./pages/StudentAffairs";
import ReportsAnalytics from "./pages/ReportsAnalytics";
import AcademicPlanning from "./pages/AcademicPlanning";
import ApprovalCenter from "./pages/ApprovalCenter";
import Administration from "./pages/Administration";
import Notifications from "./pages/Notifications";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Principal dashboard */}
        <Route path="/" element={<PrincipalDashboard />} />

        {/* Messages Page */}
        <Route path="/messages" element={<Messages />} />
        <Route path="/departments" element={<Departments />} />
        <Route path="/committee-management" element={<CommitteeManagement />} />
        <Route path="/faculty-management" element={<FacultyManagement />} />
        <Route path="/student-affairs" element={<StudentAffairs />} />
        <Route path="/academic-planning" element={<AcademicPlanning />} />
        <Route path="/reports-analytics" element={<ReportsAnalytics />} />
        <Route path="/approval-center" element={<ApprovalCenter />} />
        <Route path="/administration" element={<Administration />} />
        <Route path="/notifications" element={<Notifications />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;
