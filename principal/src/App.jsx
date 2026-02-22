import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// principal page
import PrincipalDashboard from "./Principal/pages/PrincipalDashboard";
import Messages from "./Principal/pages/messages";
import Departments from "./Principal/pages/departments";
import CommitteeManagement from "./Principal/pages/CommitteeManagement";
import FacultyManagement from "./Principal/pages/FacultyManagement";
import StudentAffairs from "./Principal/pages/StudentAffairs";
import ReportsAnalytics from "./Principal/pages/ReportsAnalytics";
import AcademicPlanning from "./Principal/pages/AcademicPlanning";
import ApprovalCenter from "./Principal/pages/ApprovalCenter";
import ADministration from "./Principal/pages/Administration";
import Notifications from "./Principal/pages/Notifications";
import Rollpage from "./Principal/pages/rolepage";
import AdminLogin from "./Principal/pages/Principallogin";

// hod page
import HODLogin from "./HOD/pages/HODlogin";

// faculty pages
import Facultylogin from "./Faculty/pages/FacultyLogin";
import FacultyDashboard from "./Faculty/pages/Facultydashboard";
import FacultyTimetable from "./Faculty/pages/Facultytimetable";
import FacultyHours from "./Faculty/pages/Facultyhours";
import FacultyNotificatins from "./Faculty/pages/Facultynotification";
import FacultyPlanner from "./Faculty/pages/Facultyplanner";
import FacultyMessage from "./Faculty/pages/Facultymessage";
import FacultyReg from "./Faculty/pages/Facultyregistration";



const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Rollpage />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        {/* Main Principal dashboard */}
        <Route path="/principal" element={<PrincipalDashboard />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/departments" element={<Departments />} />
        <Route path="/committee-management" element={<CommitteeManagement />} />
        <Route path="/faculty-management" element={<FacultyManagement />} />
        <Route path="/student-affairs" element={<StudentAffairs />} />
        <Route path="/academic-planning" element={<AcademicPlanning />} />
        <Route path="/reports-analytics" element={<ReportsAnalytics />} />
        <Route path="/approval-center" element={<ApprovalCenter />} />
        <Route path="/administration" element={<ADministration />} />
        <Route path="/notifications" element={<Notifications />} />
        {/* HOD PAGES */}
        <Route path="/hod" element={<HODLogin />} />
          {/* Faulty pages */}
        <Route path="/faculty" element={<Facultylogin />} /> 
        <Route path="/dashboard/faculty" element={<FacultyDashboard />} />
        <Route path="/timetable/faculty" element={<FacultyTimetable />} />
        <Route path="/hours/faculty" element={<FacultyHours />} />  
        <Route path="/notifications/faculty" element={<FacultyNotificatins />} /> 
        <Route path="/planner/faculty" element={<FacultyPlanner />} />
        <Route path="/messages/faculty" element={<FacultyMessage />} />
        <Route path="/register/faculty" element={<FacultyReg />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
