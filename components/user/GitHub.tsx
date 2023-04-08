import React from 'react'
import useSWRImmutable from 'swr/immutable'
import { fetcher } from '../../lib/fetcher'
import { ResponseResult } from '../../types/vo/response'
import { GitHubRepo } from '../../types/vo/profileVO'
import RepoLanguageDot from '../widget/RepoLanguageDot'
import { StarIcon } from '@heroicons/react/24/solid'
import { EyeIcon, ShareIcon } from '@heroicons/react/24/outline'

type Props = {
    username: string | null
}

const GitHub = ({ username }: Props) => {
    const { data, isLoading } = useSWRImmutable(`/api/profile/github/${username}`, fetcher<ResponseResult<GitHubRepo[]>>, {

    })

    if (isLoading) {
        <div>Loading...</div>
    }

    if (username === null) {
        return <div className='rounded-md p-2 my-4 text-red-500'>Oops, This user has not yet linked his or her GitHub Page, check again in another time</div>
    }

    return (
        <div className='flex flex-col shadow-md mt-2 bg-white rounded-md'>
            {
                data?.data?.map(repo => (
                    <div key={repo.id} className='flex items-center bg-blue-100 rounded-md m-2 pr-2 md:pr-4'>
                        <div className='p-3 md:p-5 flex flex-col space-y-1  flex-1'>
                            <h5 className='text-blue-600 hover:text-blue-400 flex items-center space-x-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-700">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
                                </svg>
                                <a href={repo.html_url} target='_blank'>{repo.name}</a>
                            </h5>
                            <p className='px-1 text-sm text-gray-700'>{repo.description}</p>
                            {
                                repo.language &&
                                <div className='flex items-center space-x-1'>
                                    <RepoLanguageDot language={repo.language} />
                                    <span className='text-xs md:text-sm'>{repo.language}</span>
                                </div>
                            }
                        </div>
                        <div className='max-w-[200px] text-gray-700 text-sm'>
                            <div className='flex items-center space-x-2'>
                                <StarIcon className='w-5 h-5 text-yellow-400' />
                                <span>{repo.stargazers_count} stars</span>
                            </div>
                            <div className='flex items-center space-x-2'>
                                <EyeIcon className='w-5 h-5 text-gray-900' />
                                <span>{repo.stargazers_count} watching</span>
                            </div>
                            <div className='flex items-center space-x-2'>
                                <ShareIcon className='w-5 h-5 text-gray-900' />
                                <span>{repo.stargazers_count} forks</span>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default GitHub