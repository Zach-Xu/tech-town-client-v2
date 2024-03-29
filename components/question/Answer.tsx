import React, { useState } from 'react'
import Image from 'next/image'
import { getTimeSince } from '../../lib/helper'
import UserCard from '../widget/UserCard'
import store from '../../redux/store'
import { useRouter } from 'next/router'

type Props = {
    content: string
    createdTime: string
    username: string
    userId: number
    avatar: string | undefined | null
}

const Answer = ({ content, createdTime, username, userId, avatar }: Props) => {

    const [displayUserCard, setDisplayUserCard] = useState<boolean>(false)

    const router = useRouter()

    return (
        <div >
            <div dangerouslySetInnerHTML={{ __html: content }} className='flex flex-col'></div>
            <div className='flex justify-end space-x-10 mt-2'>
                <div className='p-2 relative'
                    onMouseLeave={() => setTimeout(() => {
                        if (!store.getState().isUserCardHovered) {
                            setDisplayUserCard(false)
                        }
                    }, 1000)}
                >
                    <UserCard display={displayUserCard} setDisplay={setDisplayUserCard} userId={userId} username={username} />
                    <p className='text-[0.7rem] text-gray-500'>{`Answered ${getTimeSince(createdTime)} ago`}</p>
                    <div className='flex items-center space-x-2 mt-1 md:mt-2'>
                        <Image src={avatar || '/default-user-image.png'} className='cursor-pointer' width={36} height={36} alt='user profile picture'
                            onMouseOver={() => setTimeout(() => { setDisplayUserCard(true) }, 500)} />
                        <span className='text-blue-500 hover:text-blue-400 text-sm cursor-pointer'
                            onMouseOver={() => setTimeout(() => { setDisplayUserCard(true) }, 500)}
                            onClick={() => router.push(`/profile/${userId}`)}>{username}</span>
                    </div>
                </div>
            </div>
            <hr />
        </div>
    )
}

export default Answer