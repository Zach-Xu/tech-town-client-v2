import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { TYPE } from '../../lib/constants'
import { AppState } from '../../redux/reducers'
import { InboxVO } from '../../types/vo/inboxVO'
import { MessageVO } from '../../types/vo/messageVO'
import Loading from '../widget/Loading'

type Props = {
    messages: MessageVO[]
    inbox: InboxVO | undefined
    isLoading: boolean,
    isMessageLoading: boolean
}

const ChatBox = ({ messages, inbox, isLoading, isMessageLoading }: Props) => {

    const loggedInUser = useSelector((state: AppState) => state.user)

    const selectedInbox = useSelector((state: AppState) => state.selectedInbox)

    const messageRef = useRef<HTMLDivElement>(null);



    useEffect(() => {
        if (messageRef && messageRef.current) {
            const { scrollHeight, clientHeight } = messageRef.current;
            messageRef.current.scrollTo({ left: 0, top: scrollHeight - clientHeight, behavior: 'smooth' });
        }

    }, [messages])

    if (!inbox) {
        return (
            <div ref={messageRef} className='bg-gray-100 flex-1'></div>
        )
    }

    if (isLoading) {
        <div ref={messageRef} className='bg-gray-100 flex-1'>Loading...</div>
    }

    return (
        <div ref={messageRef} className='bg-gray-100 flex-1 overflow-x-hidden overflow-y-auto pb-2 sm:max-h-[65vh] md:max-h-[55vh] lg:max-h-[65vh]'>
            {
                messages && messages.map(msg => (
                    <div style={{ display: "flex" }} key={msg.id}>
                        <span
                            style={{
                                backgroundColor: `${msg.sender.id === loggedInUser?.id ? "#B9F5D0" : "#BEE3F8"
                                    }`,
                                marginLeft: msg.sender.id === loggedInUser?.id ? 'auto' : 15,
                                marginRight: msg.sender.id === loggedInUser?.id ? 15 : 'auto',
                                marginTop: '8px',
                                borderRadius: "20px",
                                padding: "5px 15px",
                                maxWidth: "50%",
                            }}
                        >
                            {msg.content}
                        </span>
                    </div>
                ))
            }
            {
                isMessageLoading && selectedInbox?.type === TYPE.BOT ? <Loading /> : ''
            }
        </div >
    )


}

export default ChatBox