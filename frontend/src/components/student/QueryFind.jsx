import React, { useEffect, useState } from 'react'
import { IoNotificationsOutline } from "react-icons/io5";
import SearchBar from './../../pages/publicPages/home/SearcBar';
import { Link } from 'react-router-dom';
import { getNotification } from '../../redux/reducers/studentSlice';

function QueryFind() {
    const [notifications, setNotifications] = useState(0);

    useEffect(() => {
        const fetchNotification = async () => {
            const data = await getNotification();
            setNotifications(data.length)
        }
        fetchNotification()
    })
    return (
        <div className="flex justify-between items-center p-4 bg-gray-100 shadow-md">
        {/* Search Bar */}
        <div className="flex-1 max-w-xl">
          <SearchBar />
        </div>
  
        {/* Notification Icon and Count */}
        <div className="relative">
          <Link to="/notification" className="flex items-center space-x-2 text-gray-800 hover:text-blue-600">
            <IoNotificationsOutline size={24} />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {notifications}
              </span>
            )}
          </Link>
        </div>
      </div>
    )
}

export default QueryFind