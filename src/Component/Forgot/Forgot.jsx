import React, { useState } from 'react'
import logo from '../../assets/logo.png'
import { MdErrorOutline, MdOutlineEmail } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
const Forgot = () => {
    const auth = getAuth();
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState('')

    const handleEmail = (e) => {
        setEmail(e.target.value)
        setEmailError("")
    }
    const handleRest = () => {
        if (!email) {
            setEmailError("Required")
        } else {
            if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
                setEmailError("Enter proper email");
            }
        }
        if (email && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            sendPasswordResetEmail(auth, email)
                .then(() => {
                    toast.success("Please Check Your Email!")
                    setTimeout(() => {
                        navigate('/login')
                    }, 3000)
                })
        }
    }
    return (
        <div>
            <section className='md:h-screen bg-primary'>
                <div className="text-center h-screen md:py-48 py-20">
                    <ToastContainer position="top-center" theme="dark" closeOnClick />
                    <div className="w-[120px] mx-auto">
                        <img src={logo} alt="logo" />
                    </div>
                    <div className="mt-8">
                        <h1 className='font-public font-semibold text-xl text-[#343a40]'>Reset Password</h1>
                        <p className='font-public font-light text-base mt-2 text-[#7a7f9a]'>Reset Password With Chatvia.</p>
                    </div>
                    <div className="bg-white mt-[30px] md:w-[500px] py-4 mx-auto shadow-xl rounded-xl px-6">
                        <div className="mt-2 relative">
                            <div className="text-left py-2">
                                <label className='font-public font-medium text-xl text-[#343a40]'>Email</label>
                            </div>
                            <div className="flex items-center">
                                <i className='bg-[#F8F9FA] font-public font-normal text-base text-[#343a40] rounded-l-xl p-5 border'><MdOutlineEmail /></i>
                                <input onChange={handleEmail} value={email} className='border font-public font-normal text-base text-[#000] rounded-r-xl w-full py-4 px-6' type="email" placeholder='Enter Email' />
                            </div>
                            <div className="">
                                <p className='font-public text-left font-medium text-base text-red-500 mt-2'>{emailError}</p>
                                {
                                    emailError ? <i className="text-red-500 text-xl absolute top-[65px] block right-[10px]"><MdErrorOutline className='' /></i> : <i className="text-red-500 text-xl absolute hidden top-[65px] right-[10px]"><MdErrorOutline className='' /></i>
                                }
                            </div>
                        </div>
                        <div onClick={handleRest} className="mt-[30px] font-public font-medium text-xl text-white bg-[#6159CB] py-3 rounded-xl w-full cursor-pointer">Reset</div>
                    </div>
                    <div className="mt-[40px]">
                        <p className='font-public font-normal text-base mt-2 text-[#7a7f9a]'>Already have an account ? <Link to='/login' className='text-[#6159CB] text-semibold'>Sign In</Link></p>
                        <p className='font-public font-normal text-base mt-2 text-[#7a7f9a]'>© 2024 Chatvia. Crafted with  by Themesbrand</p>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Forgot