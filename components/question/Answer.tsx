import React from 'react'
import { AnswerVO } from '../../types/vo/questionDetailVO'
import Image from 'next/image'
import { getTimeSince } from '../../lib/helper'

type Props = {
    answers: AnswerVO[]
}

const Answers = ({ answers }: Props) => {
    return (
        <div className='flex flex-col space-y-2'>
            <div className='text-lg pt-4 font-semibold'>{answers.length} Answers</div>
            {
                answers.map(answer => (
                    <div key={answer.id}>
                        <div dangerouslySetInnerHTML={{ __html: answer.content }} className='flex flex-col'></div>
                        <div className='flex justify-end space-x-10 mt-2'>
                            <div className='p-2'>
                                <p className='text-[0.7rem] text-gray-500'>{`Answered ${getTimeSince(answer.createdTime)}`}</p>
                                <div className='flex items-center space-x-2 mt-1 md:mt-2'>
                                    <Image src='/default-user-image.png' className='cursor-pointer' width={36} height={36} alt='user profile picture' />
                                    <span className='text-blue-500 hover:text-blue-400 text-sm cursor-pointer'>{answer.user.username}</span>
                                </div>
                            </div>
                        </div>
                        <hr />
                    </div>
                ))
            }
        </div>
    )
}

export default Answers