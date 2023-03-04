import React, { useState } from 'react'
import { REQUEST_METHOD, TECH_TOWN_TOKEN } from '../lib/constants'
import { FetchConfig, SignupUser } from '../types/requestTypes'
import useSWRMutation from 'swr/mutation'
import { authFetcher } from '../lib/helper'
import { SignupDTO, Response } from '../types/responseTypes'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { updateUser } from '../redux/reducers'

type Props = {}

const Signup = (props: Props) => {

    const router = useRouter()

    const dispatch = useDispatch()

    const [user, setUser] = useState<SignupUser>({
        email: '',
        password: '',
        username: ''
    })

    const params: FetchConfig = {
        data: user,
        method: REQUEST_METHOD.POST,
        url: '/api/auth/register',
    }

    const { trigger, data } = useSWRMutation(params, authFetcher<Response<SignupDTO>>, {
        onSuccess(data, key, config) {
            if (data.code == 201) {
                localStorage.setItem(TECH_TOWN_TOKEN, data.data!.token)
                dispatch(updateUser(data.data!.user))
                return router.push('/home')
            }

        },
    })

    const signupHandler = (e: React.FormEvent) => {
        e.preventDefault()
        trigger()
    }

    return (
        <>
            <input type="checkbox" id="my-modal-3" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="my-modal-3" className="btn btn-sm border-0 hover:bg-white absolute right-2 top-2 bg-white text-gray-700 font-bold text-xl">✕</label>
                    <form className='flex flex-col space-y-3' onSubmit={signupHandler}>
                        <h2 className='text-black font-bold text-2xl'>Sign Up</h2>
                        <p>Its quick and easy.</p>
                        <div className='border-t border-gray-400 w-full'></div>
                        <input type="text" name="username" onChange={e => setUser({ ...user, [e.target.name]: e.target.value })} placeholder='Username' className='w-full border border-gray-400 px-2 py-3 rounded-md' />
                        <input type="text" name="email" onChange={e => setUser({ ...user, [e.target.name]: e.target.value })} placeholder='Email' className='w-full border border-gray-400 px-2 py-3 rounded-md' />
                        <input type="password" name="password" onChange={e => setUser({ ...user, [e.target.name]: e.target.value })} placeholder="Password" className='w-full border border-gray-400 px-2 py-3 rounded-md' />
                        <input type='submit' className='cursor-pointer bg-[#42b72a] px-16 py-2 text-md font-bold rounded-md text-white mx-auto' value='Sign Up'></input>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Signup