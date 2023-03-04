import { REQUEST_METHOD } from "../lib/constants"

export interface FetchConfig {
    url: string
    method: REQUEST_METHOD
    data: {
        [key: string]: any
    }
}

export interface LoginUser {
    email: string
    password: string
}

export interface SignupUser extends LoginUser {
    username: string
}
