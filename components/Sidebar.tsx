import React from 'react'
import { HomeIcon, BellIcon, EnvelopeIcon, UserIcon, QuestionMarkCircleIcon, BookmarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

type Props = {}

const Sidebar = (props: Props) => {
    return (
        <div className='h-[calc(100vh-50px)] top-[50px] sticky hidden md:inline-block  2xl:w-[calc((100vw-960px)/2)]'>
            <div className='flex flex-col h-full justify-center items-end pl-5'>
                <div className='space-y-5 border border-gray-300 rounded-md p-4 shadow-md'>
                    <Link href={`/home`}>
                        <button className='flex items-center space-x-3'>
                            <HomeIcon className='w-8 h-8' />
                            <div className='text-xl hidden 2xl:inline-block'>Home</div>
                        </button>
                    </Link>
                    <button className='flex items-center space-x-3'>
                        <QuestionMarkCircleIcon className='w-8 h-8' />
                        <div className='text-xl hidden 2xl:inline-block'>Questions</div>
                    </button>
                    <button className='flex items-center space-x-3'>
                        <BellIcon className='w-8 h-8' />
                        <div className='text-xl hidden 2xl:inline-block'>Notifications</div>
                    </button>
                    <button className='flex items-center space-x-3'>
                        <EnvelopeIcon className='w-8 h-8' />
                        <div className='text-xl hidden 2xl:inline-block'>Messages</div>
                    </button>
                    <button className='flex items-center space-x-3'>
                        <BookmarkIcon className='w-8 h-8' />
                        <div className='text-xl hidden 2xl:inline-block'>Bookmarks</div>
                    </button>
                    <button className='flex items-center space-x-3'>
                        <UserIcon className='w-8 h-8' />
                        <div className='text-xl hidden 2xl:inline-block'>Profile</div>
                    </button>

                </div>
            </div>
        </div>
    )
}

export default Sidebar