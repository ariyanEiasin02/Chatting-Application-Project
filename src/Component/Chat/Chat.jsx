import React, { useEffect, useState } from 'react'
import personThree from '../../assets/person3.jpg'
import { CiSearch } from "react-icons/ci";
import { MdLocalPhone, MdAttachFile, MdInsertPhoto } from "react-icons/md";
import { RiUser2Line } from "react-icons/ri";
import { GoDeviceCameraVideo } from "react-icons/go";
import { BsThreeDots, BsEmojiSmile } from "react-icons/bs";
import { IoIosSend } from "react-icons/io"
import SimpleBarReact from "simplebar-react";
import 'simplebar-react/dist/simplebar.min.css';
import ModalImage from "react-modal-image";
import { useSelector } from 'react-redux';
import EmojiPicker from 'emoji-picker-react';
import { IoClose } from "react-icons/io5";
import { FaPhoneAlt,FaVideo,FaArrowLeft} from "react-icons/fa";
import { getDatabase, ref, onValue, push, get, set } from "firebase/database";
import { getDownloadURL, getStorage, ref as refs, uploadBytes } from "firebase/storage";
import { Link, useNavigate } from 'react-router-dom';
const Chat = () => {
  const storage = getStorage();
  const db = getDatabase();
  const navigate = useNavigate()
  const data = useSelector(state => state.userLogin.userInfo)
  const activeChat = useSelector(state => state.activeChatSlice)
  const [message, setMessage] = useState('')
  const [audioCall, setAudioCall] = useState(false)
  const [videoCall, setVideoCall] = useState(false)
  const [messagelist, setMessagelist] = useState([])
  const [showEmoji, setShowEmoji] = useState(false)
  const handleInput = (e) => {
    setMessage(e.target.value)
  }
  const handleAudioCall = () =>{
    setAudioCall(!audioCall)
  }
  const handleVideoCall = () =>{
    setVideoCall(!videoCall)
  }
  const handleMessageSend = () => {
    setMessage("")
    if (activeChat.active.status == 'single') {
      set(push(ref(db, 'singleMessage/')), {
        message: message,
        whosendid: data.uid,
        whosendname: data.displayName,
        whoreceiverid: activeChat.active.id,
        whoreceivername: activeChat.active.name,
        whodate: `${new Date().getFullYear()} - ${new Date().getMonth()} - ${new Date().getDay()},${new Date().getHours()} : ${new Date().getMinutes()}`
      })
    } else {
      console.log("group");
    }
  }

  useEffect(() => {
    const activeRef = ref(db, 'singleMessage/');
    onValue(activeRef, (snapshot) => {
      let arr = []
      snapshot.forEach((item) => {
        if (item.val().whosendid == data.uid || item.val().whoreceiverid == activeChat.active.id && item.val().whoreceiverid == data.uid || item.val().whosendid == activeChat.active.id) {
          arr.push(item.val()) ;
        }
      })
      setMessagelist(arr)
    });
  }, [activeChat])

  const handleImg = (e) => {
    const storageRef = refs(storage, 'some-child');
    uploadBytes(storageRef, e.target.files[0]).then((snapshot) => {
      getDownloadURL(storageRef).then((downloadURL) => {
        
        set(push(ref(db, 'singleMessage/')), {
          img: downloadURL,
          whosendid: data.uid,
          whosendname: data.displayName,
          whoreceiverid: activeChat.active.id,
          whoreceivername: activeChat.active.name,
          whodate: `${new Date().getFullYear()} - ${new Date().getMonth()} - ${new Date().getDay()},${new Date().getHours()} : ${new Date().getMinutes()}`
        })
      });
    });
  }
  const handleEmoji = (emoji)=>{
    setMessage(message+emoji.emoji)
}
const keyboardEvents = (event) =>{
  console.log(event.key);
  if(event.key == "Enter"){
      set(push(ref(db, 'singleMessage/')), {
          message: message,
          whosendid: data.uid,
          whosendname: data.displayName,
          whoreceiverid: activeChat.active.id,
          whoreceivername: activeChat.active.name,
          whodate: `${new Date().getFullYear()} - ${new Date().getMonth()} - ${new Date().getDay()},${new Date().getHours()} : ${new Date().getMinutes()}`
      })
  }
}
const handleBackToHome = () =>{
  navigate("/")
}
  return (
    <div>
      <section className='bg-white h-screen '>
        <div className="h-screen">
          <div className="px-6 py-6 border-b-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="mr-2">
                <Link onClick={handleBackToHome} className="text-xl text-[#878A92] font-public font-bold" href="#"><FaArrowLeft /></Link>
                </div>
                <div className="">
                  <img className="w-[40px] h-[40px] rounded-full" src={personThree} alt="" />
                </div>
                <div className="ml-[14px]">
                  <h3 className='font-public font-normal text-xl text-[#000]'>{activeChat.active.name}</h3>
                </div>
                <div className="md:block hidden mt-[2px] ml-[2px] w-2 h-2 bg-green-500 rounded-full border"></div>
              </div>
              <div className="">
                <ul className="flex justify-between md:gap-x-6 gap-x-4">
                  <li>
                    <Link className="text-2xl hidden md:block text-[#878A92] font-public font-bold" href="#"><CiSearch /></Link>
                  </li>
                  <li>
                    <Link onClick={handleAudioCall} className="text-2xl text-[#878A92] font-public font-bold" href="#"><MdLocalPhone /></Link>
                    {
                      audioCall &&
                      <div className="absolute top-[50%] left-[50%] -translate-x-2/4 -translate-y-2/4 z-[20] w-full md:w-[500px] rounded-xl py-12 bg-white shadow-xl">
                      <div className="">
                      <img className='w-28 h-28 rounded-full border-4 mx-auto' src={data.photoURL} alt="" />
                      </div>
                      <div className="mt-2 text-center">
                      <h3 className='font-public font-normal text-2xl text-[#343A40]'>{activeChat.active.name}</h3>
                      <p className='font-public relative font-light text-xl text-[#868CA0]'> Start Audio Call</p>
                      </div>
                      <div className="mt-6 flex justify-center">
                        <button onClick={handleAudioCall} className="flex items-center justify-center text-xl w-[60px] h-[60px] bg-[#ef476f] mr-4 rounded-full"><IoClose className="text-2xl text-white"/></button>
                        <button className="flex ml-4 items-center justify-center text-xl w-[60px] h-[60px] bg-[#06d6a0] rounded-full"><FaPhoneAlt className="text-2xl text-white"/></button>
                      </div>
                    </div>
                    }
                  </li>
                  <li>
                    <Link onClick={handleVideoCall} className="text-2xl text-[#878A92] font-public font-bold" href="#"><GoDeviceCameraVideo /></Link>
                    {
                      videoCall &&
                      <div className="absolute top-[50%] left-[50%] -translate-x-2/4 -translate-y-2/4 z-[20] w-full md:w-[500px] rounded-xl py-12 bg-white shadow-xl">
                      <div className="">
                      <img className='w-28 h-28 rounded-full border-4 mx-auto' src={data.photoURL} alt="" />
                      </div>
                      <div className="mt-2 text-center">
                      <h3 className='font-public font-normal text-2xl text-[#343A40]'>{activeChat.active.name}</h3>
                      <p className='font-public relative font-light text-xl text-[#868CA0]'> Start Video Call</p>
                      </div>
                      <div className="mt-6 flex justify-center">
                        <button onClick={handleVideoCall} className="flex items-center justify-center text-xl w-[60px] h-[60px] bg-[#ef476f] mr-4 rounded-full"><IoClose className="text-2xl text-white"/></button>
                        <button className="flex ml-4 items-center justify-center text-xl w-[60px] h-[60px] bg-[#06d6a0] rounded-full"><FaVideo  className="text-2xl text-white"/></button>
                      </div>
                    </div>
                    }
                  </li>
                  <li>
                    <Link className="text-2xl hidden md:block text-[#878A92] font-public font-bold" to='/profile'><RiUser2Line /></Link>
                  </li>
                  <li>
                    <Link  className="text-2xl text-[#878A92] font-public font-bold" to='/setting'><BsThreeDots /></Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="md:h-[700px] h-[500px]">
            <SimpleBarReact style={{ maxHeight: 700 }}>
              {
                messagelist.map((item) => (
                  item.whosendid == data.uid ?
                    item.message ?
                      <div className="mt-4 px-6">
                        <div className="flex justify-end">
                          <div className="relative mr-2">
                            <div className="bg-primary py-2 px-4 rounded-l-lg rounded-t-lg">
                              <h3 className='font-public font-normal text-xl text-[#3A3A40]'>{item.message}</h3>
                              <p className='font-public text-end font-light text-sm text-[#A9AEB7]'>12:00pm</p>
                              <div className="absolute bottom-[-8px] right-0 w-0 h-0 border-l-[15px] border-l-transparent border-b-[15px] border-b-transparent  border-t-[15px] border-solid border-t-primary"></div>
                            </div>
                          </div>
                          <div className="flex items-end">
                            <img className="w-[30px] h-[30px] rounded-full mt-16" src={personThree} alt="" />
                          </div>
                        </div>
                      </div>
                      :
                      <div className="my-4 px-6">
                        <div className="flex justify-end">
                          <div className="relative mr-2">
                            <div className="bg-primary py-2 px-4 rounded-l-lg rounded-t-lg">
                              <ModalImage
                                small={item.img}
                                large={item.img}
                                alt="Hello World!"
                                className="w-[300px]"
                              />
                              <p className='font-public text-end font-light text-sm text-[#A9AEB7]'>12:00pm</p>
                            </div>
                          </div>
                          <div className="flex items-end">
                            <img className="w-[30px] h-[30px] rounded-full" src={personThree} alt="" />
                          </div>
                        </div>
                      </div>
                    :
                    item.message ?
                      <div className="my-4 px-6">
                        <div className="flex">
                          <div className="flex items-end">
                            <img className="w-[30px] h-[30px] mt-16 rounded-full" src={personThree} alt="" />
                          </div>
                          <div className="ml-2 relative">
                            <div className="bg-[#7269EF] relative py-2 px-4 rounded-r-lg rounded-t-lg">
                              <h3 className='font-public font-normal text-xl text-white'>{item.message}</h3>
                              <p className='font-public text-end font-light text-sm text-[#A9AEB7]'>
                                12:00pm
                              </p>
                              <div className="absolute bottom-[-33px] left-0 w-0 h-0 border-r-[15px] border-r-transparent border-b-[15px] border-b-transparent  border-t-[15px] border-solid border-t-[#7269EF]"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      :
                      <div className="mt-4 px-6">
                        <div className="flex">
                          <div className="flex items-end">
                            <img className="w-[30px] h-[30px] rounded-full" src={personThree} alt="" />
                          </div>
                          <div className="ml-2 relative">
                            <div className="bg-[#7269EF] relative py-2 px-4 rounded-r-lg rounded-t-lg">
                              <ModalImage
                                small={item.img}
                                large={item.img}
                                alt="Hello World!"
                                className="w-[300px]"
                              />
                              <p className='font-public text-end font-light text-sm text-[#A9AEB7]'>12:00pm</p>
                            </div>
                          </div>
                        </div>
                      </div>
                ))
              }
            </SimpleBarReact>
          </div>
         
          <div className="relative py-6 px-6 border-t-2">
            <div className="flex justify-between items-center gap-x-2">
              <div className="md:w-[70%] w-[57%]">
                <input  onKeyPress={keyboardEvents} value={message} onChange={handleInput} className='bg-[#E6EBF5] font-public font-normal text-base outline-none text-[#000000] rounded-xl w-full px-6 py-4' type="text" placeholder='Enter Message...' />
              </div>
              <div className="w-[30%]">
                <ul className="flex md:gap-x-6 gap-x-2 items-center justify-end">
                  <li className="">
                    {
                      showEmoji &&
                      <div className="absolute bottom-28 right-6">
                        <EmojiPicker onEmojiClick={(emoji)=>handleEmoji(emoji)} />
                      </div>
                    }

                    <a onClick={() => setShowEmoji(!showEmoji)} className="md:text-2xl text-base group-hover:text-white text-[#7269EF] font-public font-bold" href="#"><BsEmojiSmile /></a>
                  </li>
                  <li className="">
                    <label >
                      <input onChange={handleImg} type="file" className="hidden" />
                      <MdAttachFile className='md:text-2xl text-base group-hover:text-white text-[#7269EF] font-public font-bold' />
                    </label>
                  </li>
                  <li className="">
                    <label >
                      <input onChange={handleImg} type="file" className="hidden" />
                      <MdInsertPhoto className='md:text-2xl text-base group-hover:text-white text-[#7269EF] font-public font-bold' />
                    </label>
                  </li>
                  <li onClick={handleMessageSend} className="bg-[#7269EF] p-4 rounded-md">
                    <a className="md:text-2xl text-base text-white font-public font-bold" href="#"><IoIosSend /></a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Chat