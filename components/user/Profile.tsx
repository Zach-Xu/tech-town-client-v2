import { CheckIcon } from '@heroicons/react/24/outline'
import React, { Fragment } from 'react'
import { ProfileTabVO } from '../../types/vo/profileVO'

type Props = {
    profile: ProfileTabVO
}

const Profile = ({ profile }: Props) => {


    return (
        <div >
            <h5 className='text-base md:text-xl mt-5 text-gray-800'>Status</h5>
            <div className='flex space-x-10 mt-3 bg-white rounded-md shadow-md p-2 justify-evenly text-xs md:text-sm lg:text-base'>
                <div className='flex flex-col items-center'>
                    <p className=' text-gray-500'>Following</p>
                    <p className=''>{profile.following}</p>
                </div>
                <div className='flex flex-col items-center'>
                    <p className=' text-gray-500'>Followers</p>
                    <p className=''>{profile.followers}</p>
                </div>
                <div className='flex flex-col items-center'>
                    <p className=' text-gray-500'>Questions</p>
                    <p className=''>{profile.questions}</p>
                </div>
                <div className='flex flex-col items-center'>
                    <p className=' text-gray-500'>Answers</p>
                    <p className=''>{profile.answers}</p>
                </div>
            </div>
            <h5 className='text-base md:text-xl mt-5 text-gray-800'>About</h5>
            <div className='flex flex-col mt-3 bg-white opacity-90 rounded-md shadow-md p-2 text-xs md:text-sm lg:text-base space-y-4'>
                {/* Bio */}
                <div className='text-center'>
                    <h5 className='font-semibold text-base md:text-xl mb-2'>Bio</h5>
                    <p className='text-sm md:text-base text-black'>{profile.bio || 'Waiting for user to update'}</p>
                </div>


                {/* Skill Set */}
                {
                    profile.skills && profile.skills.length > 0 &&
                    <Fragment>
                        <hr />
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
                    </Fragment>
                }

            </div>
        </div>
    )
}

export default Profile