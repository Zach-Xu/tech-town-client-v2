import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Chat from '../../components/messages/Chat'
import MessagesList from '../../components/messages/MessagesList'
import { REQUEST_METHOD, TYPE } from '../../lib/constants'
import { protectedFetcher, protectedFetcherWithExtraParams } from '../../lib/fetcher'
import { sortInboxList } from '../../lib/helper'
import { updateSelectedInbox } from '../../redux/reducers'
import { InboxDTO } from '../../types/dto/inboxDTO'
import { InboxVO } from '../../types/vo/inboxVO'
import { ResponseResult } from '../../types/vo/response'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'

type Props = {}

const Messages = (props: Props) => {

    const dispatch = useDispatch()

    const [inboxes, setInboxes] = useState<InboxVO[]>([])

    const { data, error, isLoading, mutate } = useSWR({ url: '/api/inbox/all' }, protectedFetcher<ResponseResult<InboxVO[]>, null>, {
        onSuccess(data, key, config) {
            console.log('inboxes', data.data)
            if (data.code === 200 && data.data) {
                setInboxes(sortInboxList(data.data))
            }
        }
    })

    const { trigger } = useSWRMutation('/api/inbox', protectedFetcherWithExtraParams<ResponseResult<InboxVO>, InboxDTO>)

    const setSelectedInbox = (inbox?: InboxVO) => {
        if (inbox) {
            dispatch(updateSelectedInbox(inbox))
        } else {
            trigger({
                data: {
                    type: TYPE.BOT,
                    userId: 1,

                },
                method: REQUEST_METHOD.POST
            }, {
                onSuccess(data, key, config) {
                    console.log('create inbox successfully', data)
                    if (data.code === 201 && data.data) {
                        dispatch(updateSelectedInbox(data.data))
                    }
                },
            })
        }

    }

    return (
        <div className='max-w-[900px] md:py-5 md:px-10 mt-2 md:mt-0 mx-2 md:mx-0 flex flex-col h-full'>
            <header className='bg-white font-semibold text-gray-500 py-2 px-4 rounded-md shadow-md text-center md:text-left'>My messages</header>
            <section className='my-4 border-l shadow-md rounded-md overflow-hidden flex-1 '>
                <div className='flex h-full'>
                    <MessagesList inboxes={inboxes} setSelectedInbox={setSelectedInbox} error={error} />
                    <Chat mutate={mutate} />
                </div>
            </section>
        </div>
    )
}

export default Messages