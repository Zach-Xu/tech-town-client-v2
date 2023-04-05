import React, { Dispatch } from 'react'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import { AppState, updateSelectedInbox, updateUserCardHoverState } from '../../redux/reducers'
import useSWR from 'swr'
import { protectedFetcher, protectedFetcherWithExtraParams } from '../../lib/fetcher'
import { UserCardVO } from '../../types/vo/userCardVO'
import { ResponseResult } from '../../types/vo/response'
import { useRouter } from 'next/router'
import useSWRMutation from 'swr/mutation'
import { REQUEST_METHOD, TYPE } from '../../lib/constants'
import { InboxDTO } from '../../types/dto/inboxDTO'
import { InboxVO } from '../../types/vo/inboxVO'

type Props = {
    display: boolean,
    setDisplay: Dispatch<React.SetStateAction<boolean>>
    userId: number
    username: string
}

const UserCard = ({ display, setDisplay, userId, username }: Props) => {

    const dispatch = useDispatch()

    const loggedInUser = useSelector((state: AppState) => state.user)

    const { data } = useSWR({ url: `/api/profile/user-card/${userId}` }, protectedFetcher<ResponseResult<UserCardVO>, null>, {
        revalidateOnFocus: true,
        revalidateOnMount: true,
        revalidateOnReconnect: false,
    })

    const router = useRouter()

    // create an inbox
    const { trigger } = useSWRMutation('/api/inbox', protectedFetcherWithExtraParams<ResponseResult<InboxVO>, InboxDTO>)

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
        <div className={`${display ? '' : ' hidden'} absolute bottom-24 right-0 card w-96 bg-base-100 shadow-xl border border-gray-400`}
            onMouseOver={() => dispatch(updateUserCardHoverState(true))}
            onMouseLeave={() => {
                dispatch(updateUserCardHoverState(false))
                setDisplay(false)
            }}
        >
            <div className="card-body py-5 px-4">
                <div className='flex items-start space-x-2 mt-1 md:mt-2'>
                    <Image src='/default-user-image.png' className='cursor-pointer' width={36} height={36} alt='user profile picture' />
                    <div className='space-y-3'>
                        <span className='text-blue-500 hover:text-blue-400 text-base cursor-pointer'>{username}</span>
                        <div className='text-xs md:text-sm flex space-x-3 text-gray-500'>
                            <p><span className='text-black'>{data?.data?.following}</span> following</p>
                            <p><span className='text-black'>{data?.data?.followers}</span> followers</p>
                            <p><span className='text-black'>{data?.data?.questions}</span> questions</p>
                            <p><span className='text-black'>{data?.data?.answers}</span> answers</p>
                        </div>
                        {
                            loggedInUser?.id === userId ? '' :
                                <div className="card-actions justify-start space-x-4">
                                    <button className="py-2 px-5 rounded-md text-sm bg-blue-400 hover:bg-blue-300 text-white border border-transparent ">
                                        {
                                            data?.data?.isFollowed ? 'Unfollow' : 'Follow'
                                        }
                                    </button>
                                    <button className="py-2 px-5 rounded-md text-sm bg-white hover:bg-gray-50 text-gray-500 border border-gray-500"
                                        onClick={() => toMessagePage(userId)}
                                    >Message</button>
                                </div>
                        }

                    </div>

                </div>

            </div>
        </div>
    )
}

export default UserCard