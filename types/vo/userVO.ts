export interface UserVO {
    username: string
    email: string
    id: number
}


export interface TokenUser {
    token: string
    user: UserVO
}

