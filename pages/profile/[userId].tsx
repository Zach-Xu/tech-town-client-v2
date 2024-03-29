import { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Profile from '../../components/user/Profile'
import { useSelector } from 'react-redux'
import { protectedFetcher } from '../../lib/fetcher'
import { AppState } from '../../redux/reducers'
import { ProfileVO } from '../../types/vo/profileVO'
import { ResponseResult } from '../../types/vo/response'
import useSWR from 'swr'
import ProfileHeader from '../../components/user/ProfileHeader'
import GitHub from '../../components/user/GitHub'
import { getGitHubUsername } from '../../lib/helper'
import Activity from '../../components/user/Activity'
import { toast } from 'react-toastify'

type Props = {}

const ProfilePage: NextPage = (props: Props) => {

    const router = useRouter()

    const { query: { tab, userId } } = router

    const loggedInUser = useSelector((state: AppState) => state.user)

    const [profile, setProfile] = useState<ProfileVO>()

    const { isLoading, mutate } = useSWR({ url: `/api/profile/user/${userId}` }, protectedFetcher<ResponseResult<ProfileVO | null>, null>, {
        onSuccess(data, key, config) {
            if (data.code === 200 && data.data) {
                setProfile(data.data)
            } else {
                toast.error('Invalid user ID')
                router.push('/home')
            }

        },
    })

    useEffect(() => {
        mutate()
    }, [userId, loggedInUser])

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (!profile) {
        return <div>Loading...</div>
    }

    return (
        <div className='max-w-[900px] md:py-5 md:px-10  mx-2 md:mx-0'>
            <ProfileHeader isEditButtonDisplay={userId === (loggedInUser?.id)?.toString()} avatar={profile.avatar} username={profile.username} joinTime={profile.joinTime} />

            <section className='mt-5'>
                <div className='flex space-x-5'>
                    <Link href={`/profile/${userId}`}>
                        <div className={`cursor-pointer px-4 py-1  text-sm rounded-full hover:bg-orange-300 hover:text-white ${tab ? 'bg-white text-gray-600 ' : 'bg-orange-400 text-white'} `}>Profile</div>
                    </Link>
                    <Link href={`/profile/${userId}?tab=activity`}>
                        <div className={`cursor-pointer px-4 py-1  text-sm rounded-full hover:bg-orange-300 hover:text-white ${tab === 'activity' ? 'bg-orange-400 text-white' : 'bg-white text-gray-600'} `}>Activity</div>
                    </Link>
                    <Link href={`/profile/${userId}?tab=repository`}>
                        <div className={`cursor-pointer px-4 py-1  text-sm rounded-full  hover:bg-orange-300 hover:text-white ${tab === 'repository' ? 'bg-orange-400 text-white' : 'bg-white text-gray-600'} `}>Repositories</div>
                    </Link>
                </div>

                {/* Profile */}

                {
                    !tab && <Profile profile={{ ...profile }} />
                }

                {/* Activity */}

                {
                    tab === 'activity' && <Activity userId={Number(userId)} username={profile.username} />
                }

                {/* Repositories */}

                {
                    tab === 'repository' && <GitHub username={profile.github?.includes('github.com') ? getGitHubUsername(profile.github) : profile.github} />
                }


            </section>
        </div>
    )
}

export default ProfilePage