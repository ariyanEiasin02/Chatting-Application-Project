import React, { useState } from 'react'
import logo from '../../assets/logo.png'
import { MdOutlineEmail, MdErrorOutline } from "react-icons/md";
import { CiLock, CiUnlock } from "react-icons/ci";
import { Link, useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, getAuth, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import { FcGoogle } from "react-icons/fc";
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { userLoginInfo } from '../../slice/userSlice';
import { Rings } from 'react-loader-spinner'

const Login = () => {
    const auth = getAuth();
    const dispatch = useDispatch()
    const provider = new GoogleAuthProvider();
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [lock, setLock] = useState(false)
    const [loading, setLoading] = useState(false)
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [emailPasswordError, setEmailPasswordError] = useState('')

    const handleEmail = (e) => {
        setEmail(e.target.value)
        setEmailError("")
    }

    const handlepassword = (e) => {
        setPassword(e.target.value)
        setPasswordError("")
    }

    const hanleLock = () => {
        setLock(!lock)
    }
    const handleGoole = () => {
        signInWithPopup(auth, provider)
            .then(() => {
                setTimeout(() => {
                    navigate("/")
                })
            })
    }
    const handleSubmit = () => {
        if (!email) {
            setEmailError("Required")
        } else {
            if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
                setEmailError("Enter Your Valid Email Address");
            }
        }
        if (!password) {
            setPasswordError("Required")
        } else {
            if (!/^(?=.*[0-9]).{8,16}$/.test(password)) {
                setPasswordError("Please Enter At Least 8 Characters")
            }
        }
        if (email && password && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) && /^(?=.*[0-9]).{8,16}$/.test(password)) {
            signInWithEmailAndPassword(auth, email, password)
                .then((user) => {
                    toast.success("LoginSuccessfully!")
                    dispatch(userLoginInfo(user.user))
                    localStorage.setItem("userLoginInfo", JSON.stringify(user.user))
                    setTimeout(() => {
                        navigate('/')
                        }, 3000)
                    setLoading(true)
                }).catch((error) => {
                    if (error.code.includes('auth/invalid-credential')) {
                        setEmailPasswordError("Invalid-credential");
                    }
                });
        }
    }
    return (
        <>
            <section className='md:h-screen bg-primary'>
                <div className="text-center py-16">
                    <ToastContainer position="top-center" theme="dark" closeOnClick />
                    <div className="w-[120px] mx-auto">
                        <img src={logo} alt="logo" />
                    </div>
                    <div className="md:mt-8 mt-4">
                        <h1 className='font-public font-semibold text-xl text-[#343a40]'>Sign in</h1>
                        <p className='font-public font-light text-base mt-2 text-[#7a7f9a]'>Sign in to continue to Chatvia.</p>
                    </div>
                    <div className="bg-white mt-[30px] md:w-[500px] py-8 mx-auto shadow-xl rounded-xl px-6">
                        <p className='font-public text-left font-medium text-base text-red-500 mt-2'>{emailPasswordError}</p>
                        <div className="mt-2 relative">
                            <div className="text-left py-2">
                                <label className='font-public font-medium text-xl text-[#343a40]'>Email</label>
                            </div>
                            <div className="flex items-center">
                                <i className='bg-[#F8F9FA] font-public font-normal text-base text-[#343a40] rounded-l-xl p-5 border'><MdOutlineEmail /></i>
                                <input onChange={handleEmail} className='border font-public font-normal text-base text-[#000] rounded-r-xl w-full py-4 px-6' type="email" placeholder='admin@themesbrand.com' />
                            </div>
                            <div className="">
                                <p className='font-public text-left font-medium text-base text-red-500 mt-2'>{emailError}</p>
                                {
                                    emailError ? <i className="text-red-500 text-xl absolute top-[65px] block right-[10px]"><MdErrorOutline className='' /></i> : <i className="text-red-500 text-xl absolute hidden top-[65px] right-[10px]"><MdErrorOutline className='' /></i>
                                }
                            </div>
                        </div>
                        <div className="mt-2 relative">
                            <div className="text-left py-2">
                                <label className='font-public font-medium text-xl text-[#343a40]'>Password</label>
                            </div>
                            <div className="flex items-center">
                                {
                                    lock ? <i onClick={hanleLock} className='bg-[#F8F9FA] font-public font-normal text-base text-[#343a40] rounded-l-xl p-5 border'><CiUnlock /></i> : <i onClick={hanleLock} className='bg-[#F8F9FA] font-public font-normal text-base text-[#343a40] rounded-l-xl p-5 border'><CiLock /></i>
                                }
                                <input onChange={handlepassword} className='border font-public font-normal text-base text-[#000] rounded-r-xl w-full py-4 px-6' type={lock ? "text" : "password"} placeholder='*****' />
                            </div>
                            <p className='font-public text-end py-2 font-medium text-base text-[#A9AEB7]'><Link to='/forgot'>Forgot Password?</Link></p>
                            <div className="">
                                <p className='font-public text-left font-medium text-base text-red-500 mt-2'>{passwordError}</p>
                                {
                                    passwordError ? <i className="text-red-500 text-xl absolute top-[65px] block right-[10px]"><MdErrorOutline className='' /></i> : <i className="text-red-500 text-xl absolute hidden top-[65px] right-[10px]"><MdErrorOutline className='' /></i>
                                }
                            </div>
                            <div onClick={handleGoole} className="flex w-64 mt-6 items-center border-2 border-border rounded-xl cursor-pointer">
                                <div className="pl-6 mr-2">
                                    <span><FcGoogle className='text-3xl' /></span>
                                </div>
                                <div className="">
                                    <h3 className='font-nunito font-normal text-xl text-regText tracking-normal py-4'>Login with Google</h3>
                                </div>
                            </div>
                        </div>
                        {
                            loading ?
                                <Rings
                                    visible={true}
                                    height="100"
                                    width="100"
                                    color="#4fa94d"
                                    ariaLabel="rings-loading"
                                    wrapperStyle={{}}
                                    wrapperClass="flex justify-center"
                                />
                                :
                                <div onClick={handleSubmit} className="mt-[30px] font-public font-medium text-xl text-white bg-[#6159CB] py-3 rounded-xl w-full cursor-pointer">Sign In</div>
                        }

                    </div>
                    <div className="mt-[40px]">
                        <p className='font-public font-normal text-base mt-2 text-[#7a7f9a]'>Don't have an account ?  ? <Link to='/register' className='text-[#6159CB] text-semibold'>Sign Up</Link></p>
                        <p className='font-public font-normal text-base mt-2 text-[#7a7f9a]'>© 2024 Chatvia. Crafted with  by Themesbrand</p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login