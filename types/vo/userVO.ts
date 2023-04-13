export interface UserVO {
    username: string
    email: string
    id: number
    avatar: string | null
}


export interface TokenUser {
    token: string
    user: UserVO
}

export interface SearchUserVo {
    id: number
    username: string
    avatar: string
    createdTime: string
    bio: string
    skills: string[]
}