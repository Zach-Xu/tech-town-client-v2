import React from 'react'
import { SearchUserVo } from '../../types/vo/userVO'
import Image from 'next/image'
import { AcademicCapIcon } from '@heroicons/react/24/outline'
import { getTimeSince } from '../../lib/helper'
import useSWRMutation from 'swr/mutation'
import { protectedFetcherWithExtraParams } from '../../lib/fetcher'
import router, { useRouter } from 'next/router'
import { REQUEST_METHOD, TYPE } from '../../lib/constants'
import { AppState, updateSelectedInbox } from '../../redux/reducers'
import { InboxDTO } from '../../types/dto/inboxDTO'
import { InboxVO } from '../../types/vo/inboxVO'
import { ResponseResult } from '../../types/vo/response'
import { useDispatch, useSelector } from 'react-redux'
import Tag from '../widget/Tag'

type Props = {
    user: SearchUserVo
}

const SearchUser = ({ user }: Props) => {

    // create an inbox
    const { trigger } = useSWRMutation('/api/inbox', protectedFetcherWithExtraParams<ResponseResult<InboxVO>, InboxDTO>)

    const loggedInUser = useSelector((state: AppState) => state.user)

    const dispatch = useDispatch()

    const router = useRouter()

    const toMessagePage = (userId: number) => {

        trigger({
            data: {
                type: userId === 1 ? TYPE.BOT : TYPE.REGULAR,
                userId
            },
            method: REQUEST_METHOD.POST
        }, {
            onSuccess(data, key, config) {
                console.log('create inbox successfully', data)
                if (data.code === 201 && data.data) {
                    dispatch(updateSelectedInbox(data.data))
                    router.push(`/messages/${data.data.id}`)
                }
                if (data.code === 400) {
                    try {
                        const inboxId = Number(data.msg.split(':')[1].trim())
                        router.push(`/messages/${inboxId}`)
                    } catch (error) {
                        console.log('Invalid inbox Id')
                    }

                }
            },
        })

    }


    return (
        <div className='flex justify-between border border-gray-500 shadow-md px-3 py-4 bg-blue-50 rounded-md'>
            <div className='flex space-x-5 items-center flex-1'>
                <div className='relative w-16 h-16  md:w-20 md:h-20 lg:w-32 lg:h-32'>
                    <Image src={user.avatar || '/default-user-image.png'} fill={true} style={{ objectFit: 'cover' }} alt='profile picture' />
                </div>
                <div className='space-y-2 flex-1'>
                    <p className='font-semibold text-lg md:text-2xl hover:text-blue-500 cursor-pointer'
                        onClick={() => router.push(`/profile/${user.id}`)}
                    >{user.username}</p>
                    <div className='flex space-x-2 text-xs md:text-sm items-center'><AcademicCapIcon className='w-5 h-5 text-gray-400' /><span>Member for {getTimeSince(user.createdTime)} </span> </div>
                    {
                        user.bio && <p className='text-xs md:text-sm p-1'>{user.bio}</p>
                    }
                    {
                        user.skills &&
                        <div className='flex space-x-4'>
                            {
                                user.skills.map(skill => (
                                    <Tag tagName={skill} />
                                ))
                            }
                        </div>
                    }
                </div>
                {
                    loggedInUser?.id !== user.id && <div className='flex flex-col max-w-[200px] min-w-[100px] space-y-2 pr-2 md:pr-4'>
                        <button className="py-2 px-5 rounded-md text-sm bg-blue-400 hover:bg-blue-300 text-white border border-transparent ">
                            {
                                'Follow'
                            }
                        </button>
                        <button className="py-2 px-5 rounded-md text-sm bg-white hover:bg-gray-50 text-gray-500 border border-gray-500"
                            onClick={() => toMessagePage(user.id)}
                        >Message</button>
                    </div>
                }

            </div>

        </div>
    )
}

export default SearchUser