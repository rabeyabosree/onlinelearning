import React from "react";
import { Outlet } from "react-router-dom";
import SettingLayout from '../../components/admin/SettingLayout'; // Sidebar component
import RighSideBar from "../../components/admin/RighSideBar";
import { BiChart } from "react-icons/bi";
import { IoSettingsOutline } from "react-icons/io5";
import { IoBagOutline } from "react-icons/io5";
import { LuSquareChartGantt } from "react-icons/lu";
import { MdOutlineQuiz } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";

function AdminDashboard() {
  const dashboardSettings = [
      { name: "Dashboard", icon: <BiChart />, path: "/admin/" },
      { name: "All Courses", icon: <IoBagOutline />, path: "/admin/courses" },
      { name: "Create Courses", icon: <IoBagOutline />, path: "/admin/create" },
      { name: "All Students", icon: <LuSquareChartGantt />, path: "/admin/students" },
      { name: "Quizs", icon: <MdOutlineQuiz />, path: "/admin/quizs" },
      { name: "Settings", icon: <IoSettingsOutline />, path: "/admin/settings" },
      { name: "Profile", icon:  <FaRegUserCircle />, path: "/admin/profile" },
  ];
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
      {/* Sidebar Layout */}
      <SettingLayout dashboardSettings={dashboardSettings}/>

      {/* Content Area */}
      <div className="flex-grow p-5 col-span-3">
       <Outlet />
      </div>

      {/* Right Sidebar */}
      <div>
        <RighSideBar />
      </div>
    </div>
  );
}

export default AdminDashboard;






/**
 * import React from 'react'
import SettingLayout from '../../components/admin/SettingLayout'
import RighSideBar from '../../components/admin/RighSideBar'
import { Outlet} from 'react-router-dom'
import SettingLayout from './../../components/admin/SettingLayout';
import GetAllUsers from './../../components/admin/GetAllUsers';
import AdminHello from './../../components/admin/AdminHello';
import RighSideBar from './../../components/admin/RighSideBar';



function AdminDashnoard() {


    return (
      <div className='grid grid-cols-3 '>
<div>
<SettingLayout />
</div>
<div className="flex-grow p-5">
       
        <Outlet /> 
        </div>
        <div>
         <RighSideBar/>
        </div>
             
       
             </div>
           )
       }
       
       export default AdminDashnoard
 */