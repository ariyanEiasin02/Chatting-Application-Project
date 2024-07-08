import React from 'react'
import Sidebar from '../../Component/Sidebar/Sidebar'
import ProfileList from '../../Component/ProfileList/ProfileList'
import Chat from '../../Component/Chat/Chat'

const Profile = () => {
    return (
        <>
            <div>
                <div className="md:flex">
                    <div className="md:w-[75px] w-full">
                        <Sidebar active="profile"></Sidebar>
                    </div>
                    <div className="md:w-[500px] w-full">
                       <ProfileList></ProfileList>
                    </div>
                    <div className="w-full hidden md:block">
                    <Chat></Chat>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile