import React, { Fragment } from 'react'
import Image from 'next/image'
import { InboxVO } from '../../types/vo/inboxVO'
import { getUsername, } from '../../lib/helper'
import { TYPE } from '../../lib/constants'
import { useSelector } from 'react-redux'
import { AppState } from '../../redux/reducers'


type Props = {
    inboxes: InboxVO[]
    setSelectedInbox: (inbox?: InboxVO) => void
    error: any
}

const MessagesList = ({ inboxes, setSelectedInbox, error }: Props) => {

    const user = useSelector((state: AppState) => state.user)

    const selectedInbox = useSelector((state: AppState) => state.selectedInbox)

    if (error) {
        console.log('error on fetching inbox list', error)
    }

    if (!user) {
        return <div>Loading...</div>
    }

    return (
        <div className='bg-white md:w-[200px] flex flex-col'>
            <p className='text-xs pl-5 py-2 text-gray-500 border-b hidden md:inline-block border-gray-200 w-full'>Recent Messages</p>
            <div className=''>
                {
                    inboxes.length > 0 && inboxes[0].type === TYPE.BOT ?
                        inboxes.map(inbox => (
                            <div key={inbox.id} className={`flex items-center px-4 py-3 space-x-3 hover:bg-gray-200 cursor-pointer ${inbox.id === selectedInbox?.id ? 'bg-gray-200' : ''}`} onClick={() => setSelectedInbox(inbox)}>
                                <Image src={inbox.type === TYPE.BOT ? '/chatbot-icon.png' : '/default-user-image.png'} width={36} className='rounded-full' height={36} alt='user profile picture' />
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
                            <div className={`flex items-center px-4 py-3 space-x-3 hover:bg-gray-200 cursor-pointer`} onClick={() => setSelectedInbox()}>
                                <Image src={'/chatbot-icon.png'} width={36} className='rounded-full' height={36} alt='user profile picture' />
                                <div className='hidden md:inline-block'>
                                    <span className='text-[0.8rem] font-semibold'>Bot</span>
                                </div>
                            </div>
                            {
                                inboxes.map(inbox => (
                                    <div key={inbox.id} className={`flex items-center px-4 py-3 space-x-3 hover:bg-gray-200 cursor-pointer  ${inbox.id === selectedInbox?.id ? 'bg-gray-200' : ''}`} onClick={() => setSelectedInbox(inbox)}>
                                        <Image src={'/default-user-image.png'} width={36} className='rounded-full' height={36} alt='user profile picture' />
                                        <div className='hidden md:flex md:flex-col md:items-start md:justify-center'>
                                            <span className='text-[0.8rem] font-semibold'>{getUsername(user.id, inbox.participants[0], inbox.participants[1])}</span>
                                            {
                                                inbox.lastMessage && <span className='text-[0.8rem] font-semibold text-gray-400 truncate'>{inboxes[0].lastMessage.content}</span>
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

export default MessagesList