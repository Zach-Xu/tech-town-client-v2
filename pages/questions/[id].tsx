import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { Fragment, useState } from 'react'
import useSWR from 'swr'
import { fetcher } from '../../lib/helper'
import { Question } from '../../types/propsType'
import { ChevronUpIcon, ChevronDownIcon, BookmarkIcon } from '@heroicons/react/24/outline'
import Tag from '../../components/widget/Tag'
import Image from 'next/image'
import TextEditor from '../../components/widget/textEditor'

type Props = {}

const QuestionDetail: NextPage = (props: Props, router) => {
    const { query } = useRouter()
    const { data: question, error, isLoading } = useSWR(`${process.env.API_BASE_URL}/api/posts/post/${query.id}`, fetcher<Question>)

    const [answer, setAnswer] = useState<string>('')

    if (isLoading)
        return <h1>Loading...</h1>


    console.log(question)
    return (
        <div className='max-w-[700px] p-4  md:py-5 md:px-10 bg-white md:ml-5 md:my-2 md:rounded-lg border-l border-gray-200  md:shadow-sm'>
            {
                question &&
                <Fragment>
                    <header className='flex flex-col space-y-3 '>
                        <h2 className='text-2xl font-bold'> {question.title}</h2>
                        <div className='flex  space-x-4 md:space-x-10 text-xs'>
                            <p className='text-gray-500'>Asked <span className='text-black'>{new Date(question.createdDate).toLocaleDateString()}</span></p>
                            <p className='text-gray-500'>Viewed <span className='text-black'>{14}</span> times</p>
                        </div>
                    </header>
                    <hr className='my-2 md:my-4' />
                    <section className='min-w-[300px] space-y-5'>
                        <div className='flex space-x-4 lg:space-x-6 pt-4'>
                            <div className='flex flex-col items-center'>
                                <ChevronUpIcon className='w-6 h-6 md:w-10 md:h-10 text-gray-300 cursor-pointer' />
                                <span className='text-lg md:text-xl text-gray-500'>0</span>
                                <ChevronDownIcon className='w-6 h-6 md:w-10 md:h-10 text-gray-300 cursor-pointer' />
                                <BookmarkIcon className='w-3 h-3 md:w-7 md:h-7 text-gray-300 cursor-pointer' />
                            </div>
                            <div className='flex-1'>
                                <div dangerouslySetInnerHTML={{ __html: question.content }}></div>
                                <div className='flex mt-5 space-x-5'>
                                    <Tag tagName={question.category.substring(0, 7)} />
                                </div>
                                <div className='flex justify-end space-x-10 mt-2'>
                                    <div className='bg-blue-100 p-2'>
                                        <p className='text-[0.7rem] text-gray-500'>Asked 15 mins ago</p>
                                        <div className='flex items-center space-x-2 mt-1 md:mt-2'>
                                            <Image src='/default-user-image.png' className='cursor-pointer' width={36} height={36} alt='user profile picture' />
                                            <span className='text-blue-500 hover:text-blue-400 text-sm cursor-pointer'>{question.user.username}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Answers */}
                        <div className='text-lg pt-4 font-semibold'>{2} Answers</div>
                        <div>
                            <p >Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                            <div className='flex justify-end space-x-10 mt-2'>
                                <div className='p-2'>
                                    <p className='text-[0.7rem] text-gray-500'>Answered 15 mins ago</p>
                                    <div className='flex items-center space-x-2 mt-1 md:mt-2'>
                                        <Image src='/default-user-image.png' className='cursor-pointer' width={36} height={36} alt='user profile picture' />
                                        <span className='text-blue-500 hover:text-blue-400 text-sm cursor-pointer'>{question.user.username}</span>
                                    </div>
                                </div>
                            </div>
                            <hr />
                        </div>
                        <p className='text-lg pt-4  font-semibold'>Your Answer</p>
                        <TextEditor content={answer} setContent={setAnswer} />
                        <button className='text-white text-xs bg-blue-500 py-2 px-3 rounded-md cursor-pointer'>Post Your Answer</button>
                    </section>
                </Fragment>
            }
        </div>
    )


}

export default QuestionDetail