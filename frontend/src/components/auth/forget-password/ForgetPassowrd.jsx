import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { forgetPassword } from '../../../redux/reducers/authslice'
import { useNavigate } from 'react-router-dom'

function ForgetPassowrd() {
    const [email, setEmail] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            dispatch(forgetPassword({ email }));
            navigate("/verify-code", { state: { email } })
        } catch (error) {
            console.error("forget email error", error)

        }

    }
    return (
        <div className='flex items-center justify-center bg-green-200 text-white h-screen'>
            <div>
                <h1>ForgetPassowrd</h1>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Enter Email'
                    className='px-6 py-4 text-black '
                />

                <button
                    onClick={handleSubmit}
                    className='px-6 py-4 bg-green-950 text-white cursor-pointer'>
                    next
                </button>
            </div>
        </div>
    )
}

export default ForgetPassowrd