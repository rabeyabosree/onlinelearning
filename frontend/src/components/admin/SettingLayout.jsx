import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";

function SettingLayout({ dashboardSettings }) {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  const userProfile = () => {
    if (role === "admin") {
      navigate("/admin/profile");
    } else if (role === "student") {
      navigate("/student/profile");
    } else {
      navigate("/login");
    }

  };


  // Filter the profile route from the dashboard settings
  const profileRoute = dashboardSettings.find((dashboard) => dashboard.name === "Profile");

  return (
    <div className="flex flex-col h-screen">
      {/* Logo Section */}
      <div className="text-3xl font-semibold text-blue-900 p-5 flex justify-center">
        <h1>
          Educo <span className="text-green-600">.</span>
        </h1>
      </div>

      {/* Dashboard Links Section */}
      <div className="flex flex-col space-y-4 flex-grow p-5">
        {dashboardSettings
          .filter((dashboard) => dashboard.name !== "Profile") // Exclude profile from the dashboard links
          .map((dashboard) => (
            <NavLink
              key={dashboard.name}
              to={dashboard.path}
              className={({ isActive }) =>
                isActive
                  ? "flex items-center space-x-4 p-3 rounded-md bg-blue-100 text-blue-600"
                  : "flex items-center space-x-4 p-3 rounded-md hover:bg-gray-100 cursor-pointer"
              }
            >
              <div className="text-xl text-blue-600">{dashboard.icon}</div>
              <h2 className="text-lg font-medium text-gray-800">{dashboard.name}</h2>
            </NavLink>
          ))}
      </div>

      {/* Profile Section at the Bottom */}
      {profileRoute && (
        <div
          className="flex items-center space-x-4 p-3 rounded-md hover:bg-gray-100 cursor-pointer justify-center"
          onClick={userProfile}
        >
          <div className="text-xl text-red-500">
            <FaRegUserCircle />
          </div>
          <h2 className="text-lg font-medium text-gray-800">{user.name}</h2>
        </div>
      )}
    </div>
  );
}

export default SettingLayout;








/**
 * import React from 'react'
import { BiChart } from "react-icons/bi";
import { IoSettingsOutline } from "react-icons/io5";
import { IoBagOutline } from "react-icons/io5";
import { LuSquareChartGantt } from "react-icons/lu";

function SettingLayout() {
    const dashborsSettings = [
        { name: "Dashbord", icon: <BiChart /> },
        { name: "all Courses", icon: <IoBagOutline /> },
        { name: "Lecture", icon: <LuSquareChartGantt /> },
        { name: "Settings", icon: <IoSettingsOutline /> },
    ]
    return (
        <div>
            <div>
                <h1>Educo <span>.</span></h1>

            </div>

            <div>
                {
                    dashborsSettings.map((dashboard)=>(
                        <div key={dashboard.name}>
                            <div>{dashboard.icon} <h2>{dashboard.name}</h2></div>
                        </div>
                    ))
                }

            </div>

            <div>
                profile
                
            </div>


        </div>
    )
}

export default SettingLayout
 */