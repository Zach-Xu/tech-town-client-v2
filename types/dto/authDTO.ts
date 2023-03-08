
export interface LoginDTO {
    email: string
    password: string
}

export interface SignupDTO extends LoginDTO {
    username: string
}



