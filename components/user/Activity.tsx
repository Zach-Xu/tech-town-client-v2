import React from 'react'
import useSWR from 'swr'
import { protectedFetcher } from '../../lib/fetcher'
import { ResponseResult } from '../../types/vo/response'

type Props = {
    userId: number
}

const Activity = ({ userId }: Props) => {

    useSWR({ url: `/api/activities/user/${userId}` }, protectedFetcher<ResponseResult<any>, null>, {
        onSuccess(data, key, config) {
            if (data.code === 200 && data.data) {
                console.log(data)
            }
        }
    })

    return (
        <div>Activity</div>
    )
}

export default Activity