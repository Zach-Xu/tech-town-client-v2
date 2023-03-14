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

type Props = {
    question: QuestionDetailVO,

}

interface VoteParams {
    status: number
}

const QuestionDetail = ({ question }: Props) => {

    const [voteStatus, setVoteStatus] = useState<number>(0)

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
        console.log('12312321312321')
    }, [voteStatus])

    if (voteVo) {
        console.log('votevo', voteVo)
    }

    const upVoteClickHandler = () => {

        if (voteStatus == VOTE_STATUS.UP_VOTE) {
            // already up voted
            setVoteStatus(VOTE_STATUS.CANCEL)
        } else {
            setVoteStatus(VOTE_STATUS.UP_VOTE)
        }
    }

    const downVoteClickHandler = () => {
        if (voteStatus == VOTE_STATUS.DOWN_VOTE) {
            // already down voted
            setVoteStatus(VOTE_STATUS.CANCEL)
        } else {
            setVoteStatus(VOTE_STATUS.DOWN_VOTE)
        }
    }

    return (
        <div className='flex space-x-4 lg:space-x-6 pt-4'>
            <div className='flex flex-col items-center'>
                <ChevronUpIcon className='w-6 h-6 md:w-10 md:h-10 text-gray-300 cursor-pointer' onClick={upVoteClickHandler} />
                <span className='text-lg md:text-xl text-gray-500'>{voteVo?.data?.id ? voteVo.data.question.upVotes - voteVo.data.question.downVotes : question.upVotes - question.downVotes}</span>
                <ChevronDownIcon className='w-6 h-6 md:w-10 md:h-10 text-gray-300 cursor-pointer' onClick={downVoteClickHandler} />
                <BookmarkIcon className='w-3 h-3 md:w-7 md:h-7 text-gray-300 cursor-pointer' />
            </div>
            <div className='flex-1'>
                <div dangerouslySetInnerHTML={{ __html: question.content }}></div>
                <ul className='flex mt-5 space-x-5 list-none'>
                    {
                        question.tags.map(tag => (
                            <li key={tag.id}><Tag tagName={tag.tagName} /></li>
                        ))
                    }
                </ul>
                <div className='flex justify-end space-x-10 mt-2'>
                    <div className='bg-blue-100 p-2'>
                        <p className='text-[0.7rem] text-gray-500'>{`Asked ${getTimeSince(question.createdTime)}`}</p>
                        <div className='flex items-center space-x-2 mt-1 md:mt-2'>
                            <Image src='/default-user-image.png' className='cursor-pointer' width={36} height={36} alt='user profile picture' />
                            <span className='text-blue-500 hover:text-blue-400 text-sm cursor-pointer'>{question.user.username}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QuestionDetail