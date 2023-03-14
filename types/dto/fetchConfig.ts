import { REQUEST_METHOD } from "../../lib/constants"

export interface FetchConfig<T> {
    url: string
    method: REQUEST_METHOD
    data: T,
    token?: string
}


