import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { SearchUserVo } from '../../types/vo/userVO'
import useSWRMutation from 'swr/mutation'
import { ResponseResult } from '../../types/vo/response'
import { fetcher } from '../../lib/fetcher'
import SearchUser from '../../components/user/SearchUser'

type Props = {}

const Users: NextPage = (props: Props) => {

    const router = useRouter()

    const { query: { keyword } } = router

    const [users, setUsers] = useState<SearchUserVo[]>()

    // fetch users by keyword
    const { trigger, isMutating } = useSWRMutation(`/api/users/search?keyword=${keyword}`, fetcher<ResponseResult<SearchUserVo[]>>, {
        onSuccess(data, key, config) {
            if (data.code === 200 && data.data) {
                setUsers(data.data)
            }
        }
    })

    useEffect(() => {
        if (keyword) {
            trigger()
        }
    }, [keyword])


    return (
        <div >
            {/* Center */}
            <div className='max-w-[700px]'>
                <div className='flex justify-between items-center mx-3 mb-2 mt-3'>
                    {
                        keyword && <h2 className='text-xl md:text-2xl'> User keyword &#91;{keyword}&#93;</h2>
                    }
                </div>
                <div className='px-5 py-3 flex flex-col justify-center space-y-4'>
                    {
                        isMutating && `loading....`
                    }
                    {
                        !isMutating && users && users.map(user => (
                            <SearchUser key={user.id} user={user} />
                        ))
                    }
                </div>

                {/* Right */}
            </div>
        </div>
    )
}

export default Users