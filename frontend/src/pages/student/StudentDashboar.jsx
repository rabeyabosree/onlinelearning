import React from 'react';
import {  Outlet } from 'react-router-dom';
import RighSideBar from '../../components/admin/RighSideBar';
import SettingLayout from '../../components/admin/SettingLayout';
import { BiChart } from "react-icons/bi";
import { IoSettingsOutline, IoBagOutline } from "react-icons/io5";
import { LuSquareChartGantt } from "react-icons/lu";
import { MdOutlineQuiz } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";


function StudentDashboard() {
  const dashboardSettings = [
    { name: "Dashboard", icon: <BiChart />, path: "/student/" },
    { name: "All Courses", icon: <IoBagOutline />, path: "/student/courses" },
    { name: "Enrolled Courses", icon: <IoBagOutline />, path: "/student/enroll" },
    { name: "Quiz", icon: <MdOutlineQuiz />, path: "/student/quizs" },
    { name: "Certification", icon: <LuSquareChartGantt />, path: "/student/certification" },
    { name: "Settings", icon: <IoSettingsOutline />, path: "/student/settings" },
    { name: "Profile", icon: <FaRegUserCircle />, path: "/student/profile" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
      {/* Sidebar */}
      <SettingLayout dashboardSettings={dashboardSettings} />

      {/* Main Content Area */}
      <div className="flex-grow p-5 col-span-3">
       <Outlet />
      </div>

      {/* Optional Right Sidebar */}
      <div>
        <RighSideBar />
      </div>
    </div>
  );
}

export default StudentDashboard;
