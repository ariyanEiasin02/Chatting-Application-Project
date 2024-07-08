import React, { useEffect, useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import personOne from '../../assets/person1.jpg'
import personTwo from '../../assets/person2.jpg'
import personThree from '../../assets/person3.jpg'
import personFour from '../../assets/person4.jpg'
import SimpleBarReact from "simplebar-react";
import 'simplebar-react/dist/simplebar.min.css';
import { getDatabase, ref, onValue,set, push } from "firebase/database";
import { useSelector } from 'react-redux'


const UserList = () => {
    const [userData, setUserData] = useState([])
    const [friendRequestData, setFriendRequestData] = useState([])
    const [friendRequestDataList, setFriendRequestDataList] = useState([])
    const [friendSearchList,setFriendSearchList] = useState([]);
    const db = getDatabase();
    const data = useSelector(state => state.userLogin.userInfo)
    useEffect(() => {
        const userRef = ref(db, 'users/');
        onValue(userRef, (snapshot) => {
            let arr = []
            snapshot.forEach((item) => {
                if (data.uid != item.key) {
                    arr.push({ ...item.val(), userid: item.key });
                }
            })
            setUserData(arr)
        });
    }, [])

    const handleFriendRequest = (item) => {
        set(push(ref(db, 'friendRequest/')), {
            sendername: data.displayName,
            senderid: data.uid,
            receivername : item.username,
            receiverid : item.userid,
        });
    }

    useEffect(() => {
        const friendRequest = ref(db, 'friendRequest/');
        onValue(friendRequest, (snapshot) => {
            let arr = []
            snapshot.forEach((item) => {
                arr.push(item.val().receiverid + item.val().senderid)
            })
           setFriendRequestData(arr)
        });
    }, [])

    useEffect(() => {
        const friendlist = ref(db, 'friend/');
        onValue(friendlist, (snapshot) => {
            let arr = []
            snapshot.forEach((item) => {
                arr.push(item.val().receiverid + item.val().senderid)
            })
            setFriendRequestDataList(arr)
        });
    }, [])

   const handleSearchList = (e)=>{
    let arr = []
    if(e.target.value.length == 0){
      setFriendSearchList([])
    }else{
      userData.filter((item)=>{
        if(item.username.toLowerCase().includes(e.target.value.toLowerCase())){
          arr.push(item)
         }
         setFriendSearchList(arr)
       })
    }
   }
    return (
        <div>
            <section className='bg-[#F5F7FB] h-screen'>
                <div className="">
                    <div className="px-4 pt-4">
                        <h2 className='font-public font-semibold text-xl text-[#343a40]'>Friend List</h2>
                    </div>
                    <div className="flex px-4 items-center mt-4">
                        <i className='bg-[#E6EBF5] font-public font-normal text-2xl text-[#343a40] rounded-l-xl py-4 px-4'><CiSearch /></i>
                        <input onChange={handleSearchList} className='bg-[#E6EBF5] font-public font-normal text-base outline-none text-[#A9AEB7] rounded-r-xl w-full py-4' type="email" placeholder='Search messages or users' />
                    </div>
                    <div className="px-4 mt-[20px]">
                        <h2 className='font-public font-semibold text-xl text-[#343a40]'>Suggestion</h2>
                        <SimpleBarReact style={{ maxHeight: 720 }}>
                            <div className="mb-[100px]">
                                {
                                    friendSearchList.length > 0 ?
                                    friendSearchList.map((item) => (
                                        <div className="flex items-center py-2 px-2 mt-4 rounded-md hover:bg-[#E6EBF5]">
                                            <div className="">
                                                <img className='w-[40px] h-[40px] rounded-full' src={personOne} alt="person" />
                                            </div>
                                            <div className="pl-[14px]">
                                                <h3 className='font-public font-normal text-xl text-[#000]'>{item.username}</h3>
                                                <p className='font-public font-normal text-base text-[#7a7f9a]'>hey! there I'm available</p>
                                            </div>
                                            <div className="ml-[40px]">
                                                {
                                                    friendRequestDataList.includes(data.uid + item.userid) ||  friendRequestDataList.includes(item.userid+data.uid) ?
                                                    <div className="font-public font-medium text-xl text-white bg-[#7269EF] py-3 px-5 rounded-xl w-full">Friend</div>
                                                    :
                                                    friendRequestData.includes(data.uid + item.userid) ||  friendRequestData.includes(item.userid+data.uid) ?
                                                    <div className="font-public font-medium text-xl text-white bg-[#7269EF] py-3 px-5 rounded-xl w-full">pending</div>
                                                    :
                                                    <div onClick={() => handleFriendRequest(item)} className="font-public font-medium text-xl text-white bg-[#7269EF] py-3 px-5 rounded-xl w-full cursor-pointer">+</div>
                                                }
                                            </div>
                                        </div>
                                    ))
                                    :
                                    userData.map((item) => (
                                        <div className="flex items-center py-2 px-2 mt-4 rounded-md hover:bg-[#E6EBF5]">
                                            <div className="">
                                                <img className='w-[40px] h-[40px] rounded-full' src={item.img} alt="" />
                                            </div>
                                            <div className="pl-[14px]">
                                                <h3 className='font-public font-normal text-xl text-[#000]'>{item.username}</h3>
                                                <p className='font-public font-normal text-base text-[#7a7f9a]'>hey! there I'm available</p>
                                            </div>
                                            <div className="ml-[40px]">
                                                {
                                                    friendRequestDataList.includes(data.uid + item.userid) ||  friendRequestDataList.includes(item.userid+data.uid) ?
                                                    <div className="font-public font-medium text-xl text-white bg-[#7269EF] py-3 px-5 rounded-xl w-full">Friend</div>
                                                    :
                                                    friendRequestData.includes(data.uid + item.userid) ||  friendRequestData.includes(item.userid+data.uid) ?
                                                    <div className="font-public font-medium text-xl text-white bg-[#7269EF] py-3 px-5 rounded-xl w-full">pending</div>
                                                    :
                                                    <div onClick={() => handleFriendRequest(item)} className="font-public font-medium text-xl text-white bg-[#7269EF] py-3 px-5 rounded-xl w-full cursor-pointer">+</div>
                                                }
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

export default UserList