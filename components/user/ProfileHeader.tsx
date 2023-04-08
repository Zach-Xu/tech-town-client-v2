import React from 'react'
import Image from 'next/image'
import { AcademicCapIcon, PencilSquareIcon } from '@heroicons/react/24/outline'
import { useSelector } from 'react-redux'
import { AppState } from '../../redux/reducers'
import { useRouter } from 'next/router'
import { getTimeSince } from '../../lib/helper'


type Props = {
    isEditButtonDisplay: boolean
    username: string
    joinTime: string
}

const ProfileHeader = ({ isEditButtonDisplay, username, joinTime }: Props) => {

    const router = useRouter()

    return (
        <header className='flex justify-between shadow-md px-3 py-4'>
            <div className='flex space-x-5 items-center'>
                <div className='relative w-16 h-16  md:w-20 md:h-20 lg:w-32 lg:h-32'>
                    <Image src={'/default-user-image.png'} fill={true} style={{ objectFit: 'cover' }} alt='profile picture' />
                </div>
                <div className='space-y-2'>
                    <p className='font-semibold text-lg md:text-2xl lg:text-3xl'>{username}</p>
                    <div className='flex space-x-2 text-xs md:text-sm items-center'><AcademicCapIcon className='w-5 h-5 text-gray-400' /><span>Member for {getTimeSince(joinTime)} </span> </div>
                </div>
            </div>
            {
                isEditButtonDisplay &&
                <div>
                    <button className='flex items-center text-sm text-gray-500 space-x-1 bg-white p-2 rounded-md cursor-pointer hover:bg-gray-50'
                        onClick={() => router.push('/profile/edit')}
                    ><PencilSquareIcon className='w-5 h-5 text-gray-400' /><span>Edit profile</span>
                    </button>
                </div>
            }
        </header>
    )
}

export default ProfileHeader