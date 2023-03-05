import { SignupUser } from "./requestTypes"

export interface Response<T> {
    code: number
    data?: T
    msg: string
}

export interface User extends SignupUser {
    id: number
}

export interface SignupDTO {
    token: string
    user: User
}


export interface ResponseError extends Error {
    info?: string
    status?: number
}
