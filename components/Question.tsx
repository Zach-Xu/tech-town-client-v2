import Link from 'next/link'
import React from 'react'
import { Question } from '../types/propsType'
import Tag from './widget/Tag'

type Props = {
    question: Question
}

const Question = ({ question }: Props) => {
    return (
        <div className='relative grid grid-cols-5 border border-gray-300 m-5 rounded-lg px-5 py-6 shadow-lg gap-x-10'>
            <div className='col-span-1'>{`${question.answers.length} answers`}</div>
            <div className='col-span-4 flex flex-col'>
                <Link href={`questions/${question._id}`} className='text-blue-400 cursor-pointer'>{question.title}</Link>

                <ul className='flex space-x-3 list-none mt-1'>
                    <li><Tag tagName={question.category.substring(0, 7)} /></li>
                </ul>

            </div>
            <div className='absolute right-2 bottom-1 text-sm'>david asked 1min ago</div>
        </div>
    )
}

export default Question