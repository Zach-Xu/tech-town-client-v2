import React from 'react'
import { HomeIcon, BellIcon, EnvelopeIcon, UserIcon, QuestionMarkCircleIcon, BookmarkIcon } from '@heroicons/react/24/outline'

type Props = {}

const Sidebar = (props: Props) => {
    return (
        <div className='h-[calc(100vh-50px)] lg:w-[200px] md:w-[100px] hidden md:inline-block'>
            <div className='flex flex-col h-full justify-center items-center'>
                <div className='space-y-5 p-4 border rounded-3xl shadow-md md:ml-6 lg:ml-10'>
                    <button className='flex items-center space-x-3'>
                        <HomeIcon className='w-8 h-8' />
                        <div className='text-xl hidden lg:inline-block'>Home</div>
                    </button>
                    <button className='flex items-center space-x-3'>
                        <QuestionMarkCircleIcon className='w-8 h-8' />
                        <div className='text-xl hidden lg:inline-block'>Questions</div>
                    </button>
                    <button className='flex items-center space-x-3'>
                        <BellIcon className='w-8 h-8' />
                        <div className='text-xl hidden lg:inline-block'>Notifications</div>
                    </button>
                    <button className='flex items-center space-x-3'>
                        <EnvelopeIcon className='w-8 h-8' />
                        <div className='text-xl hidden lg:inline-block'>Messages</div>
                    </button>
                    <button className='flex items-center space-x-3'>
                        <BookmarkIcon className='w-8 h-8' />
                        <div className='text-xl hidden lg:inline-block'>Bookmarks</div>
                    </button>
                    <button className='flex items-center space-x-3'>
                        <UserIcon className='w-8 h-8' />
                        <div className='text-xl hidden lg:inline-block'>Profile</div>
                    </button>

                </div>
            </div>
        </div>
    )
}

export default Sidebar