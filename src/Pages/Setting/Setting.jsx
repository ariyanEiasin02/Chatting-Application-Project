import React from 'react'
import Sidebar from '../../Component/Sidebar/Sidebar'
import Chat from '../../Component/Chat/Chat'
import SettingList from '../../Component/SettingList/SettingList'

const Setting = () => {
  return (
    <>
        <div>
            <div className="md:flex">
              <div className="md:w-[75px] w-full">
                <Sidebar active="setting"></Sidebar>
              </div>
              <div className="md:w-[500px] w-full">
                <SettingList></SettingList>
              </div>
              <div className="w-full hidden md:block">
                <Chat></Chat>
              </div>
            </div>
          </div>
    </>
  )
}

export default Setting