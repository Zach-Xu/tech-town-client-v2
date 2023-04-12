import React, { useEffect, useState } from 'react'
import { PaperAirplaneIcon } from '@heroicons/react/24/solid'
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
import { InboxVO, Participant } from '../../types/vo/inboxVO'
import { useRouter } from 'next/router'
import MessageBox from './MessageBox'
import { SocketMessage } from '../../types/dto/socketMessageDTO'

type Props = {
    mutate: KeyedMutator<ResponseResult<InboxVO[]>>
    socketMessage: string | undefined
    setSocketMessage: React.Dispatch<React.SetStateAction<string | undefined>>,
    sendSocketMessage: (message: SocketMessage) => void
}

const Chat = ({ mutate, socketMessage, setSocketMessage, sendSocketMessage }: Props) => {
    const { query } = useRouter()

    const inboxId = query.inboxId

    const selectedInbox = useSelector((state: AppState) => state.selectedInbox)

    const loggedInUser = useSelector((state: AppState) => state.user)

    const [message, setMessage] = useState<string>('')

    const [messages, setMessages] = useState<MessageVO[]>([])

    const { isLoading } = useSWR({ url: `/api/inbox/${Number(inboxId)}/messages` }, protectedFetcher<ResponseResult<MessageVO[]>, null>, {
        onSuccess(data, key, config) {
            if (data.code === 200 && data.data) {
                setMessages(sortMessages(data.data))
            }
        },
        revalidateOnFocus: false,
        refreshWhenHidden: false,
        revalidateOnReconnect: false,
    })


    const sendMessageParams: FetchConfig<MessageDTO> = {
        data: {
            content: message,
            receiverId: getUserId(loggedInUser?.id, selectedInbox?.participants[0], selectedInbox?.participants[1]),
            type: getUserId(loggedInUser?.id, selectedInbox?.participants[0], selectedInbox?.participants[1]) === 1 ? TYPE.BOT : TYPE.REGULAR
        },
        method: REQUEST_METHOD.POST,
        url: '/api/inbox/message',
    }

    const { trigger, isMutating: isMessageLoading, data, error } = useSWRMutation(sendMessageParams, protectedFetcher<ResponseResult<MessageVO>, MessageDTO>)


    useEffect(() => {
        if (socketMessage && socketMessage) {
            setMessages([...messages, JSON.parse(socketMessage)])
            setSocketMessage(undefined)
        }
    }, [socketMessage])

    const sendMessage = () => {
        if (!selectedInbox) {
            return toast.error('Please select a user to send the message')
        }
        const receiver: Participant = getUser(loggedInUser!.id, selectedInbox.participants[0], selectedInbox.participants[1])!

        setMessage('')
        const lastMessage: MessageVO = {
            content: message,
            id: Date.now(),
            inbox: selectedInbox,
            receiver: receiver,
            sender: loggedInUser!
        }
        setMessages([...messages, lastMessage])

        trigger(null, {
            onSuccess: (data, key, config) => {
                mutate()
                // if fetched message was sent from chatbot, append the message to message list
                if (data.code === 201 && data.data && data.data.sender.id === 1) {
                    setMessages(msgs => [...msgs, data.data!])
                }

                if (receiver.id !== 1 && sendSocketMessage) {
                    sendSocketMessage({
                        actionType: 'send message',
                        roomId: Number(inboxId),
                        message: JSON.stringify(lastMessage)
                    })
                }
            }
        })

    }


    return (
        <div className='bg-white flex-1  border-l border-gray-200 flex flex-col'>
            <p className='text-xs pl-5 py-2 text-gray-600 border-b text-center'>Recent Messages</p>
            <MessageBox isLoading={isLoading} isMessageLoading={isMessageLoading} messages={messages} />
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