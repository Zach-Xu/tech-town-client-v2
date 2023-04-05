import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Chat from '../../components/messages/Chat'
import { REQUEST_METHOD, TYPE } from '../../lib/constants'
import { protectedFetcher, protectedFetcherWithExtraParams } from '../../lib/fetcher'
import { sortInboxList } from '../../lib/helper'
import { updateInboxList, updateSelectedInbox } from '../../redux/reducers'
import { InboxDTO } from '../../types/dto/inboxDTO'
import { InboxVO } from '../../types/vo/inboxVO'
import { ResponseResult } from '../../types/vo/response'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import { useRouter } from 'next/router'
import InboxList from '../../components/messages/InboxList'

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

    const { trigger } = useSWRMutation('/api/inbox', protectedFetcherWithExtraParams<ResponseResult<InboxVO>, InboxDTO>)

    return (
        <Chat mutate={mutate} />
    )
}

export default Messages