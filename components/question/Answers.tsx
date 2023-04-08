import React from 'react'
import { AnswerVO } from '../../types/vo/questionDetailVO'
import Answer from './Answer'

type Props = {
    answers: AnswerVO[]
}

const Answers = ({ answers }: Props) => {
    return (
        <div className='flex flex-col space-y-2'>
            <div className='text-lg pt-4 font-semibold'>{answers.length} Answers</div>
            {
                answers.map(answer => (
                    <Answer key={answer.id} content={answer.content} createdTime={answer.createdTime} username={answer.user.username} userId={answer.user.id} avatar={answer.user.avatar} />

                ))
            }
        </div>
    )
}

export default Answers