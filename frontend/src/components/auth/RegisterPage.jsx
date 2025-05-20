import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../redux/reducers/authslice';
import { useDispatch, useSelector } from 'react-redux';
import { FcGoogle } from "react-icons/fc";
import { FaUser } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";

function RegisterPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [name, setName] = useState("");  // Correctly using 'name' here
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    const { user, loading, error } = useSelector((state) => state.auth);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!role) {
            alert("Please select a role");
            return;
        }

        const userData = {
            name,  
            email,
            password,
            role
        };

        dispatch(registerUser(userData));
        alert("Registration Successful");
        navigate("/login");
    };

    const handleGoogleLogin = () => {
        window.location.href = "http://localhost:8000/api/auth/google";
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full md:w-[50%] bg-white flex justify-center items-center py-3 md:p-5">
                <div className="w-full max-w-md">
                    <h3 className="text-2xl font-semibold mb-6">Create an account</h3>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                        {/* Username */}
                        <div className="relative">
                            <input
                                type="text"
                                value={name}  // Binding 'name' state
                                placeholder="Username"
                                onChange={(e) => setName(e.target.value)}  // Handling 'name' update
                                className="border border-gray-300 p-3 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 w-full"
                                required
                            />
                            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>

                        {/* Email */}
                        <div className="relative">
                            <input
                                type="email"
                                value={email}  // Binding 'email' state
                                placeholder="Email"
                                onChange={(e) => setEmail(e.target.value)}  // Handling 'email' update
                                className="border border-gray-300 p-3 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 w-full"
                                required
                            />
                            <MdEmail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>

                        {/* Password */}
                        <div className="relative">
                            <input
                                type="password"
                                value={password}  // Binding 'password' state
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}  // Handling 'password' update
                                className="border border-gray-300 p-3 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 w-full"
                                required
                            />
                            <RiLockPasswordFill className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>

                        {/* Role Dropdown */}
                        <div className="relative">
                            <select
                                value={role}  // Binding 'role' state
                                onChange={(e) => setRole(e.target.value)}  // Handling 'role' update
                                className="border border-gray-300 p-3 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 w-full appearance-none"
                                required
                            >
                                <option value="">Select Role</option>
                                <option value="student">Student</option>
                                <option value="admin">Admin</option>
                            </select>
                            <RiLockPasswordFill className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>

                        {/* Remember Me */}
                        <div className="flex items-center text-sm gap-2 mb-2">
                            <input
                                type="checkbox"
                                id="rememberMe"
                                checked={rememberMe}  // Binding 'rememberMe' state
                                onChange={() => setRememberMe(!rememberMe)}  // Handling 'rememberMe' update
                                className="h-4 w-4 text-green-600"
                            />
                            <label htmlFor="rememberMe" className="text-green-700 cursor-pointer">
                                Remember Me
                            </label>
                        </div>

                        {/* Loading & Error */}
                        {loading && <p>Loading...</p>}
                        {error && <p className="text-red-500">{error.message}</p>}

                        {/* Register Button */}
                        <button
                            type="submit"
                            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-110"
                        >
                            Register
                        </button>

                        {/* OR Divider */}
                        <div className="flex items-center gap-2 my-5">
                            <div className="flex-1 h-px bg-gray-300" />
                            <span className="text-gray-400 text-sm">OR</span>
                            <div className="flex-1 h-px bg-gray-300" />
                        </div>

                        {/* Google Login */}
                        <button
                            type="button"
                            onClick={handleGoogleLogin}
                            className="bg-gray-300 text-black px-4 py-3 rounded flex gap-3 items-center justify-center transition-all duration-300 transform hover:scale-110"
                        >
                            <FcGoogle />
                            Login with Google
                        </button>

                        {/* Redirect to Login */}
                        <p className="text-center text-sm mt-5">
                            Already have an account?
                            <Link to="/login" className="text-green-500 hover:underline px-2">Login</Link> here
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;



