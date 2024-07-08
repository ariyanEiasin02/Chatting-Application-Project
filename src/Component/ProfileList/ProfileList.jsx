import React, { useState } from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";
import person from '../../assets/person.jpg'
import { RiUser3Line } from "react-icons/ri";
import chevron from '../../assets/chevron-down.svg'
import { FaFileAlt } from "react-icons/fa";
import { RiDownload2Fill } from "react-icons/ri";
import { PiDotsThreeBold } from "react-icons/pi";
import { MdInsertPhoto } from "react-icons/md";
import SimpleBarReact from "simplebar-react";
import 'simplebar-react/dist/simplebar.min.css';
import { MdEdit } from "react-icons/md";
import { Accordion, AccordionItem as Item } from '@szhsin/react-accordion';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProfileList = () => {
    const data = useSelector(state => state.userLogin.userInfo)
    const AccordionItem = ({ header, ...rest }) => (
        <Item
            {...rest}
            header={({ state: { isEnter } }) => (
                <>
                    {header}
                    <img
                        className={`ml-auto transition-transform duration-200 ease-out ${isEnter && "rotate-180"
                            }`}
                        src={chevron}
                        alt="Chevron"
                    />
                </>
            )}
            className="border-b"
            buttonProps={{
                className: ({ isEnter }) =>
                    `flex w-full p-4 text-left hover:bg-slate-100 ${isEnter && "bg-slate-200"
                    }`
            }}
            contentProps={{
                className: "transition-height duration-200 ease-out"
            }}
            panelProps={{ className: "p-4" }}
        />
    );

    return (
        <div>
            <section className='bg-[#F5F7FB] h-screen'>
                <div className="pt-4">
                    <div className="flex px-4 justify-between items-center">
                        <h2 className='font-public font-semibold text-2xl text-[#343a40]'>My Profile</h2>
                        <i className="text-xl text-[#7A7F9A] font-public font-bold"><BsThreeDotsVertical /></i>
                    </div>
                    <div className="mt-[20px] px-4 pb-4 border-b-2">
                        <div className="relative">
                            <img className='w-28 h-28 rounded-full border-4 mx-auto' src={data.photoURL} alt="" />
                            <div className="absolute bottom-[-5px] right-[100px] md:right-[85px] w-12 h-12 bg-[#E6EBF5] rounded-full flex justify-center items-center">
                                <Link to='/profileupload'><i className="text-2xl"><MdEdit/></i></Link>
                            </div>
                        </div>
                        <div className="text-center mt-[30px] relative">
                            <h3 className='font-public font-normal text-xl text-[#343A40]'>{data.displayName}</h3>
                            <p className='font-public relative font-light text-base text-[#868CA0]'> Active</p>
                            <div className="w-2 h-2 bg-green-500 rounded-full absolute bottom-[8px] left-[38%]"></div>
                        </div>
                    </div>
                        <SimpleBarReact style={{ maxHeight: 600 }}>
                    <div className="mb-[100px]">
                        <div className="px-4 py-6">
                            <p className='font-public font-normal text-base text-[#7a7f9a]'>If several languages coalesce, the grammar of the resulting language is more simple and regular than that of the individual.</p>
                        </div>
                        <div className="px-4">
                    <Accordion>
                        <div className="bg-white">
                            <div className="">
                                <AccordionItem header="About">
                                    <div className="">
                                        <div className="">
                                            <h3 className='font-public font-medium text-base text-[#A9AEB7]'>Name</h3>
                                            <h5 className='font-public font-medium text-sm text-[#343a40]'>{data.displayName}</h5>
                                        </div>
                                        <div className="mt-4">
                                            <h3 className='font-public font-medium text-base text-[#A9AEB7]'>Email</h3>
                                            <h5 className='font-public font-medium text-sm text-[#343a40]'>{data.email}</h5>
                                        </div>
                                        <div className="mt-4">
                                            <h3 className='font-public font-medium text-base text-[#A9AEB7]'>Time</h3>
                                            <h5 className='font-public font-medium text-sm text-[#343a40]'>11:40 AM</h5>
                                        </div>
                                        <div className="mt-4">
                                            <h3 className='font-public font-medium text-base text-[#A9AEB7]'>Location</h3>
                                            <h5 className='font-public font-medium text-sm text-[#343a40]'>California, USA</h5>
                                        </div>
                                    </div>
                                </AccordionItem>
                            </div>
                        </div>

                        <div className="bg-white mt-[20px]">
                            <div className="">
                                <AccordionItem header="Attached Files">
                                    <div className="">
                                        <div className="border p-2 rounded flex justify-between">
                                            <div className="flex ">
                                                <div className="bg-primary w-12 h-12 rounded flex items-center justify-center">
                                                    <i className="text-2xl text-[#7269EF] font-public font-normal"><FaFileAlt /></i>
                                                </div>
                                                <div className="ml-[10px]">
                                                <h3 className='font-public font-normal text-base text-[#343A40]'>Admin-A.zip</h3>
                                                <p  className='font-public font-normal text-sm text-[#A9AEB7]'>12.5 MB</p>
                                            </div>
                                            </div>
                                           
                                            <div className="flex items-center justify-end gap-x-4">
                                            <i className="text-2xl text-[#A9AEB7] font-public font-normal"><RiDownload2Fill /></i>
                                            <i className="text-2xl text-[#A9AEB7] font-public font-normal"><PiDotsThreeBold  /></i>
                                            </div>
                                        </div>
                                        <div className="border mt-4 p-2 rounded flex justify-between">
                                            <div className="flex ">
                                                <div className="bg-primary w-12 h-12 rounded flex items-center justify-center">
                                                    <i className="text-2xl text-[#7269EF] font-public font-normal"><MdInsertPhoto /></i>
                                                </div>
                                                <div className="ml-[10px]">
                                                <h3 className='font-public font-normal text-base text-[#343A40]'>Image-1.jpg</h3>
                                                <p  className='font-public font-normal text-sm text-[#A9AEB7]'>12.5 MB</p>
                                            </div>
                                            </div>
                                           
                                            <div className="flex items-center justify-end gap-x-4">
                                            <i className="text-2xl text-[#A9AEB7] font-public font-normal"><RiDownload2Fill /></i>
                                            <i className="text-2xl text-[#A9AEB7] font-public font-normal"><PiDotsThreeBold  /></i>
                                            </div>
                                        </div>
                                        <div className="border mt-4 p-2 rounded flex justify-between">
                                            <div className="flex ">
                                                <div className="bg-primary w-12 h-12 rounded flex items-center justify-center">
                                                    <i className="text-2xl text-[#7269EF] font-public font-normal"><MdInsertPhoto /></i>
                                                </div>
                                                <div className="ml-[10px]">
                                                <h3 className='font-public font-normal text-base text-[#343A40]'>Image-2.jpg</h3>
                                                <p  className='font-public font-normal text-sm text-[#A9AEB7]'>12.5 MB</p>
                                            </div>
                                            </div>
                                           
                                            <div className="flex items-center justify-end gap-x-4">
                                            <i className="text-2xl text-[#A9AEB7] font-public font-normal"><RiDownload2Fill /></i>
                                            <i className="text-2xl text-[#A9AEB7] font-public font-normal"><PiDotsThreeBold  /></i>
                                            </div>
                                        </div>
                                        <div className="border mt-4 p-2 rounded flex justify-between">
                                            <div className="flex ">
                                                <div className="bg-primary w-12 h-12 rounded flex items-center justify-center">
                                                    <i className="text-2xl text-[#7269EF] font-public font-normal"><FaFileAlt /></i>
                                                </div>
                                                <div className="ml-[10px]">
                                                <h3 className='font-public font-normal text-base text-[#343A40]'>Landing-A.zip</h3>
                                                <p  className='font-public font-normal text-sm text-[#A9AEB7]'>12.5 MB</p>
                                            </div>
                                            </div>
                                           
                                            <div className="flex items-center justify-end gap-x-4">
                                            <i className="text-2xl text-[#A9AEB7] font-public font-normal"><RiDownload2Fill /></i>
                                            <i className="text-2xl text-[#A9AEB7] font-public font-normal"><PiDotsThreeBold  /></i>
                                            </div>
                                        </div>
                                    </div>
                                </AccordionItem>
                            </div>
                        </div>
                    </Accordion>
                    </div>
                    </div>
                    </SimpleBarReact>
                </div>
            </section>
        </div>
    )
}


export default ProfileList



