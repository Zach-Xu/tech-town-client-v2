import React from 'react'
import { PaperAirplaneIcon } from '@heroicons/react/24/solid'
import ChatBox from './ChatBox'

type Props = {}

const Chat = (props: Props) => {
    return (
        <div className='bg-white flex-1  border-l border-gray-200 flex flex-col'>
            <p className='text-xs pl-5 py-2 text-gray-600 border-b text-center'>Recent Messages</p>
            <ChatBox />
            <div className='h-[20vh] flex flex-col bg-gray-100 border-t border-gray-300'>
                <textarea className="w-full focus:outline-none p-2 overflow-y-scroll bg-gray-100 flex-1 scrollbar-hide" placeholder="Enter a message"></textarea>
                <div className='flex justify-end'>
                    <button className='bg-white hover:bg-gray-50 flex py-2 px-5 text-xs md:text-sm space-x-5 mr-4 mb-3 rounded-md items-center'><PaperAirplaneIcon className='h-4 w-4 md:h-6 md:w-6 text-blue-400' /><span>SEND</span></button>
                </div>
            </div>
        </div>
    )
}

export default Chat