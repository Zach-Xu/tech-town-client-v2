import { NextPage } from 'next'
import React from 'react'
import Image from 'next/image'
import { AcademicCapIcon, PencilSquareIcon, CheckIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Profile from '../../components/user/Profile'

type Props = {}

const ProfilePage: NextPage = (props: Props) => {

    const router = useRouter()

    const { query: { tab } } = router

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
                    <Link href={'/profile'}>
                        <div className='cursor-pointer px-4 py-1 text-gray-600  text-sm rounded-full bg-white hover:bg-blue-50'>Profile</div>
                    </Link>
                    <Link href={'/profile?tab=activity'}>
                        <div className='cursor-pointer px-4 py-1 text-gray-600  text-sm rounded-full bg-white hover:bg-blue-50'>Activity</div>
                    </Link>
                    <Link href={'/profile?tab=repository'}>
                        <div className='cursor-pointer px-4 py-1 text-gray-600  text-sm rounded-full bg-white hover:bg-blue-50'>Repositories</div>
                    </Link>
                </div>

                {/* Profile */}

                {
                    !tab && <Profile />
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