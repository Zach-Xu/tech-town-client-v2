import React from 'react'
import Image from 'next/image'

type Props = {}

const MessagesList = (props: Props) => {
    return (
        <div className='bg-white max-w-[200px] h-[75vh]'>
            <p className='text-xs pl-5 py-2 text-gray-500 border-b hidden md:inline-block border-gray-300'>Recent Messages</p>
            <div>
                <div className='flex items-center px-4 py-3 space-x-3 hover:bg-gray-200 cursor-pointer'>
                    <Image src={'/default-user-image.png'} width={36} className='rounded-full' height={36} alt='user profile picture' />
                    <div className='hidden md:inline-block'>
                        <span className='text-[0.8rem] font-semibold'>David King</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MessagesList