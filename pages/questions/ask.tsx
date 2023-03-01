import { NextPage } from 'next'
import React, { useState } from 'react'
import TextEditor from '../../components/widget/textEditor'

type Props = {}

const Ask: NextPage = (props: Props) => {

    const [content, setContent] = useState<string>('')

    const [isUnderstood, setIsUnderstood] = useState<boolean>(false)

    return (
        <div className='mx-5' >
            <p className='text-2xl font-semibold my-10'>Ask a public question</p>
            <div className='max-w-[700px]'>
                <div className={`${isUnderstood ? 'hidden' : 'inline-block'}`}>
                    <div className='bg-white py-5 px-10 space-y-2 rounded-md'>
                        <h5 className='font-semibold text-gray-600 text-lg'>Write a good question</h5>
                        <p>You're ready to ask a <span className='text-blue-400'>programming-related question</span>  and this form will help guide you through the process.</p>
                        <p className='text-sm font-semibold text-gray-500'>Steps</p>
                        <ul className='list-disc text-sm pl-8'>
                            <li>Summarize your problem in a one-line title</li>
                            <li>Describe your problem in more detail.</li>
                            <li>Add “tags” which help surface your question to members of the community.</li>
                            <li>Review your question and post it to the site.</li>
                        </ul>
                    </div>
                    <button className='bg-blue-400 hover:bg-blue-300 py-1 px-3 text-white rounded-md mt-5'
                        onClick={() => setIsUnderstood(true)}>I understand</button>
                </div>
                {/* Step 1 title */}
                <div className={`${isUnderstood ? 'inline-block' : 'hidden'} space-y-8 my-2`}>
                    <div className='flex flex-col bg-white py-5 px-10 space-y-2 rounded-md shadow-md'>
                        <h5 className='text-sm font-semibold'>Title</h5>
                        <p className='text-xs text-gray-600'>Be specific and imagine you're asking a question to another person.</p>
                        <input type="text" name="" className='border border-gray-400 rounded-sm text-xs p-2 focus:outline-none focus:shadow-inner focus:shadow-[rgb(205,223,237)]' placeholder='e.g. Is there a method in C# for coverting object to JSON?' />
                    </div>
                    {/* Step 2 detail */}
                    <div className='flex flex-col bg-white  py-5 px-10 space-y-2 rounded-md shadow-md'>
                        <h5 className='text-sm font-semibold'>What are the details of your problem?</h5>
                        <p className='text-xs text-gray-600'>Introduce the problem and expand on what you put in the title. Minimum 20 characters.</p>
                        <TextEditor content={content} setContent={setContent} />
                    </div>

                    {/* Step 3 tags */}
                    <div className='flex flex-col bg-white py-5 px-10 space-y-2 rounded-md shadow-md'>
                        <h5 className='text-sm font-semibold'>Tags</h5>
                        <p className='text-xs text-gray-600'>Add up to 5 tags to describe what your question is about. Start typing to see suggestions.</p>
                        <input type="text" name="" className='border border-gray-400 rounded-sm text-xs p-2 focus:outline-none focus:shadow-inner focus:shadow-[rgb(205,223,237)]' placeholder='e.g. (typescript database react)' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Ask