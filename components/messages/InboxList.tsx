import React, { Fragment } from 'react'
import Image from 'next/image'
import { InboxVO } from '../../types/vo/inboxVO'
import { getUser, getUsername, sortInboxList } from '../../lib/helper'
import { REQUEST_METHOD, TYPE } from '../../lib/constants'
import { useDispatch, useSelector } from 'react-redux'
import { AppState, updateInboxList, updateSelectedInbox } from '../../redux/reducers'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import { protectedFetcher, protectedFetcherWithExtraParams } from '../../lib/fetcher'
import { ResponseResult } from '../../types/vo/response'
import { InboxDTO } from '../../types/dto/inboxDTO'

type Props = {

}

const InboxList = (props: Props) => {

    const user = useSelector((state: AppState) => state.user)

    const dispatch = useDispatch()

    // fetch inbox list
    const { } = useSWR({ url: '/api/inbox/all' }, protectedFetcher<ResponseResult<InboxVO[]>, null>, {
        onSuccess(data, key, config) {
            if (data.code === 200 && data.data) {
                dispatch(updateInboxList(sortInboxList(data.data)))
            }
        }
    })

    const inboxList = useSelector((state: AppState) => state.inboxList)

    const router = useRouter()

    const inboxId = router.query.inboxId

    // create an inbox
    const { trigger } = useSWRMutation('/api/inbox', protectedFetcherWithExtraParams<ResponseResult<InboxVO>, InboxDTO>)

    const toMessagePage = (userId?: number, inbox?: InboxVO,) => {
        if (inbox) {
            dispatch(updateSelectedInbox(inbox))
            return router.push(`/messages/${inbox.id}`)
        }

        if (userId) {
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
                },
            })
        }
    }

    if (!user) {
        return <div>Loading...</div>
    }

    return (
        <div className='bg-white md:w-[200px] flex flex-col'>
            <p className='text-xs pl-5 py-2 text-gray-500 border-b hidden md:inline-block border-gray-200 w-full'>Recent Messages</p>
            <div className=''>
                {
                    inboxList.length > 0 && inboxList[0].type === TYPE.BOT ?
                        inboxList.map(inbox => (
                            <div key={inbox.id} className={`flex items-center px-4 py-3 space-x-3 hover:bg-gray-100 cursor-pointer ${inbox.id.toString() === inboxId ? 'bg-gray-200' : ''}`}
                                onClick={() => toMessagePage(undefined, inbox)}
                            >
                                <Image src={inbox.type === TYPE.BOT ? '/chatbot-icon.png' : getUser(user.id, inbox.participants[0], inbox.participants[1])?.avatar || '/default-user-image.png'} width={36} className='rounded-full' height={36} alt='user profile picture' />
                                <div className='hidden md:flex md:flex-col md:items-start md:justify-center'>
                                    <span className='text-[0.8rem] font-semibold'>{getUsername(user.id, inbox.participants[0], inbox.participants[1])}</span>
                                    {
                                        inbox.lastMessage && <span className='text-[0.8rem] font-semibold text-gray-400 truncate'>{inbox.lastMessage.content}</span>
                                    }
                                </div>
                            </div>
                        ))
                        :
                        <Fragment>
                            <div className={`flex items-center px-4 py-3 space-x-3 hover:bg-gray-100 cursor-pointer`}
                                onClick={() => toMessagePage(1)}>
                                <Image src={'/chatbot-icon.png'} width={36} className='rounded-full' height={36} alt='user profile picture' />
                                <div className='hidden md:inline-block'>
                                    <span className='text-[0.8rem] font-semibold'>Bot</span>
                                </div>
                            </div>
                            {
                                inboxList.map(inbox => (
                                    <div key={inbox.id} className={`flex items-center px-4 py-3 space-x-3 hover:bg-gray-100 cursor-pointer  ${inbox.id.toString() == inboxId ? 'bg-gray-200' : ''}`}
                                        onClick={() => toMessagePage(undefined, inbox)}>
                                        <Image src={getUser(user.id, inbox.participants[0], inbox.participants[1])?.avatar || '/default-user-image.png'} width={36} className='rounded-full' height={36} alt='user profile picture' />
                                        <div className='hidden md:flex md:flex-col md:items-start md:justify-center'>
                                            <span className='text-[0.8rem] font-semibold'>{getUsername(user.id, inbox.participants[0], inbox.participants[1])}</span>
                                            {
                                                inbox.lastMessage && <span className='text-[0.8rem] font-semibold text-gray-400 truncate'>{inboxList[0].lastMessage.content}</span>
                                            }
                                        </div>
                                    </div>
                                ))
                            }
                        </Fragment>

                }
            </div>
        </div>
    )
}

export default InboxList