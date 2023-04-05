import React, { useState } from 'react'
import { PaperAirplaneIcon } from '@heroicons/react/24/solid'
import ChatBox from './ChatBox'
import useSWR, { KeyedMutator } from 'swr'
import { protectedFetcher } from '../../lib/fetcher'
import { MessageVO } from '../../types/vo/messageVO'
import { ResponseResult } from '../../types/vo/response'
import { useSelector } from 'react-redux'
import { AppState, } from '../../redux/reducers'
import { FetchConfig } from '../../types/dto/fetchConfig'
import { MessageDTO } from '../../types/dto/messageDTO'
import { REQUEST_METHOD, TYPE } from '../../lib/constants'
import useSWRMutation from 'swr/mutation'
import { getUser, getUserId, sortMessages } from '../../lib/helper'
import { toast } from 'react-toastify'
import { InboxVO } from '../../types/vo/inboxVO'

type Props = {
    mutate: KeyedMutator<ResponseResult<InboxVO[]>>
}

const Chat = ({ mutate }: Props) => {

    const inbox = useSelector((state: AppState) => state.selectedInbox)

    const loggedInUser = useSelector((state: AppState) => state.user)

    const [message, setMessage] = useState<string>('')

    const [messages, setMessages] = useState<MessageVO[]>([])

    const { isLoading } = useSWR({ url: `/api/inbox/${inbox?.id}` }, protectedFetcher<ResponseResult<MessageVO[]>, null>, {
        onSuccess(data, key, config) {
            if (data.code === 200 && data.data) {
                setMessages(sortMessages(data.data))
            }
        },
    })


    const sendMessageParams: FetchConfig<MessageDTO> = {
        data: {
            content: message,
            receiverId: getUserId(loggedInUser?.id, inbox?.participants[0], inbox?.participants[1]),
            type: getUserId(loggedInUser?.id, inbox?.participants[0], inbox?.participants[1]) === 1 ? TYPE.BOT : TYPE.REGULAR
        },
        method: REQUEST_METHOD.POST,
        url: '/api/inbox/message',
    }

    const { trigger, isMutating: isMessageLoading, data, error } = useSWRMutation(sendMessageParams, protectedFetcher<ResponseResult<MessageVO>, MessageDTO>, {
        onSuccess(data, key, config) {
            mutate()
            // if fetched message was sent from chatbot, append the message to message list
            if (data.code === 201 && data.data && data.data.sender.id === 1) {
                setMessages(msgs => [...msgs, data.data!])
            }
        }
    })

    const sendMessage = () => {
        if (!inbox) {
            return toast.error('Please select a user to send the message')
        }
        trigger()
        setMessage('')
        const lastMessage: MessageVO = {
            content: message,
            id: Date.now(),
            inbox: inbox,
            receiver: getUser(loggedInUser!.id, inbox.participants[0], inbox.participants[1])!,
            sender: loggedInUser!
        }
        setMessages([...messages, lastMessage])
    }

    return (
        <div className='bg-white flex-1  border-l border-gray-200 flex flex-col'>
            <p className='text-xs pl-5 py-2 text-gray-600 border-b text-center'>Recent Messages</p>
            <ChatBox inbox={inbox} isLoading={isLoading} messages={messages} isMessageLoading={isMessageLoading} />
            <div className='h-[20vh] flex flex-col bg-gray-100 border-t border-gray-300'>
                <textarea className="w-full focus:outline-none p-2 overflow-y-scroll bg-gray-100 flex-1 scrollbar-hide" placeholder="Enter a message"
                    value={message} onChange={e => setMessage(e.target.value)}
                    onKeyUp={e => {
                        if (e.key === 'Enter') {
                            sendMessage()
                        }
                    }}
                ></textarea>
                <div className='flex justify-end'>
                    <button className='bg-white hover:bg-gray-50 flex py-2 px-5 text-xs md:text-sm space-x-5 mr-4 mb-3 rounded-md items-center' onClick={() => sendMessage()}><PaperAirplaneIcon className='h-4 w-4 md:h-6 md:w-6 text-blue-400' /><span>SEND</span></button>
                </div>
            </div>
        </div>
    )
}

export default Chat