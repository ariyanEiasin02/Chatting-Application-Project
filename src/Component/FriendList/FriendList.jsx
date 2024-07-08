import React, { useEffect, useState } from 'react'
import { CiSearch } from "react-icons/ci";
import personOne from '../../assets/person1.jpg'
import personTwo from '../../assets/person2.jpg'
import personThree from '../../assets/person3.jpg'
import personFour from '../../assets/person4.jpg'
import SimpleBarReact from "simplebar-react";
import 'simplebar-react/dist/simplebar.min.css';
import { getDatabase, ref, onValue, push, get, set, remove } from "firebase/database";
import { useDispatch, useSelector } from 'react-redux'
import activeChatSlice, { activeChat } from '../../slice/activeChatSlice';
import { useNavigate } from 'react-router-dom';

const FriendList = () => {
    const data = useSelector(state => state.userLogin.userInfo)
    const db = getDatabase();
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [friendSearchList, setFriendSearchList] = useState([]);
    const [friendNameList, setFriendNameList] = useState([]);

    useEffect(() => {
        const userRef = ref(db, 'friend/');
        onValue(userRef, (snapshot) => {
            let arr = []
            snapshot.forEach((item) => {
                if (data.uid == item.val().receiverid || data.uid == item.val().senderid) {
                    arr.push({ ...item.val(), key: item.key });
                }
            })
            setFriendNameList(arr)
        });
    }, [])

    const handleSearchList = (e) => {
        let arr = []
        if (e.target.value.length == 0) {
            setFriendSearchList([])
        } else {
            friendNameList.filter((item) => {
                if (item.sendername.toLowerCase().includes(e.target.value.toLowerCase())) {
                    arr.push(item)
                }
                setFriendSearchList(arr)
            })
        }
    }

    const hanleActive =(item)=>{
        navigate("/chat")
        if(item.receiverid == data.uid){
            dispatch(activeChat({status:"single", id:item.senderid,name:item.sendername}))
            localStorage.setItem("activeChat",JSON.stringify(({status:"single", id:item.senderid,name:item.sendername})))
          }else{
            dispatch(activeChat({status:"single", id:item.receiverid,name:item.receivername}))
            localStorage.setItem("activeChat",JSON.stringify(({status:"single", id:item.receiverid,name:item.receivername})))
          }
    }
    return (
        <div>
            <section className='bg-[#F5F7FB] h-screen'>
                <div className="">
                    <div className="px-4 pt-4">
                        <h2 className='font-public font-semibold text-xl text-[#343a40]'>Chats</h2>
                    </div>
                    <div className="flex px-4 items-center mt-4">
                        <i className='bg-[#E6EBF5] font-public font-normal text-2xl text-[#343a40] rounded-l-xl py-4 px-4'><CiSearch /></i>
                        <input onChange={handleSearchList} className='bg-[#E6EBF5] font-public font-normal text-base outline-none text-[#A9AEB7] rounded-r-xl w-full py-4' type="email" placeholder='Search messages or users' />

                    </div>
                    <div className="flex justify-between mt-6 px-4 gap-x-4 overflow-hidden">
                        <div className="relative mt-4">
                            <div className="h-14 md:w-20 w-16 rounded-md flex justify-center items-center bg-[#E6EBF5]">
                                <h5 className='font-public mt-2 font-semibold text-sm text-[#343a40]'>Patrick</h5>
                            </div>
                            <div className="relative absolute top-[-76px] left-[17px]">
                                <img className='w-[40px] h-[40px] relative rounded-full' src={personOne} alt="person" />
                                <div className="absolute bottom-[2px] left-8 w-2 h-2 bg-green-500 rounded-full border"></div>
                            </div>
                        </div>
                        <div className="relative mt-4">
                            <div className="h-14 w-20 rounded-md flex justify-center items-center bg-[#E6EBF5]">
                                <h5 className='font-public mt-2 font-semibold text-sm text-[#343a40]'>Doris</h5>
                            </div>
                            <div className="relative absolute top-[-76px] left-[17px]">
                                <img className='w-[40px] h-[40px] relative rounded-full' src={personTwo} alt="person" />
                                <div className="absolute bottom-[2px] left-8 w-2 h-2 bg-green-500 rounded-full border"></div>
                            </div>
                        </div>
                        <div className="relative mt-4">
                            <div className="h-14 w-20 rounded-md flex justify-center items-center bg-[#E6EBF5]">
                                <h5 className='font-public mt-2 font-semibold text-sm text-[#343a40]'>Emily</h5>
                            </div>
                            <div className="relative absolute top-[-76px] left-[17px]">
                                <img className='w-[40px] h-[40px] relative rounded-full' src={personThree} alt="person" />
                                <div className="absolute bottom-[2px] left-8 w-2 h-2 bg-green-500 rounded-full border"></div>
                            </div>
                        </div>
                        <div className="relative mt-4">
                            <div className="h-14 w-20 rounded-md flex justify-center items-center bg-[#E6EBF5]">
                                <h5 className='font-public mt-2 font-semibold text-sm text-[#343a40]'>Steve</h5>
                            </div>
                            <div className="relative absolute top-[-76px] left-[17px]">
                                <img className='w-[40px] h-[40px] relative rounded-full' src={personFour} alt="person" />
                                <div className="absolute bottom-[2px] left-8 w-2 h-2 bg-green-500 rounded-full border"></div>
                            </div>
                        </div>
                    </div>
                    <div className="px-4">
                        <h2 className='font-public font-semibold text-xl text-[#343a40]'>Recent</h2>
                        <SimpleBarReact style={{ maxHeight: 600 }}>
                            <div className="mb-[240px]">
                                {
                                    friendSearchList.length > 0 ?
                                        friendSearchList.map((item) => (
                                            <div className="flex items-center py-2 px-2 mt-4 rounded-md hover:bg-[#E6EBF5]">
                                                <div className="relative">
                                                    <img className='w-[40px] h-[40px] relative rounded-full' src={personOne} alt="person" />
                                                    <div className="absolute bottom-[2px] left-8 w-2 h-2 bg-green-500 rounded-full border"></div>
                                                </div>
                                                <div className="pl-[14px]">
                                                    <h3 className='font-public font-normal text-xl text-[#000]'>
                                                        {
                                                            data.uid == item.senderid ? item.receivername : item.sendername
                                                        }
                                                    </h3>
                                                    <p className='font-public font-normal text-base text-[#7a7f9a]'>hey! there I'm available</p>
                                                </div>
                                                <div className="ml-[40px]">
                                                    <p className='text-end font-public font-normal text-base text-[#7a7f9a]'>02:50 PM</p>
                                                </div>
                                            </div>
                                        ))
                                        :
                                        friendNameList.map((item) => (
                                            <div onClick={()=>hanleActive(item)} className="flex items-center py-2 px-2 mt-4 rounded-md hover:bg-[#E6EBF5]">
                                                <div className="relative">
                                                    <img className='w-[40px] h-[40px] relative rounded-full' src={personOne} alt="person" />
                                                    <div className="absolute bottom-[2px] left-8 w-2 h-2 bg-green-500 rounded-full border"></div>
                                                </div>
                                                <div className="pl-[14px]">
                                                    <h3 className='font-public font-normal text-xl text-[#000]'>
                                                        {
                                                            data.uid == item.senderid ? item.receivername : item.sendername
                                                        }
                                                    </h3>
                                                    <p className='font-public font-normal text-base text-[#7a7f9a]'>hey! there I'm available</p>
                                                </div>
                                                <div className="ml-[40px]">
                                                    <p className='text-end font-public font-normal text-base text-[#7a7f9a]'>02:50 PM</p>
                                                </div>
                                            </div>
                                        ))
                                }
                            </div>
                        </SimpleBarReact>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default FriendList