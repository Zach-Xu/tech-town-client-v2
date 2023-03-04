import { SignupUser } from "./requestTypes"

export interface Response<T> {
    code: number
    data?: T
    msg: string
}

interface User extends SignupUser {
    id: number
}

export interface SignupDTO {
    token: string
    user: User
}