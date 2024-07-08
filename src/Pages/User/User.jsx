import React from 'react'
import Sidebar from '../../Component/Sidebar/Sidebar'
import UserList from '../../Component/UserList/UserList'
import Chat from '../../Component/Chat/Chat'

const User = () => {
  return (
    <div>
        <div>
            <div className="md:flex">
              <div className="md:w-[75px] w-full">
                <Sidebar active="user"></Sidebar>
              </div>
              <div className="md:w-[600px] w-full">
               <UserList></UserList>
              </div>
              <div className="w-full hidden md:block">
                <Chat></Chat>
              </div>
            </div>
          </div>
    </div>
  )
}

export default User