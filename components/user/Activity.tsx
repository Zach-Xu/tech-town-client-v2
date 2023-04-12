import React, { useState } from 'react'
import useSWR from 'swr'
import { protectedFetcher } from '../../lib/fetcher'
import { ResponseResult } from '../../types/vo/response'
import { ActivityVO } from '../../types/vo/activityVO'
import { useRouter } from 'next/router'
import { getActivityAction, getTimeSince } from '../../lib/helper'

type Props = {
    userId: number,
    username: string
}

const Activity = ({ userId, username }: Props) => {

    const [activities, setActivities] = useState<ActivityVO[]>()

    const router = useRouter()

    useSWR({ url: `/api/activities/user/${userId}` }, protectedFetcher<ResponseResult<ActivityVO[]>, null>, {
        onSuccess(data, key, config) {
            if (data.code === 200 && data.data) {
                setActivities(data.data)
            }
        }
    })

    return (
        <div className='flex flex-col'>
            {
                activities && activities.map(activity => (
                    <div className='flex flex-col items-start justify-center space-y-1 py-2 px-5 shadow-md mt-3 md:mt-5 bg-white rounded-md'>
                        <div className='text-gray-500'><span className='font-bold'>{username} </span>  {`${getActivityAction(activity.action)} this question ${getTimeSince(activity.createdTime)} ago`}</div>
                        <h2 className='text-blue-400 hover:text-blue-500 cursor-pointer' onClick={() => router.push(`/questions/${activity.question.id}`)}>{activity.question.title}</h2>
                    </div>
                ))
            }

        </div>
    )
}

export default Activity