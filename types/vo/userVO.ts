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

