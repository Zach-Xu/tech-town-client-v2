import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { AppState } from '../../redux/reducers'
import useSWR from 'swr'
import { protectedFetcher } from '../../lib/fetcher'
import { ProfileEntity, ProfileVO, SkillVO } from '../../types/vo/profileVO'
import { ResponseResult } from '../../types/vo/response'
import ProfileHeader from '../../components/user/ProfileHeader'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'
import { FetchConfig } from '../../types/dto/fetchConfig'
import { REQUEST_METHOD } from '../../lib/constants'
import useSWRMutation from 'swr/mutation'
import { ProfileDTO } from '../../types/dto/profileDTO'
import { toast } from 'react-toastify'

type Props = {}

const edit = (props: Props) => {

    const loggedInUser = useSelector((state: AppState) => state.user)

    const [profile, setProfile] = useState<ProfileVO>()

    const router = useRouter()

    const { isLoading, mutate } = useSWR({ url: `/api/profile/user/${loggedInUser?.id}` }, protectedFetcher<ResponseResult<ProfileVO>, null>, {
        onSuccess(data, key, config) {
            if (data.code === 200 && data.data) {
                setProfile(data.data)
                setSkills(data.data.skills.map(skill => skill.skillName))
            }
        },
        revalidateOnFocus: false,
        revalidateOnMount: false,
        revalidateOnReconnect: false,
    })

    useEffect(() => {
        mutate()
    }, [loggedInUser])

    const [skills, setSkills] = useState<string[]>([])

    const skillInputRef = useRef<HTMLInputElement>(null)

    const handleSkills = (e: React.KeyboardEvent) => {
        if (!skillInputRef.current) return
        let currentSkill: string = skillInputRef.current.value.trim()


        // space or comma key is pressed
        if (e.key === ' ' || e.key === ',') {
            // maximum of 10 tags is allowed
            if (skills.length === 10) return e.preventDefault()
            // prevent users from entering empty tag or a tag that only contains a comma
            if (currentSkill === '' || currentSkill === ',') return e.preventDefault()

            currentSkill = currentSkill.replace(/[ ,]/g, "");
            // only add the unique tag to the array
            if (!skills.includes(currentSkill)) {
                setSkills(skills => [...skills, currentSkill])
            }
            // clean up 
            skillInputRef.current.value = ''
        }
        // remove tag
        if (e.key === 'Backspace' && skills.length > 0 && skillInputRef.current.value.trim() === '') {
            skillInputRef.current.value = skills.slice(-1)[0]
            setSkills(skills => skills.slice(0, -1))
        }

    };

    const inputBlurHandler = () => {
        if (!skillInputRef.current) return
        let currentSkill: string = skillInputRef.current.value.trim()
        if (skills.length === 10) return
        // prevent users from entering empty tag or a tag that only contains a comma
        if (currentSkill === '' || currentSkill === ',') return

        currentSkill = currentSkill.replace(/[ ,]/g, "");
        // only add the unique tag to the array
        if (!skills.includes(currentSkill)) {
            setSkills(setSkills => [...skills, currentSkill])
        }
        // clean up 
        skillInputRef.current.value = ''
    }

    const skillClickHandler = (skill: string) => {
        setSkills(skills.filter(s => s !== skill))
    }


    const toProfilePage = (): void => {
        router.push(`/profile/${loggedInUser?.id}`)
    }


    const updateProfileParams: FetchConfig<ProfileDTO> = {
        data: {
            bio: profile?.bio,
            github: profile?.github,
            username: profile?.username,
            skills: skills.map((skill): SkillVO => ({ skillName: skill, description: null })),
        },
        method: REQUEST_METHOD.POST,
        url: '/api/profile',
    }

    const { trigger } = useSWRMutation(updateProfileParams, protectedFetcher<ResponseResult<ProfileEntity>, ProfileDTO>, {
        onSuccess(data, key, config) {
            if (data.code == 200) {
                toast.success(data.msg)
                router.push(`/profile/${loggedInUser?.id}`)
                return
            }
            if (data.code == 401 || data.code == 400) {
                toast.error(data.msg)
            }
        },
    })



    if (!loggedInUser) {
        return <div>Loading...</div>
    }


    if (!profile) {
        return <div>Loading...</div>
    }




    return (
        <div className='max-w-[900px] md:py-5 md:px-10 mt-2 md:mt-0 mx-2 md:mx-0'>
            <ProfileHeader isEditButtonDisplay={false} username={profile.username} joinTime={profile.joinTime} />
            <h1 className='my-2 font-semibold text-[20px]'>Public Information</h1>
            <div className='bg-white p-2 space-y-2 rounded-md shadow-md'>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Display name</span>
                    </label>
                    <input type="text" placeholder="username" value={profile.username} onChange={e => setProfile({ ...profile, username: e.target.value })} className="input input-bordered w-full max-w-xs" />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Bio</span>
                    </label>
                    <textarea className="textarea textarea-bordered h-24" value={profile.bio} onChange={e => setProfile({ ...profile, bio: e.target.value })} placeholder="About me"></textarea>
                </div>
                <div className='flex flex-col bg-white '>
                    <h5 className='label-text'>Skills</h5>
                    <div className='flex  flex-col-reverse md:flex-row input input-bordered md:border  p-1'>
                        <div className=' flex items-center space-x-2 md:pl-2'>
                            {
                                skills.map(skill => (
                                    <div className='bg-blue-100 text-sm py-1 px-2 flex items-center space-x-2 rounded-md' key={skill}>
                                        <span> {skill} </span>
                                        <XMarkIcon onClick={() => skillClickHandler(skill)} className='h-4 w-4 font-bold cursor-pointer' />
                                    </div>
                                ))
                            }
                        </div>
                        <input type="text" name="" ref={skillInputRef} onBlur={inputBlurHandler} onKeyDown={handleSkills}
                            className='mb-2 md:mb-0 border border-gray-400 md:border-0 outline-none flex-grow shrink text-xs md:text-sm p-2 focus:outline-none' placeholder='e.g. (typescript database react)' />
                    </div>
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">GitHub link or username</span>
                    </label>
                    <input type="text" placeholder="eg. https://github.com/username" value={profile.github} onChange={e => setProfile({ ...profile, github: e.target.value })} className="input input-bordered " />
                </div>
                <div className='flex space-x-4'>
                    <button className='bg-blue-400 hover:bg-blue-300 py-1 px-3 text-white rounded-md mt-5'
                        onClick={() => trigger()}
                    >Save profile</button>
                    <button className='bg-blue-400 hover:bg-blue-300 py-1 px-3 text-white rounded-md mt-5'
                        onClick={toProfilePage}
                    >Cancel</button>
                </div>

            </div>

        </div>
    )
}

export default edit