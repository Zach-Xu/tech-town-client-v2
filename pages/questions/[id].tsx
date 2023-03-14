import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { fetcher, protectedFetcher } from '../../lib/fetcher'
import TextEditor from '../../components/widget/textEditor'
import { AnswerVO, QuestionDetailVO } from '../../types/vo/questionDetailVO'
import { ResponseResult } from '../../types/vo/response'
import useSWRMutation from 'swr/mutation'
import { FetchConfig } from '../../types/dto/fetchConfig'
import { REQUEST_METHOD } from '../../lib/constants'
import { AnswerDTO, } from '../../types/dto/questionDTO'
import { toast } from 'react-toastify'
import Answers from '../../components/question/Answer'
import QuestionDetail from '../../components/question/QuestionDetail'
import useSWR from 'swr'

type Props = {}

const QuestionDetailPage: NextPage = (props: Props, router) => {
    const { query } = useRouter()
    const questionId = query.id

    // request for fetching question detail
    const { data, isLoading } = useSWR(`/api/questions/${questionId}`, fetcher<ResponseResult<QuestionDetailVO>>, {
        refreshInterval: 2 * 60 * 1000,
        onSuccess(data, key, config) {
            if (data.code === 200 && data.data) {
                setAnswers(data.data.answers)
            }
            if (data.code !== 200 && questionId) {
                toast.error('Failed to fetch quesion detail, try again later')
                console.log(data.msg)
            }
        }
    })

    const [answers, setAnswers] = useState<AnswerVO[]>([])


    // current editing answer
    const [answer, setAnswer] = useState<string>('')

    const postAnswerParams: FetchConfig<AnswerDTO> = {
        data: {
            content: answer
        },
        method: REQUEST_METHOD.POST,
        url: `/api/questions/answers/${data?.data?.id}`
    }


    // request for posting answer
    const { trigger: postAnswer } = useSWRMutation(postAnswerParams, protectedFetcher<ResponseResult<AnswerVO>, AnswerDTO>, {
        onSuccess(data, key, config) {
            if (data.code === 201 && data.data) {
                setAnswers(answers => [...answers, data.data!])
                setAnswer('')
                return toast.success('Answered successfully!')
            } else {
                return toast.error(data.msg)
            }
        }
    })

    const postQuestionClickHandler = () => {
        postAnswer()
    }


    let question

    if (isLoading)
        return <h1>Loading...</h1>
    if (data) {
        question = data.data
    }


    return (
        <div className='max-w-[700px] lg:max-w-[800px] p-4  md:py-5 md:px-10 bg-white opacity-[0.95] md:ml-5 my-2 md:rounded-lg border-l border-gray-200  md:shadow-sm'>
            {
                question &&
                <div >
                    <header className='flex flex-col space-y-3'>
                        <h2 className='text-2xl font-bold'> {question.title}</h2>
                        <div className='flex  space-x-4 md:space-x-10 text-xs'>
                            <p className='text-gray-500'>Asked <span className='text-black'>{new Date(question.createdTime).toLocaleDateString()}</span></p>
                            <p className='text-gray-500'>Viewed <span className='text-black'>{question.views}</span> times</p>
                        </div>
                    </header>
                    <hr className='my-2 md:my-4' />
                    <section className='min-w-[300px] space-y-5'>
                        <QuestionDetail question={question} />
                        {
                            answers.length > 0 &&
                            <Answers answers={answers} />
                        }

                        <p className='text-lg pt-4  font-semibold'>Your Answer</p>
                        <TextEditor content={answer} setContent={setAnswer} />
                        <button className='text-white text-xs bg-blue-500 py-2 px-3 rounded-md cursor-pointer' onClick={postQuestionClickHandler}>Post Your Answer</button>
                    </section>
                </div>
            }
        </div>
    )


}

export default QuestionDetailPage