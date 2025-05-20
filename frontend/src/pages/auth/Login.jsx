import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../../redux/reducers/authslice';
import { FcGoogle } from "react-icons/fc";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';

function LoginPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { loading, error, user } = useSelector((state) => state.auth);

    // Submit login
    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = { email, password };
        dispatch(loginUser(userData));
    };

    // Redirect on successful login
    useEffect(() => {
        if (user) {
            alert("Login Successfully");
            navigate("/");
        }
    }, [user, navigate]);

    const handleGoogleLogin = () => {
        console.log("Redirecting...");
        window.location.href = "http://localhost:8000/api/auth/google";
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className='w-full md:w-[50%] bg-white flex justify-center items-center py-3 md:p-5'>
                <div className='w-full max-w-md'>
                    <h3 className='text-2xl font-semibold mb-6'>Login to your account</h3>
                    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                        {/* Email */}
                        <div className='relative'>
                            <input
                                type="email"
                                value={email}
                                placeholder='Email'
                                onChange={(e) => setEmail(e.target.value)}
                                className='border border-gray-300 p-3 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 w-full'
                            />
                            <MdEmail className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
                        </div>

                        {/* Password */}
                        <div className='relative'>
                            <input
                                type="password"
                                value={password}
                                placeholder='Password'
                                onChange={(e) => setPassword(e.target.value)}
                                className='border border-gray-300 p-3 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 w-full'
                            />
                            <RiLockPasswordFill className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
                        </div>

                        {/* Forget Password */}
                        <div className='text-right text-sm'>
                            <Link to={"/forget-password"} className="text-green-600 hover:underline">
                                Forget Password?
                            </Link>
                        </div>

                        {/* Loading and Error */}
                        {loading && <p>Loading...</p>}
                        {error && <p className='text-red-500'>{error.message || error}</p>}

                        {/* Login Button */}
                        <button
                            type='submit'
                            className='bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-110'
                        >
                            Login
                        </button>

                        {/* OR Divider */}
                        <div className='flex items-center gap-2 my-5'>
                            <div className='flex-1 h-px bg-gray-300' />
                            <span className='text-gray-400 text-sm'>OR</span>
                            <div className='flex-1 h-px bg-gray-300' />
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

                        {/* Register Link */}
                        <p className='text-center text-sm mt-5'>
                            Don't have an account?
                            <Link to={"/register"} className="text-green-500 hover:underline px-2">Register</Link> here
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;

