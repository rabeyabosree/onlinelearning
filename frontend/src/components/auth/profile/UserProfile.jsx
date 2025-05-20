import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile, updateUserProfile } from '../../../redux/reducers/authslice';

function UserProfile() {
    const [profileData, setProfileData] = useState({
        name: "",
        email: "",
        profile: "",
        enrolledCourses: [],
        certificates: "",
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [file, setFile] = useState(null);

    const dispatch = useDispatch();

    // Fetch the user data from localStorage
    const loggedUser = JSON.parse(localStorage.getItem("user")); // Parse the stored string into an object
    const token = loggedUser ? loggedUser.token : null; // Access the token inside the object

    // Get the user data from Redux store
    const user = useSelector((state) => state.auth.user);

    // Fetch user profile data using Redux async thunk
    useEffect(() => {
        if (user) {
            // If user data is already available in Redux, set it in the state
            setProfileData({
                name: user.name,
                email: user.email,
                profile: user.profile || "",
                enrolledCourses: user.enrolledCourses || [],
                certificates: user.certificates || "",
            });
            setLoading(false);
        } else {
            // Otherwise, dispatch the fetchUserProfile action to fetch from backend
            const fetchProfile = async () => {
                try {
                    if (token) {
                        await dispatch(fetchUserProfile(token)); // Dispatch fetchUserProfile to get the user profile
                        setLoading(false);
                    } else {
                        setError("User not authenticated.");
                        setLoading(false);
                    }
                } catch (error) {
                    setError('Failed to load profile data');
                    setLoading(false);
                }
            };
            fetchProfile();
        }
    }, [dispatch, token, user]); // This effect will run whenever user or token changes

    // Handle form input changes
    const handleChange = (e) => {
        setProfileData({
            ...profileData,
            [e.target.name]: e.target.value,
        });
    };

    // Handle file input change (for profile picture)
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    // Handle form submission (updating user profile)
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', profileData.name);
        formData.append('email', profileData.email);
        if (file) {
            formData.append('profile', file); // Append the selected file to FormData
        }

        try {
            await dispatch(updateUserProfile({ token, formData })); // Dispatch updateUserProfile to update user data
            alert('Profile updated successfully!');
        } catch (error) {
            setError('Failed to update profile');
        }
    };

    // Loading and error states
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow-lg">
            <h1 className="text-2xl font-semibold text-center mb-6">User Profile</h1>

            {/* Profile image */}
            <div className="text-center mb-4">
                {profileData.profile && (
                    <img
                        src={profileData.profile}
                        alt="Profile"
                        className="w-24 h-24 rounded-full mx-auto"
                    />
                )}
            </div>

            {/* Profile Information */}
            <div className="mb-4">
                <h2 className="text-xl font-semibold">Personal Information</h2>
                <p><strong>Name:</strong> {profileData.name}</p>
                <p><strong>Email:</strong> {profileData.email}</p>
            </div>

            {/* Enrolled Courses */}
            <div className="mb-4">
                <h2 className="text-xl font-semibold">Enrolled Courses</h2>
                {profileData.enrolledCourses.length === 0 ? (
                    <p>No enrolled courses found.</p>
                ) : (
                    <ul>
                        {profileData.enrolledCourses.map((course, index) => (
                            <li key={index}>
                                <p><strong>Course:</strong> {course.course?.name}</p>
                                <p><strong>Progress:</strong> {course.progress}%</p>
                                <p><strong>Status:</strong> {course.status}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Certificates */}
            <div className="mb-4">
                <h2 className="text-xl font-semibold">Certificates</h2>
                {profileData.certificates ? (
                    <p>{profileData.certificates}</p>
                ) : (
                    <p>No certificates available.</p>
                )}
            </div>

            {/* Profile Update Form */}
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Update Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={profileData.name}
                        onChange={handleChange}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Update Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={profileData.email}
                        onChange={handleChange}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="profile" className="block text-sm font-medium text-gray-700">Update Profile Picture</label>
                    <input
                        type="file"
                        id="profile"
                        name="profile"
                        onChange={handleFileChange}
                        className="mt-1 block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border file:border-gray-300 file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
                    />
                </div>

                <div className="mb-4 text-center">
                    <button
                        type="submit"
                        className="w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 transition"
                    >
                        Update Profile
                    </button>
                </div>
            </form>
        </div>
    );
}

export default UserProfile;



