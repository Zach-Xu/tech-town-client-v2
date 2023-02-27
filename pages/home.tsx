import { NextPage } from 'next'
import React from 'react'
import useSWR from 'swr'

type Props = {}

interface answer {
    content: string
    data: Date
    user: string
    _id: string
}

interface Question {
    category: string
    answers: answer[]
    content: string
    createdDate: Date
    tags: string[]
    title: string
    user: string

}

const Home: NextPage = (props: Props) => {

    const fetcher = (url: string): Promise<Question[]> => fetch(url).then(res => res.json())
    console.log('api endpoint', process.env.API_BASE_URL)
    const { data, error, isLoading } = useSWR(`${process.env.API_BASE_URL}/api/posts`, fetcher)
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
                    <button className='text-white bg-blue-500 p-2 rounded-md text-sm md:text-base'>Ask Question</button>
                </div>
                <div>
                    {
                        isLoading && `loading....`
                    }
                    {
                        data && data.map(question => (
                            <div className='relative grid grid-cols-5 border border-gray-300 m-5 rounded-lg px-5 py-6 shadow-lg gap-x-10'>
                                <div className='col-span-1'>{`${question.answers.length} answers`}</div>
                                <div className='col-span-4 flex flex-col'>
                                    <h4 className='text-blue-400 cursor-pointer'>{question.title}</h4>

                                    <ul className='flex space-x-3 list-none mt-1'>
                                        <li className='bg-blue-100 text-gray-500 text-xs p-1 cursor-pointer'>{question.category.substring(0, 7)}</li>
                                    </ul>

                                </div>
                                <div className='absolute right-2 bottom-1 text-sm'>david asked 1min ago</div>
                            </div>

                        ))

                    }
                </div>

                {/* Right */}
            </div>
        </div>
    )
}

export default Home