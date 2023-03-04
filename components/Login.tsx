import React, { useState } from 'react'
import { REQUEST_METHOD } from '../lib/constants'
import useSWRMutation from 'swr/mutation'
import { authFetcher } from '../lib/helper'
import { FetchConfig, LoginUser } from '../types/requestTypes'

type Props = {}

const Login = (props: Props) => {

    const [user, setUser] = useState<LoginUser>({
        email: '',
        password: ''
    })

    const params: FetchConfig = {
        url: '/api/auth/login',
        method: REQUEST_METHOD.POST,
        data: user
    }
    const { trigger, data } = useSWRMutation(params, authFetcher)

    const LoginHandler = async (e: React.FormEvent) => {
        e.preventDefault()
        trigger()
    }
    if (data) {
        console.log('from login api', data)
    }

    return (
        <div className='w-[90vw] md:w-[500px]  px-10 bg-white rounded-xl py-10 mx-auto lg:mr-10 flex flex-col items-center shadow-lg'>
            <form className='flex flex-col w-full items-center space-y-3' onSubmit={LoginHandler}>
                <input type="email" name="email"
                    onChange={e => setUser({ ...user, [e.target.name]: e.target.value })}
                    placeholder='Email' className='w-full border border-gray-400 px-2 py-3 rounded-md' />
                <input type="password" name='password'
                    onChange={e => setUser({ ...user, [e.target.name]: e.target.value })}
                    placeholder="Password" className='w-full border border-gray-400 px-2 py-3 rounded-md' />
                <input className='bg-[#1877f2] cursor-pointer hover:bg-[#1668d2] w-full py-2 text-white font-bold text-xl rounded-md' type="submit" value="Log In" />

            </form>
            <div className='border-t my-5 border-gray-300 w-full'></div>
            <label htmlFor="my-modal-3" className='btn border-0 hover:bg-[#399d25] bg-[#42b72a] px-4 py-3 text-md font-bold rounded-md text-white'>Create new account</label>
        </div>
    )
}

export default Login