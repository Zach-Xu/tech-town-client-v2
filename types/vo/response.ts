export interface ResponseResult<T> {
    code: number
    data?: T
    msg: string
}



export interface ResponseError extends Error {
    info?: string
    status?: number
}
