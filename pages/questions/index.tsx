import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import useSWRMutation from 'swr/mutation'
import { fetcher } from '../../lib/fetcher'
import { QuestionVO } from '../../types/vo/questionVO'
import { ResponseResult } from '../../types/vo/response'
import Question from '../../components/Question'

type Props = {}

const index: NextPage = (props: Props) => {

    const router = useRouter()

    const { query: { tag, keyword } } = router

    const [questions, setQuestions] = useState<QuestionVO[]>()

    const { trigger: searchTaggedQuestion, isMutating: isTaggedMutating } = useSWRMutation(`/api/questions/search?tag=${encodeURIComponent(tag as string)}`, fetcher<ResponseResult<QuestionVO[]>>, {
        onSuccess(data, key, config) {
            if (data.code === 200 && data.data) {
                setQuestions(data.data)
            }
        }
    })

    const { trigger: searchKeywordQuestion, isMutating: isKeywordMutating } = useSWRMutation(`/api/questions/search?keyword=${keyword}`, fetcher<ResponseResult<QuestionVO[]>>, {
        onSuccess(data, key, config) {
            if (data.code === 200 && data.data) {
                setQuestions(data.data)
            }
        }
    })

    // default to fetch latest questions
    const { trigger, isMutating } = useSWRMutation(`/api/questions`, fetcher<ResponseResult<QuestionVO[]>>, {
        onSuccess(data, key, config) {
            if (data.code === 200 && data.data) {
                setQuestions(data.data)
            }
        }
    })

    useEffect(() => {
        if (tag) {
            searchTaggedQuestion()
        } else if (keyword) {
            searchKeywordQuestion()
        } else {
            trigger()
        }
    }, [tag, keyword])

    return (
        <div >
            {/* Center */}
            <div className='max-w-[700px]'>
                <div className='flex justify-between items-center mx-3 mb-2 mt-3'>
                    {
                        (tag && !keyword) && <h2 className='text-xl md:text-2xl'> Questions tagged &#91;{tag}&#93;</h2>
                    }
                    {
                        (!tag && keyword) && <h2 className='text-xl md:text-2xl'> Questions keyword &#91;{keyword}&#93;</h2>
                    }
                    {
                        (!tag && !keyword) && <h2 className='text-xl md:text-2xl'> Newest questions</h2>
                    }


                    <Link href={'/questions/ask'}>
                        <button className='text-white bg-blue-500 p-2 rounded-md text-sm md:text-base'>Ask Question</button>
                    </Link>
                </div>
                <div>
                    {
                        (isTaggedMutating || isKeywordMutating) && `loading....`
                    }
                    {
                        !((isTaggedMutating || isKeywordMutating)) && questions && questions.map(question => (

                            <Question key={question.id} question={question} />

                        ))

                    }
                </div>

                {/* Right */}
            </div>
        </div>
    )
}

export default index