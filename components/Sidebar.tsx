import React from 'react'
import { HomeIcon, BellIcon, EnvelopeIcon, UserIcon, QuestionMarkCircleIcon, BookmarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { AppState } from '../redux/reducers'
import useWebSocket from '../hooks/useWebSocket'
import { TECH_TOWN_TOKEN } from '../lib/constants'

type Props = {}

const Sidebar = (props: Props) => {

    const token = typeof window !== 'undefined' ? localStorage.getItem(TECH_TOWN_TOKEN) : null;

    useWebSocket(token);

    const loggedInUser = useSelector((state: AppState) => state.user)

    return (
        <div className='h-[calc(100vh-50px)] top-[50px] sticky hidden md:inline-block  2xl:w-[calc((100vw-960px)/2)]'>
            <div className='flex flex-col h-full justify-center items-end pl-5'>
                <div className='flex flex-col space-y-10 border border-gray-300 rounded-md p-4 shadow-md bg-white'>
                    <Link href={`/home`} className='hover:text-blue-300'>
                        <button className='flex items-center space-x-3'>
                            <HomeIcon className='w-8 h-8' />
                            <div className='text-xl hidden 2xl:inline-block'>Home</div>
                        </button>
                    </Link>

                    <Link href={`/questions`} className='hover:text-blue-300'>
                        <button className='flex items-center space-x-3'>
                            <QuestionMarkCircleIcon className='w-8 h-8' />
                            <div className='text-xl hidden 2xl:inline-block'>Questions</div>
                        </button>
                    </Link>

                    {/* ToDo */}
                    {/* <Link href={`/notifications`} className='hover:text-blue-300'>
                        <button className='flex items-center space-x-3'>
                            <BellIcon className='w-8 h-8' />
                            <div className='text-xl hidden 2xl:inline-block'>Notifications</div>
                        </button>
                    </Link> */}

                    <Link href={`/messages`} className='hover:text-blue-300'>
                        <button className='flex items-center space-x-3'>
                            <EnvelopeIcon className='w-8 h-8' />
                            <div className='text-xl hidden 2xl:inline-block'>Messages</div>
                        </button>
                    </Link>

                    <Link href={`/bookmarks`} className='hover:text-blue-300'>

                        <button className='flex items-center space-x-3'>
                            <BookmarkIcon className='w-8 h-8' />
                            <div className='text-xl hidden 2xl:inline-block'>Bookmarks</div>
                        </button>
                    </Link>
                    <Link href={`/profile/${loggedInUser?.id}`} className='hover:text-blue-300'>
                        <button className='flex items-center space-x-3'>
                            <UserIcon className='w-8 h-8' />
                            <div className='text-xl hidden 2xl:inline-block'>Profile</div>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Sidebar