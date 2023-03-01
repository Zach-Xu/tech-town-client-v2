import React from 'react'

type Props = {}

const Chat = (props: Props) => {
    return (
        <div className='bg-white flex-1  border-l border-gray-300'>
            <p className='text-xs pl-5 py-2 text-gray-600 border-b text-center'>Recent Messages</p>
        </div>
    )
}

export default Chat