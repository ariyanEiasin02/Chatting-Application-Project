import React, { useState } from 'react'
import logo from '../../assets/logo.png'
import { MdOutlineEmail, MdErrorOutline } from "react-icons/md";
import { CiUser, CiLock, CiUnlock } from "react-icons/ci";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import { getDatabase, ref, set } from "firebase/database";
import { Rings } from 'react-loader-spinner'

const Register = () => {
  const auth = getAuth();
  const db = getDatabase();
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [lock, setLock] = useState(false)
  const [loading, setLoading] = useState(false)
  const [emailError, setEmailError] = useState('')
  const [userNameError, setUserNameError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const handleEmail = (e) => {
    setEmail(e.target.value)
    setEmailError("")
  }
  const handleuserName = (e) => {
    setUserName(e.target.value)
    setUserNameError("")
  }
  const handlepassword = (e) => {
    setPassword(e.target.value)
    setPasswordError("")
  }

  const hanleLock = () => {
    setLock(!lock)
  }
  const handleSubmit = () => {
    if (!email) {
      setEmailError("Required")
    } else {
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        setEmailError("Enter proper email");
      }
    }
    if (!userName) {
      setUserNameError("Required")
    }
    if (!password) {
      setPasswordError("Required")
    } else {
      if (!/^(?=.*[0-9]).{8,16}$/.test(password)) {
        setPasswordError("Please Enter At Least 8 Characters")
      }
    }
    if (email && userName && password && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) && /^(?=.*[0-9]).{8,16}$/.test(password)) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((user) => {
          updateProfile(auth.currentUser, {
            displayName: userName,
            photoURL: "./src/assets/person.jpg"
          })
            .then(() => {
              toast.success("Register User Successfully!")
              sendEmailVerification(auth.currentUser)
              setEmail('')
              setUserName('')
              setPassword('')
              setTimeout(() => {
                navigate('/login')
                }, 3000)
              setLoading(true)
            }).then(() => {
              set(ref(db, 'users/' + user.user.uid), {
                username: user.user.displayName,
                email: user.user.email,
              });
            })
            .catch((error) => {
              console.log(error.code);
            });
        }).catch((error) => {
          if (error.code.includes('auth/email-already-in-use')) {

            setEmailError("This Email Already Exist");
          }
        });
    }
  }
  return (
    <>
      <section className='md:h-screen bg-primary'>
        <div className="text-center py-12">
          <ToastContainer position="top-center" theme="dark" closeOnClick />
          <div className="w-[120px] mx-auto">
            <img src={logo} alt="logo" />
          </div>
          <div className="md:mt-8 mt-4">
            <h1 className='font-public font-semibold text-xl text-[#343a40]'>Register</h1>
            <p className='font-public font-light text-base mt-2 text-[#7a7f9a]'>Get your Chatvia account now.</p>
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
            <div className="mt-2 relative">
              <div className="text-left py-2">
                <label className='font-public font-medium text-xl text-[#343a40]'>Username</label>
              </div>
              <div className="flex items-center">
                <i className='bg-[#F8F9FA] font-public font-normal text-base text-[#343a40] rounded-l-xl p-5 border'><CiUser /></i>
                <input onChange={handleuserName} value={userName} className='border font-public font-normal text-base text-[#000] rounded-r-xl w-full py-4 px-6' type="email" placeholder='Enter Username' />
              </div>
              <div className="">
                <p className='font-public text-left font-medium text-base text-red-500 mt-2'>{userNameError}</p>
                {
                  userNameError ? <i className="text-red-500 text-xl absolute top-[65px] block right-[10px]"><MdErrorOutline className='' /></i> : <i className="text-red-500 text-xl absolute hidden top-[65px] right-[10px]"><MdErrorOutline className='' /></i>
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
                <input onChange={handlepassword} value={password} className='border font-public font-normal text-base text-[#000] rounded-r-xl w-full py-4 px-6' type={lock ? "text" : "password"} placeholder='Enter Password' />
              </div>
              <div className="">
                <p className='font-public text-left font-medium text-base text-red-500 mt-2'>{passwordError}</p>
                {
                  passwordError ? <i className="text-red-500 text-xl absolute top-[65px] block right-[10px]"><MdErrorOutline className='' /></i> : <i className="text-red-500 text-xl absolute hidden top-[65px] right-[10px]"><MdErrorOutline className='' /></i>
                }
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
                <div onClick={handleSubmit} className="mt-[30px] font-public font-medium text-xl text-white bg-[#6159CB] py-3 rounded-xl w-full cursor-pointer">Register</div>
            }

            <div className="mt-[20px]">
              <p className='font-public font-light text-base mt-2 text-[#7a7f9a]'>By registering you agree to the Chatvia <a className="text-[#6159CB] font-semibold" href="#">Terms of Use</a></p>
            </div>
          </div>
          <div className="mt-[40px]">
            <p className='font-public font-normal text-base mt-2 text-[#7a7f9a]'>Already have an account ? <Link to='/login' className='text-[#6159CB] text-semibold'>Sign In</Link></p>
            <p className='font-public font-normal text-base mt-2 text-[#7a7f9a]'>© 2024 Chatvia. Crafted with  by Themesbrand</p>
          </div>
        </div>
      </section>
    </>
  )
}

export default Register