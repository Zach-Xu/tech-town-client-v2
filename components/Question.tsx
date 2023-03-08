import Link from 'next/link'
import React from 'react'
import { QuestionVO } from '../types/vo/questionVO'
import Tag from './widget/Tag'

type Props = {
    question: QuestionVO
}

const Question = ({ question }: Props) => {
    return (
        <div className='relative grid grid-cols-5 border bg-white border-gray-300 m-5 rounded-lg px-5 py-6 shadow-lg gap-x-10'>
            <div className='col-span-1'>{`${question.numOfAnswers} answers`}</div>
            <div className='col-span-4 flex flex-col'>
                <Link href={`questions/${question.id}`} className='text-blue-400 cursor-pointer'>{question.title}</Link>

                <ul className='flex space-x-3 list-none mt-1'>
                    {
                        question.tags.map(tag => (
                            <li key={tag.id}><Tag tagName={tag.tagName} /></li>
                        ))
                    }
                </ul>

            </div>
            <div className='absolute right-2 bottom-1 text-sm'>{`${question.user.username} asked 1min ago`}</div>
        </div>
    )
}

export default Question