import React from 'react'
import useSWR from 'swr'
import { protectedFetcher } from '../../lib/fetcher'
import { QuestionVO } from '../../types/vo/questionVO'
import { ResponseResult } from '../../types/vo/response'
import Question from '../../components/Question'

type Props = {}

const index = (props: Props) => {

    const { data, isLoading } = useSWR({ url: '/api/questions/bookmark' }, protectedFetcher<ResponseResult<QuestionVO[]>, null>, {
        onSuccess(data, key, config) {
            if (data.code === 200 && data.data) {

            }
        }
    })

    return (
        <div >
            {/* Center */}
            <div className='max-w-[700px]'>
                <div className='flex justify-between items-center mx-3 mb-2 mt-3'>
                    <h2 className='text-xl md:text-2xl'>My Bookmarks</h2>

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

export default index