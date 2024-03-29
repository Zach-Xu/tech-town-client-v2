import { NextPage } from 'next'
import Link from 'next/link'
import React from 'react'
import useSWR from 'swr'
import Question from '../components/Question'
import { fetcher } from '../lib/fetcher'
import { QuestionVO } from '../types/vo/questionVO'
import { ResponseResult } from '../types/vo/response'

const Home: NextPage = () => {

    const { data, isLoading } = useSWR('/api/questions?sort=views', fetcher<ResponseResult<QuestionVO[]>>)

    return (
        <div >
            {/* Center */}
            <div className='max-w-[700px]'>
                <div className='flex justify-between items-center mx-3 mb-2 mt-3'>
                    <h2 className='text-xl md:text-2xl'>Top Questions</h2>
                    <Link href={'/questions/ask'}>
                        <button className='text-white bg-blue-500 p-2 rounded-md text-sm md:text-base'>Ask Question</button>
                    </Link>
                </div>
                <div>
                    {
                        isLoading && `loading....`
                    }
                    {
                        data && data.data?.map(question => (

                            <Question key={question.id} question={question} />

                        ))

                    }
                </div>

                {/* Right */}
            </div>
        </div>
    )
}

export default Home