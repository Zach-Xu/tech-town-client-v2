import React from 'react'
import Chat from '../../components/messages/Chat'
import MessagesList from '../../components/messages/MessagesList'

type Props = {}

const Messages = (props: Props) => {
    return (
        <div className='max-w-[900px] md:py-5 md:px-10 mt-2 md:mt-0 mx-2 md:mx-0 flex flex-col h-full'>
            <header className='bg-white font-semibold text-gray-500 py-2 px-4 rounded-md shadow-md text-center md:text-left'>My messages</header>
            <section className='my-4 border-l shadow-md rounded-md overflow-hidden flex-1 '>
                <div className='flex h-full'>
                    <MessagesList />
                    <Chat />
                </div>
            </section>
        </div>
    )
}

export default Messages