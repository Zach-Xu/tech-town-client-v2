import { CheckIcon } from '@heroicons/react/24/outline'
import React from 'react'

type Props = {}

const Profile = (props: Props) => {
    return (
        <div >
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
            </div>
        </div>
    )
}

export default Profile