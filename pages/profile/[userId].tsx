import { NextPage } from 'next'
import React, { useState } from 'react'
import Image from 'next/image'
import { AcademicCapIcon, PencilSquareIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Profile from '../../components/user/Profile'
import { useSelector } from 'react-redux'
import { protectedFetcher } from '../../lib/fetcher'
import { AppState } from '../../redux/reducers'
import { ProfileVO } from '../../types/vo/profileVO'
import { ResponseResult } from '../../types/vo/response'
import useSWR from 'swr'
import { getTimeSince } from '../../lib/helper'

type Props = {}

const ProfilePage: NextPage = (props: Props) => {

    const router = useRouter()

    const { query: { tab, userId } } = router

    const loggedInUser = useSelector((state: AppState) => state.user)

    const [profile, setProfile] = useState<ProfileVO>()

    const { data, isLoading } = useSWR({ url: `/api/profile/user/${userId}` }, protectedFetcher<ResponseResult<ProfileVO>, null>, {
        onSuccess(data, key, config) {
            if (data.code === 200 && data.data) {
                setProfile(data.data)
            }
        },
    })

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (!profile) {
        return <div>Loading...</div>
    }


    return (
        <div className='max-w-[900px] md:py-5 md:px-10 mt-2 md:mt-0 mx-2 md:mx-0'>
            <header className='flex  justify-between shadow-md px-3 py-4'>
                <div className='flex space-x-5 items-center'>
                    <div className='relative w-16 h-16  md:w-20 md:h-20 lg:w-32 lg:h-32'>
                        <Image src={'/default-user-image.png'} fill={true} style={{ objectFit: 'cover' }} alt='profile picture' />
                    </div>
                    <div className='space-y-2'>
                        <p className='font-semibold text-lg md:text-2xl lg:text-3xl'>{profile.username}</p>
                        <div className='flex space-x-2 text-xs md:text-sm items-center'><AcademicCapIcon className='w-5 h-5 text-gray-400' /><span>Member for {getTimeSince(profile.joinTime)} </span> </div>
                    </div>
                </div>
                {
                    userId === (loggedInUser?.id)?.toString() &&
                    <div>
                        <button className='flex items-center text-sm text-gray-500 space-x-1 bg-white p-2 rounded-md cursor-pointer hover:bg-gray-50'><PencilSquareIcon className='w-5 h-5 text-gray-400' /><span>Edit profile</span></button>
                    </div>
                }
            </header>
            <section className='mt-5'>
                <div className='flex space-x-5'>
                    <Link href={`/profile/${userId}`}>
                        <div className='cursor-pointer px-4 py-1 text-gray-600  text-sm rounded-full bg-white hover:bg-blue-50'>Profile</div>
                    </Link>
                    <Link href={`/profile/${userId}?tab=activity`}>
                        <div className='cursor-pointer px-4 py-1 text-gray-600  text-sm rounded-full bg-white hover:bg-blue-50'>Activity</div>
                    </Link>
                    <Link href={`/profile/${userId}?tab=repository`}>
                        <div className='cursor-pointer px-4 py-1 text-gray-600  text-sm rounded-full bg-white hover:bg-blue-50'>Repositories</div>
                    </Link>
                </div>

                {/* Profile */}

                {
                    !tab && <Profile profile={{ ...profile }} />
                }

                {/* Activity */}

                {
                    tab === 'activity' && <div>Acitivy</div>
                }

                {/* Repositories */}

                {
                    tab === 'repository' && <div>Repository</div>
                }


            </section>
        </div>
    )
}

export default ProfilePage