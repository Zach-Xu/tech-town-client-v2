import { NextPage } from 'next'
import React from 'react'
import Image from 'next/image'
import { AcademicCapIcon, PencilSquareIcon, CheckIcon } from '@heroicons/react/24/outline'

type Props = {}

const ProfilePage: NextPage = (props: Props) => {
    return (
        <div className='max-w-[900px] md:py-5 md:px-10 mt-2 md:mt-0 mx-2 md:mx-0'>
            <header className='flex  justify-between shadow-md px-3 py-4'>
                <div className='flex space-x-5 items-center'>
                    <div className='relative w-16 h-16  md:w-20 md:h-20 lg:w-32 lg:h-32'>
                        <Image src={'/default-user-image.png'} fill={true} style={{ objectFit: 'cover' }} alt='profile picture' />
                    </div>
                    <div className='space-y-2'>
                        <p className='font-semibold text-lg md:text-2xl lg:text-3xl'>David King</p>
                        <div className='flex space-x-2 text-xs md:text-sm items-center'><AcademicCapIcon className='w-5 h-5 text-gray-400' /><span>Member for 4 days </span> </div>
                    </div>
                </div>
                <div>
                    <button className='flex items-center text-sm text-gray-500 space-x-1 bg-white p-2 rounded-md cursor-pointer hover:bg-gray-50'><PencilSquareIcon className='w-5 h-5 text-gray-400' /><span>Edit profile</span></button>
                </div>
            </header>
            <section className='mt-5'>
                <div className='flex space-x-5'>
                    <div className='cursor-pointer px-4 py-1 text-gray-600  text-sm rounded-full bg-white hover:bg-blue-50'>Profile</div>
                    <div className='cursor-pointer px-4 py-1 text-gray-600  text-sm rounded-full bg-white hover:bg-blue-50'>Activity</div>
                    <div className='cursor-pointer px-4 py-1 text-gray-600  text-sm rounded-full bg-white hover:bg-blue-50'>Repositories</div>
                </div>
                {/* Conditional Render */}

                {/* Profile */}
                <div>
                    <h5 className='text-base md:text-xl mt-5 text-gray-800'>Status</h5>
                    <div className='flex space-x-10 mt-3 bg-white rounded-md shadow-md p-2 justify-evenly text-xs md:text-sm lg:text-base'>
                        <div className='flex flex-col items-center'>
                            <p className=' text-gray-500'>Following</p>
                            <p className=''>21</p>
                        </div>
                        <div className='flex flex-col items-center'>
                            <p className=' text-gray-500'>Followers</p>
                            <p className=''>6</p>
                        </div>
                        <div className='flex flex-col items-center'>
                            <p className=' text-gray-500'>Questions</p>
                            <p className=''>6</p>
                        </div>
                        <div className='flex flex-col items-center'>
                            <p className=' text-gray-500'>Answers</p>
                            <p className=''>6</p>
                        </div>
                    </div>
                    <h5 className='text-base md:text-xl mt-5 text-gray-800'>About</h5>
                    <div className='flex flex-col mt-3 bg-white opacity-90 rounded-md shadow-md p-2 text-xs md:text-sm lg:text-base space-y-4'>
                        {/* Bio */}
                        <div className='text-center'>
                            <h5 className='font-semibold text-base md:text-xl mb-2'>Bio</h5>
                            <p className='text-sm md:text-base text-black'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum amet, aut aperiam quaerat ea quasi?</p>
                        </div>
                        <hr />

                        {/* Skill Set */}
                        <div className='text-center'>
                            <h5 className='font-semibold text-base md:text-xl mb-2'>Skill Set</h5>
                            <div className='grid grid-cols-2 md:flex md:flex-row  justify-center  md:space-x-5 items-center'>
                                <div className='flex items-center space-x-1 md:ml-0 ml-4'>
                                    <CheckIcon className='h-6 w-6' /><span>JavaScript</span>
                                </div>
                                <div className='flex items-center space-x-1 md:ml-0 ml-4'>
                                    <CheckIcon className='h-6 w-6' /><span>C#</span>
                                </div>
                                <div className='flex items-center space-x-1 md:ml-0 ml-4'>
                                    <CheckIcon className='h-6 w-6' /><span>MySQL</span>
                                </div>
                                <div className='flex items-center space-x-1 md:ml-0 ml-4'>
                                    <CheckIcon className='h-6 w-6' /><span>React</span>
                                </div>
                                <div className='flex items-center space-x-1 md:ml-0 ml-4'>
                                    <CheckIcon className='h-6 w-6' /><span>Java</span>
                                </div>
                            </div>
                        </div>
                        {/* Skillset */}
                    </div>
                </div>

                {/* Activity */}

                {/* Repositories */}

            </section>
        </div>
    )
}

export default ProfilePage