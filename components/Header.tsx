import React from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

type Props = {}

const Header = (props: Props) => {
    return (
        <div className='sticky top-0 h-[50px] bg-white border-b border-gray-300 flex items-center z-10'>
            <div className='w-screen flex items-center mx-auto max-w-[960px] px-3 space-x-5'>
                <h1 className='hidden md:inline-block' >Tech Town</h1>
                <div className='flex bg-gray-100 py-2 flex-1 rounded-full px-4 items-center space-x-3  focus-within:bg-white focus-within:border-blue-300 focus-within:border' tabIndex={1} >
                    <MagnifyingGlassIcon className='h-6 w-6' />
                    <input type="text" name="" placeholder='Search Question' className='bg-transparent focus:outline-none w-full text-gray-700' />
                </div>
                <ul className='flex space-x-2'>
                    <li>Welcome, Zach</li>
                    <li className='hidden md:inline-block'>Logout</li>
                </ul>
            </div>

        </div>
    )
}

export default Header