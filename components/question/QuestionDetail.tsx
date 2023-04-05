import React, { useEffect, useState } from 'react'
import { QuestionDetailVO } from '../../types/vo/questionDetailVO'
import { ChevronUpIcon, ChevronDownIcon, BookmarkIcon } from '@heroicons/react/24/outline'
import Tag from '../../components/widget/Tag'
import Image from 'next/image'
import { getTimeSince } from '../../lib/helper'
import { FetchConfig } from '../../types/dto/fetchConfig'
import { REQUEST_METHOD, VOTE_STATUS } from '../../lib/constants'
import { ResponseResult } from '../../types/vo/response'
import { protectedFetcher } from '../../lib/fetcher'
import { VoteVO } from '../../types/vo/questionVO'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import UserCard from '../widget/UserCard'
import { useSelector } from 'react-redux'
import { AppState } from '../../redux/reducers'
import store from '../../redux/store'

type Props = {
    question: QuestionDetailVO,

}

interface VoteParams {
    status: number
}

const QuestionDetail = ({ question }: Props) => {

    const [voteStatus, setVoteStatus] = useState<number>(0)

    const [displayUserCard, setDisplayUserCard] = useState<boolean>(false)

    // request for fetching user vote status
    const fetchUserVoteParams: FetchConfig<null> = {
        method: REQUEST_METHOD.GET,
        url: `/api/questions/${question.id}/vote`,
        data: null
    }
    const { isLoading } = useSWR(fetchUserVoteParams, protectedFetcher<ResponseResult<VoteVO>, null>, {
        onSuccess(data, key, config) {
            if (data.code === 200 && data.data && data.data.status !== VOTE_STATUS.CANCEL) {
                setVoteStatus(data.data.status)
            }
            if (data.code !== 200 && question.id) {
                console.error('Failed to fetch user vote info')
            }
        },
    })


    // request for voting question
    const voteQuestionParams: FetchConfig<VoteParams> = {
        data: {
            status: voteStatus
        },
        method: REQUEST_METHOD.POST,
        url: `/api/questions/${question.id}/vote`
    }
    const { trigger: voteQuestion, data: voteVo } = useSWRMutation(voteQuestionParams, protectedFetcher<ResponseResult<VoteVO>, VoteParams>, {
    })

    useEffect(() => {
        voteQuestion()
    }, [voteStatus])



    const upVoteClickHandler = () => {

        if (voteStatus === VOTE_STATUS.UP_VOTE) {
            // already up voted
            setVoteStatus(VOTE_STATUS.CANCEL)
        } else {
            setVoteStatus(VOTE_STATUS.UP_VOTE)
        }
    }

    const downVoteClickHandler = () => {
        if (voteStatus === VOTE_STATUS.DOWN_VOTE) {
            // already down voted
            setVoteStatus(VOTE_STATUS.CANCEL)
        } else {
            setVoteStatus(VOTE_STATUS.DOWN_VOTE)
        }
    }

    const isUserCardHovered = useSelector((state: AppState) => state.isUserCardHovered)



    return (
        <div className='flex space-x-4 lg:space-x-6 pt-4'>
            <div className='flex flex-col items-center'>
                <ChevronUpIcon className={`w-6 h-6 md:w-10 md:h-10 ${voteStatus === VOTE_STATUS.UP_VOTE ? 'text-blue-400' : ' text-gray-300'} cursor-pointer`} onClick={upVoteClickHandler} />
                <span className='text-lg md:text-xl text-gray-500'>{voteVo?.data?.id ? voteVo.data.question.upVotes - voteVo.data.question.downVotes : question.upVotes - question.downVotes}</span>
                <ChevronDownIcon className={`w-6 h-6 md:w-10 md:h-10 ${voteStatus === VOTE_STATUS.DOWN_VOTE ? 'text-blue-400' : ' text-gray-300'} cursor-pointer`} onClick={downVoteClickHandler} />
                <BookmarkIcon className='w-3 h-3 md:w-7 md:h-7 text-gray-300 cursor-pointer' />
            </div>
            <div className='flex-1 flex flex-col'>
                <div dangerouslySetInnerHTML={{ __html: question.content }} className='flex-1 flex-wrap'></div>
                <ul className='flex mt-5 space-x-5 list-none'>
                    {
                        question.tags.map(tag => (
                            <li key={tag.id}><Tag tagName={tag.tagName} /></li>
                        ))
                    }
                </ul>
                <div className='flex justify-end space-x-10 mt-2 relative'>
                    <UserCard display={displayUserCard} setDisplay={setDisplayUserCard} userId={question.user.id} username={question.user.username} />
                    <div className='bg-blue-100 p-2'
                        onMouseLeave={() => setTimeout(() => {
                            if (!store.getState().isUserCardHovered) {
                                setDisplayUserCard(false)
                            }
                        }, 1000)}>
                        <p className='text-[0.7rem] text-gray-500'>{`Asked ${getTimeSince(question.createdTime)} ago`}</p>
                        <div className='flex items-center space-x-2 mt-1 md:mt-2'>
                            <Image src='/default-user-image.png' className='cursor-pointer' width={36} height={36} alt='user profile picture'
                                onMouseOver={() => {
                                    setTimeout(() => { setDisplayUserCard(true) }, 500)
                                }}
                            />
                            <span className='text-blue-500 hover:text-blue-400 text-sm cursor-pointer'
                                onMouseOver={() => setTimeout(() => { setDisplayUserCard(true) }, 500)}
                            >{question.user.username}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default QuestionDetail