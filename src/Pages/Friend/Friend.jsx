import React from 'react'
import Sidebar from '../../Component/Sidebar/Sidebar'
import Chat from '../../Component/Chat/Chat'
import FriendReqList from '../../Component/FriendReqList/FriendReqList'

const Friend = () => {
  return (
    <div>
         <div>
            <div className="md:flex">
              <div className="md:w-[75px] w-full">
                <Sidebar active="friend"></Sidebar>
              </div>
              <div className="md:w-[600px] w-full">
               <FriendReqList></FriendReqList>
              </div>
              <div className="w-full hidden md:block">
                <Chat></Chat>
              </div>
            </div>
          </div>
    </div>
  )
}

export default Friend