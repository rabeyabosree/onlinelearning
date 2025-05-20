import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../redux/reducers/adminSlice';

function GetAllUsers() {
    const dispatch = useDispatch();
    const { users, loading, error } = useSelector((state) => state.admin);

    useEffect(() => {
        dispatch(getAllUsers()); // Fetch users on component mount
    }, [dispatch]);

    // Loading state
    if (loading) {
        return <div className="text-center">Loading...</div>; // Consider adding a spinner or loading animation here
    }
    console.log("fetch users error", error)
    // Error state
    if (error) {
        return <div className="text-center">{error.message || 'Something went wrong!'}</div>;
    }

    // Handle empty user array
    if (users.length === 0) {
        return <div className="text-center">No users found.</div>;
    }

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h1 className="text-2xl font-semibold text-center text-blue-900 mb-6">All Users</h1>
            <div className="space-y-4">
                {users.map((user) => {
                    const formattedDate = new Date(user.joinedTime).toLocaleDateString();

                    return (
                        <div
                            key={user._id} // Unique key for each user
                            className="flex items-center border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow ease-in-out"
                        >
                            {/* Profile Picture */}
                            <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                                <img
                                    src={user.profilePicture || '/default-profile.png'} // Default profile picture if not available
                                    alt={user.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* User Info */}
                            <div className="flex flex-col">
                                <h2 className="font-medium text-lg text-gray-800">{user.name}</h2>
                                <p className="text-sm text-gray-500">Joined on: {formattedDate}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default GetAllUsers;

