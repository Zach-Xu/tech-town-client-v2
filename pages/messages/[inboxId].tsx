import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Chat from '../../components/messages/Chat'
import { protectedFetcher } from '../../lib/fetcher'
import { sortInboxList } from '../../lib/helper'
import { AppState, updateInboxList, updateSelectedInbox } from '../../redux/reducers'
import { InboxVO } from '../../types/vo/inboxVO'
import { ResponseResult } from '../../types/vo/response'
import useSWR from 'swr'
import useWebSocket from '../../hooks/useWebSocket'
import { REQUEST_METHOD, TECH_TOWN_TOKEN } from '../../lib/constants'
import { useRouter } from 'next/router'
import { SocketMessage } from '../../types/dto/socketMessageDTO'
import useSWRMutation from 'swr/mutation'
import { FetchConfig } from '../../types/dto/fetchConfig'

type Props = {}

const Messages = (props: Props) => {

    const token = typeof window !== 'undefined' ? localStorage.getItem(TECH_TOWN_TOKEN) : null;

    const { message, setMessage, sendMessage, readyState } = useWebSocket(token);

    const selectedInbox = useSelector((state: AppState) => state.selectedInbox)

    const dispatch = useDispatch()

    const { query } = useRouter()

    const inboxId = query.inboxId

    const fetchInboxParams: FetchConfig<null> = {
        data: null,
        method: REQUEST_METHOD.GET,
        url: `/api/inbox/${inboxId}`,
    }

    const { trigger } = useSWRMutation(fetchInboxParams, protectedFetcher<ResponseResult<InboxVO>, null>, {
        onSuccess(data, key, config) {
            if (data.code === 200 && data.data) {
                dispatch(updateSelectedInbox(data.data))
            }
        }
    })

    useEffect(() => {
        if (!selectedInbox) {
            trigger()
        }
    }, [selectedInbox, inboxId])

    useEffect(() => {
        if (inboxId && readyState === WebSocket.OPEN) {
            const socketMessage: SocketMessage = {
                actionType: 'join inbox room',
                roomId: Number(inboxId)
            }
            sendMessage(socketMessage)
            console.log('user join room ' + inboxId)

            return () => {
                const socketMessage: SocketMessage = {
                    actionType: 'leave inbox room',
                    roomId: Number(inboxId),
                }
                sendMessage(socketMessage)
            }
        }
    }, [inboxId, readyState])


    const { data, error, isLoading, mutate } = useSWR({ url: '/api/inbox/all' }, protectedFetcher<ResponseResult<InboxVO[]>, null>, {
        onSuccess(data, key, config) {
            if (data.code === 200 && data.data) {
                dispatch(updateInboxList(sortInboxList(data.data)))
            }
        }
    })

    return (
        <Chat mutate={mutate} socketMessage={message} setSocketMessage={setMessage} sendSocketMessage={sendMessage} />
    )
}

export default Messages