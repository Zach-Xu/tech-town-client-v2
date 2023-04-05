import React from 'react'
import { useDispatch } from 'react-redux'
import Chat from '../../components/messages/Chat'
import { protectedFetcher } from '../../lib/fetcher'
import { sortInboxList } from '../../lib/helper'
import { updateInboxList } from '../../redux/reducers'
import { InboxVO } from '../../types/vo/inboxVO'
import { ResponseResult } from '../../types/vo/response'
import useSWR from 'swr'

type Props = {}

const Messages = (props: Props) => {

    const dispatch = useDispatch()

    const { data, error, isLoading, mutate } = useSWR({ url: '/api/inbox/all' }, protectedFetcher<ResponseResult<InboxVO[]>, null>, {
        onSuccess(data, key, config) {

            if (data.code === 200 && data.data) {
                dispatch(updateInboxList(sortInboxList(data.data)))
            }
        }
    })

    return (
        <Chat mutate={mutate} />
    )
}

export default Messages