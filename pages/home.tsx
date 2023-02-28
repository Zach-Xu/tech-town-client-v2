import { NextPage } from 'next'
import Link from 'next/link'
import React from 'react'
import useSWR from 'swr'
import Question from '../components/Question'
import { fetcher } from '../lib/helper'
import { Question as QuestionType } from '../types/propsType'


const Home: NextPage = () => {

    const { data, error, isLoading } = useSWR(`${process.env.API_BASE_URL}/api/posts`, fetcher<QuestionType[]>)
    if (error) {
        console.log(error)
    }
    if (data) {
        console.log(data)
    }

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
                        data && data.map(question => (

                            <Question question={question} />

                        ))

                    }
                </div>

                {/* Right */}
            </div>
        </div>
    )
}

export default Home