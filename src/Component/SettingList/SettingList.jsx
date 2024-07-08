import React, { useState } from 'react'
import person from '../../assets/person.jpg'
import chevron from '../../assets/chevron-down.svg'
import SimpleBarReact from "simplebar-react";
import 'simplebar-react/dist/simplebar.min.css';
import { Accordion, AccordionItem as Item } from '@szhsin/react-accordion';
import { useSelector } from 'react-redux';

const SettingList = () => {
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
                        <h2 className='font-public font-semibold text-2xl text-[#343a40]'>Settings</h2>
                    </div>
                    <div className="mt-[20px] px-4 pb-4 border-b-2">
                        <div className="">
                            <img className='w-28 h-28 rounded-full border-4 mx-auto' src={data.photoURL} alt="" />
                        </div>
                        <div className="text-center mt-[30px] relative">
                            <h3 className='font-public font-normal text-xl text-[#343A40]'>{data.displayName}</h3>
                            <select className="font-public relative font-light text-base text-[#868CA0] bg-transparent" name="" id="">
                                <option className='' value="">Available</option>
                                <option value="">Busy</option>
                            </select>
                        </div>
                    </div>
                    <SimpleBarReact style={{ maxHeight: 600 }}>
                    <div className="mb-[115px]">
                        <div className="px-4">
                    <Accordion>
                        <div className="bg-white">
                            <div className="mt-[20px]">
                                <AccordionItem header="Personal Info">
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
                                <AccordionItem header="Privacy">
                                    <div className="">
                                        <div className="border-b-2 py-4 flex justify-between items-center">
                                            <div className="">
                                                <h3 className='font-public font-medium text-base text-[#343A40]'>Profile photo</h3>
                                            </div>
                                            <div className="">
                                                <select className="px-2 py-2 rounded" name="" id="">
                                                    <option value="">Everyone</option>
                                                    <option value="">selected</option>
                                                    <option value="">Nobody</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center border-b-2 py-4">
                                            <div className="">
                                                <h3 className='font-public font-medium text-base text-[#343A40]'>Last seen</h3>
                                            </div>
                                            <div className="">
                                               <input type="checkbox"/>
                                            </div>
                                        </div>
                                        <div className="border-b-2 py-4 flex justify-between items-center">
                                            <div className="">
                                                <h3 className='font-public font-medium text-base text-[#343A40]'>Status</h3>
                                            </div>
                                            <div className="">
                                                <select className="px-2 py-2 rounded" name="" id="">
                                                    <option value="">Everyone</option>
                                                    <option value="">selected</option>
                                                    <option value="">Nobody</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center border-b-2 py-4">
                                            <div className="">
                                                <h3 className='font-public font-medium text-base text-[#343A40]'>Read receipts</h3>
                                            </div>
                                            <div className="">
                                               <input type="checkbox"/>
                                            </div>
                                        </div>
                                        <div className="border-b-2 py-4 flex justify-between items-center">
                                            <div className="">
                                                <h3 className='font-public font-medium text-base text-[#343A40]'>Groups</h3>
                                            </div>
                                            <div className="">
                                                <select className="px-2 py-2 rounded" name="" id="">
                                                    <option value="">Everyone</option>
                                                    <option value="">selected</option>
                                                    <option value="">Nobody</option>
                                                </select>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </AccordionItem>
                            </div>
                        </div>

                        <div className="bg-white">
                            <div className="mt-[20px]">
                                <AccordionItem header="Security">
                                    <div className="">
                                        <div className="flex justify-between">
                                            <h3 className='font-public font-medium text-base text-[#A9AEB7]'>Show security notification</h3>
                                            <input type="checkbox"/>
                                        </div>
                                    </div>
                                </AccordionItem>
                            </div>
                        </div>
                        <div className="bg-white">
                            <div className="mt-[20px]">
                                <AccordionItem header="Help">
                                    <div className="">
                                        <div className="border-b-2 py-4">
                                            <h5 className='font-public font-medium text-xl text-[#343a40]'>FAQs</h5>
                                        </div>
                                        <div className="border-b-2 py-4">
                                            <h5 className='font-public font-medium text-xl text-[#343a40]'>Contact</h5>
                                        </div>
                                        <div className="py-4">
                                            <h5 className='font-public font-medium text-xl text-[#343a40]'>Terms & Privacy policy</h5>
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

export default SettingList