import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom'
import { verifyCode } from '../../../redux/reducers/authslice';

function VerifyPassword() {
    const [code, setCode] = useState("")
    const { state } = useLocation();
    const email = state?.email;

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleVaify = async () => {
        try {
            dispatch(verifyCode({ email, code }))
            navigate("/reset-password", { state: { email } })

        } catch (error) {
            console.error("code verify error", error)

        }
    }

    return (
        <div className='h-screen flex items-center justify-center bg-gray-300'>
            <div>
                <h1>VerifyPassword</h1>
                <input
                    type="text"
                    value={code}
                    onChange={(e) => e.target.value}
                    className='px-3 py-2 bg-transparent border border-black text-white'
                    placeholder='code'
                    minLength={6}
                />

                <button className='px-3 py-3 font-semibold bg-green-300 text-black'
                    onClick={handleVaify}>
                    verify
                </button>
            </div>
        </div>
    )
}

export default VerifyPassword