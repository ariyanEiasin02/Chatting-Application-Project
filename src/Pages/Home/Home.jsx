import React, { useEffect, useState } from 'react'
import Forgot from '../../Component/Forgot/Forgot'
import Sidebar from '../../Component/Sidebar/Sidebar'
import FriendList from '../../Component/FriendList/FriendList'
import Chat from '../../Component/Chat/Chat'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from "firebase/auth";


const Home = () => {
  const auth = getAuth();
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [verified, setVerified] = useState(false)
  const data = useSelector(state => state.userLogin.userInfo)
  useEffect(() => {
    if (!data) {
      navigate("/login")
    }
  }, [])
 
 useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{
      if(user.emailVerified){
        setVerified(true)
      }
    })
  })
  return (
    <>
      {
        verified ?
          <div>
            <div className="md:flex">
              <div className="w-[75px]">
                <Sidebar active="message"></Sidebar>
              </div>
              <div className="md:w-[600px] w-full">
                <FriendList></FriendList>
              </div>
              <div className="md:w-full hidden md:block">
                <Chat></Chat>
              </div>
            </div>
          </div>
          :
          <div className="bg-[#F5F7FB] h-screen flex justify-center items-center">
            <div className="text-center">
            <h2 className='font-public w-[70%] mx-auto md:w-full md:mx-0 font-semibold md:text-6xl text-3xl text-[#343a40]'>Please Verified Your Email</h2>
            <div className="flex justify-center inline-block"><Link  className="mt-[30px] font-public font-medium text-xl text-white bg-[#6159CB] py-3 rounded-xl py-2 px-6 cursor-pointer" to='/login'>Back To Login</Link></div>
  
            </div>
          </div>
      }
    </>
  )
}

export default Home