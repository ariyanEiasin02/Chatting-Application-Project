import React, { useState } from 'react'
import { RiUser2Line, RiUserVoiceLine, RiMessage3Line, RiGlobalLine, RiProfileLine } from "react-icons/ri";
import { LuUsers2 } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineDarkMode } from "react-icons/md";
import { AiOutlineLogout } from "react-icons/ai";
import icon from '../../assets/main.svg'
import person from '../../assets/person.jpg'
import { getAuth, signOut } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLoginInfo } from '../../slice/userSlice';

const Sidebar = ({ active }) => {
    const auth = getAuth();
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const data = useSelector(state => state.userLogin.userInfo)
    const [profileShow, setProfileShow] = useState(false)
    const handleProfile = () => {
        setProfileShow(!profileShow)
    }
    const handleLogOut = () => {
        signOut(auth).then(() => {
            dispatch(userLoginInfo(null))
            localStorage.removeItem('userLoginInfo')
            navigate('/login')
        }).catch((error) => {
            // An error happened.
        });

    }
    return (
        <div>
            <section className='h-screen md:block hidden bg-white'>
                <div className="text-center px-2 pt-4">
                    <div className="flex justify-center">
                        <Link to='/'><img className='w-[30px] h-[30px]' src={icon} alt="" /></Link>
                    </div>
                    <div className="mt-48">
                        <div className={`mt-2 flex group justify-center items-center hover:bg-primary ${active == 'profile' && "bg-primary"} w-14 h-14 rounded`}>
                            <i className={`text-2xl  ${active == 'profile' ? 'text-[#7269EF]' : 'text-[#878A92]'} font-public font-normal`}><Link to='/profile'><RiUser2Line /></Link></i>
                        </div>
                        <div className={`mt-2 flex group justify-center items-center hover:bg-primary ${active == 'message' && "bg-primary"} w-14 h-14 rounded`}>
                            <i className={`text-2xl  ${active == 'message' ? 'text-[#7269EF]' : 'text-[#878A92]'} font-public font-normal`}><Link to='/'><RiMessage3Line /></Link></i>
                        </div>
                        <div className={`mt-2 flex group justify-center items-center hover:bg-primary ${active == 'friend' && "bg-primary"} w-14 h-14 rounded`}>
                            <i className={`text-2xl  ${active == 'friend' ? 'text-[#7269EF]' : 'text-[#878A92]'} font-public font-normal`}><Link to='/friend'><LuUsers2 /></Link></i>
                        </div>
                        <div className={`mt-2 flex group justify-center items-center hover:bg-primary ${active == 'user' && "bg-primary"} w-14 h-14 rounded`}>
                            <i className={`text-2xl  ${active == 'user' ? 'text-[#7269EF]' : 'text-[#878A92]'} font-public font-normal`}><Link to='/user'><RiUserVoiceLine /></Link></i>
                        </div>
                        <div className={`mt-2 flex group justify-center items-center hover:bg-primary ${active == 'setting' && "bg-primary"} w-14 h-14 rounded`}>
                            <i className={`text-2xl  ${active == 'setting' ? 'text-[#7269EF]' : 'text-[#878A92]'} font-public font-normal`}><Link to='/setting'><IoSettingsOutline /></Link></i>
                        </div>
                    </div>
                    <div className="mt-40">
                        <div className="mt-2 flex group justify-center items-center hover:bg-primary w-14 h-14 rounded">
                            <i className="text-2xl text-[#878A92] group-hover:text-[#7269EF] font-public font-normal"><RiGlobalLine /></i>
                        </div>
                        <div className="mt-2 flex group justify-center items-center hover:bg-primary w-14 h-14 rounded">
                            <i className="text-2xl text-[#878A92] group-hover:text-[#7269EF] font-public font-normal"><MdOutlineDarkMode /></i>
                        </div>
                        <div onClick={handleProfile} className={`mt-2 ${active == 'profile' && "bg-primary"} relative flex group justify-center items-center hover:bg-primary w-14 h-14 rounded`}>
                            <img className="w-[30px] h-[30px] rounded-full text-2xl text-[#878A92] group-hover:text-[#7269EF] font-public font-normal" src={data.photoURL} alt="" />
                            <div className={`bg-white ${profileShow ? "block" : "hidden"}  absolute bottom-[55px] rounded-lg left-[4px] z-[3] shadow-2xl w-40`}>
                                <div className="flex hover:bg-[#F5F7FB] cursor-pointer justify-between items-center px-4 py-4">
                                    <h3 className='font-public font-normal text-xl text-[#878A92]'><Link to='/profile'>Profile</Link></h3>
                                    <i className="text-2xl text-[#878A92] font-public font-normal"><RiProfileLine /></i>
                                </div>
                                <div className="flex hover:bg-[#F5F7FB] cursor-pointer justify-between items-center px-4 py-4">
                                    <h3 className='font-public font-normal text-xl text-[#878A92]'><Link to='/setting'>Setting</Link></h3>
                                    <i className="text-2xl text-[#878A92] font-public font-normal"><IoSettingsOutline /></i>
                                </div>
                                <div onClick={handleLogOut} className="hover:bg-[#F5F7FB] cursor-pointer flex border-t-2 justify-between items-center px-4 py-4">
                                    <h3 className='font-public font-normal text-xl text-[#878A92]'>Log out</h3>
                                    <i className="text-2xl text-[#878A92] font-public font-normal"><AiOutlineLogout /></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className='block md:hidden w-full bg-primary px-2 fixed bottom-0 left-0 z-[30] h-[75px]'>
                <div className="">
                    <ul className="flex justify-between gap-x-4">
                        <li>
                            <div className={`mt-2 flex group justify-center items-center hover:bg-primary ${active == 'profile' && "bg-primary"} w-14 h-14 rounded`}>
                                <i className={`text-2xl  ${active == 'profile' ? 'text-[#7269EF]' : 'text-[#878A92]'} font-public font-normal`}><Link to='/profile'><RiUser2Line /></Link></i>
                            </div>
                        </li>
                        <li>
                            <div className={`mt-2 flex group justify-center items-center hover:bg-primary ${active == 'message' && "bg-primary"} w-14 h-14 rounded`}>
                                <i className={`text-2xl  ${active == 'message' ? 'text-[#7269EF]' : 'text-[#878A92]'} font-public font-normal`}><Link to='/'><RiMessage3Line /></Link></i>
                            </div>
                        </li>
                        <li>
                            <div className={`mt-2 flex group justify-center items-center hover:bg-primary ${active == 'friend' && "bg-primary"} w-14 h-14 rounded`}>
                                <i className={`text-2xl  ${active == 'friend' ? 'text-[#7269EF]' : 'text-[#878A92]'} font-public font-normal`}><Link to='/friend'><LuUsers2 /></Link></i>
                            </div>
                        </li>
                        <li>
                            <div className={`mt-2 flex group justify-center items-center hover:bg-primary ${active == 'user' && "bg-primary"} w-14 h-14 rounded`}>
                                <i className={`text-2xl  ${active == 'user' ? 'text-[#7269EF]' : 'text-[#878A92]'} font-public font-normal`}><Link to='/user'><RiUserVoiceLine /></Link></i>
                            </div>
                        </li>
                        <li>
                            <div className={`mt-2 flex group justify-center items-center hover:bg-primary ${active == 'setting' && "bg-primary"} w-14 h-14 rounded`}>
                                <i className={`text-2xl  ${active == 'setting' ? 'text-[#7269EF]' : 'text-[#878A92]'} font-public font-normal`}><Link to='/setting'><IoSettingsOutline /></Link></i>
                            </div>
                        </li>
                    </ul>
                </div>
            </section>
        </div>
    )
}

export default Sidebar