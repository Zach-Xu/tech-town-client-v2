import React from 'react'

type Props = {}

const Signup = (props: Props) => {
    return (
        <>
            <input type="checkbox" id="my-modal-3" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="my-modal-3" className="btn btn-sm border-0 hover:bg-white absolute right-2 top-2 bg-white text-gray-700 font-bold text-xl">✕</label>
                    <form className='flex flex-col space-y-3'>
                        <h2 className='text-black font-bold text-2xl'>Sign Up</h2>
                        <p>Its quick and easy.</p>
                        <div className='border-t border-gray-400 w-full'></div>
                        <input type="text" name="" placeholder='Username' className='w-full border border-gray-400 px-2 py-3 rounded-md' />
                        <input type="text" name="" placeholder='Email' className='w-full border border-gray-400 px-2 py-3 rounded-md' />
                        <input type="password" placeholder="Password" className='w-full border border-gray-400 px-2 py-3 rounded-md' />
                        <input type='submit' className='cursor-pointer bg-[#42b72a] px-16 py-2 text-md font-bold rounded-md text-white mx-auto' value='Sign Up'></input>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Signup