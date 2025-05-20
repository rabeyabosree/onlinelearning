import React, { useEffect, useState } from 'react';
import { getNotification, markNotification } from '../../pages/api/api';
import { useNavigate } from 'react-router-dom';

function Notification() {
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotif = async () => {
      const response = await getNotification();
      setNotifications(response);
    };
    fetchNotif(); // Call fetchNotif immediately
  }, []); // Empty array to run the effect once on mount

  const handleMarkNotif = async (id) => {
    await markNotification(id);
    navigate(`/courses/${id}`);
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg w-full max-w-2xl mx-auto">
      {notifications.length === 0 ? (
        <p className="text-center text-gray-600">No new notifications</p>
      ) : (
        <ul className="space-y-4">
          {notifications.map((notif) => (
            <li key={notif._id} className="bg-white shadow-lg rounded-lg p-4">
              <button
                className="w-full text-left hover:bg-gray-50 focus:outline-none"
                onClick={() => handleMarkNotif(notif._id)}
              >
                <div className="font-semibold text-gray-800">{notif.message}</div>
                <div className="text-sm text-gray-500 mt-1">
                  {/* Format the createdAt date to a readable format */}
                  {new Date(notif.createdAt).toLocaleString()}
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Notification;
