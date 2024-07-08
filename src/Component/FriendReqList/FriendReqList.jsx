import React, { useEffect, useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import personOne from '../../assets/person1.jpg'
import personTwo from '../../assets/person2.jpg'
import personThree from '../../assets/person3.jpg'
import personFour from '../../assets/person4.jpg'
import SimpleBarReact from "simplebar-react";
import 'simplebar-react/dist/simplebar.min.css';
import { getDatabase, ref, onValue,set, push, remove } from "firebase/database";
import { useSelector } from 'react-redux'

const FriendReqList = () => {
    const db = getDatabase();
    const data = useSelector(state => state.userLogin.userInfo)
    const [friendListData, setFriendListData] = useState([])
    const [friendSearchList,setFriendSearchList] = useState([]);

    useEffect(() => {
        const friendRequest = ref(db, 'friendRequest/');
        onValue(friendRequest, (snapshot) => {
            let arr = []
            snapshot.forEach((item) => {
                if(item.val().receiverid == data.uid){

                    arr.push({...item.val() ,id:item.key});
                  }
            })
           setFriendListData(arr)
        });
    }, [])

    const handleFriendAccept = (item)=>{
        set(push(ref(db, 'friend/')), {
          ...item
        }).then(()=>{
          remove((ref(db, 'friendRequest/' + item.id)))
        }).then(()=>{
          console.log("okk");
        })
      }

      const handleSearchList = (e)=>{
        let arr = []
        if(e.target.value.length == 0){
          setFriendSearchList([])
        }else{
            friendListData.filter((item)=>{
            if(item.sendername.toLowerCase().includes(e.target.value.toLowerCase())){
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
                        <h2 className='font-public font-semibold text-xl text-[#343a40]'>Friend</h2>
                        <SimpleBarReact style={{ maxHeight: 720 }}>
                            <div className="">
                                {
                                    friendSearchList.length > 0 ?
                                    friendSearchList.map((item)=>(
                                        <div className="flex items-center py-2 px-2 mt-4 rounded-md hover:bg-[#E6EBF5]">
                                        <div className="">
                                            <img className='w-[40px] h-[40px] rounded-full' src={item.img} alt="person" />  
                                        </div>
                                        <div className="pl-[14px]">
                                            <h3 className='font-public font-normal text-xl text-[#000]'>{item.sendername}</h3>
                                            <p className='font-public font-normal text-base text-[#7a7f9a]'>hey! there I'm available</p>
                                        </div>
                                        <div className="ml-[10px]">
                                        <div onClick={()=>handleFriendAccept(item)} className="font-public font-medium text-xl text-white bg-[#7269EF] py-3 px-5 rounded-xl w-full cursor-pointer">Accept</div>
                                        </div>
                                    </div>
                                    ))
                                    :
                                    friendListData.map((item)=>(
                                        <div className="flex items-center py-2 px-2 mt-4 rounded-md hover:bg-[#E6EBF5]">
                                        <div className="">
                                            <img className='w-[40px] h-[40px] rounded-full' src={personOne} alt="person" />  
                                        </div>
                                        <div className="pl-[14px]">
                                            <h3 className='font-public font-normal text-xl text-[#000]'>{item.sendername}</h3>
                                            <p className='font-public font-normal text-base text-[#7a7f9a]'>hey! there I'm available</p>
                                        </div>
                                        <div className="ml-[10px]">
                                        <div onClick={()=>handleFriendAccept(item)} className="font-public font-medium text-xl text-white bg-[#7269EF] py-3 px-5 rounded-xl w-full cursor-pointer">Accept</div>
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

export default FriendReqList