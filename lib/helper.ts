import { FetchConfig } from "../types/requestTypes";
import { TECH_TOWN_TOKEN } from "./constants";

// Regular fetcher for any none-protected API
export const fetcher = <T>(url: string): Promise<T> => fetch(url).then(res => res.json())

// Fetcher for authentication related APIs
export const authFetcher = <T>({ url, method, data }: FetchConfig): Promise<T> => {

    if (url.startsWith('/')) {
        url = process.env.API_BASE_URL + url
    }

    let body = JSON.stringify(data)

    return fetch(url, {
        method,
        headers: {
            'Content-Type': 'application/json'
        },
        body
    }).then(res => res.json())
}

// Fetcher for any protected API that requires a token 
export const protectedFetcher = <T>({ url, method, data }: FetchConfig): Promise<T> => {

    if (url.startsWith('/')) {
        url = process.env.API_BASE_URL + url
    }

    let body = JSON.stringify(data)

    const token: string = localStorage.getItem(TECH_TOWN_TOKEN) ?? ''

    return fetch(url, {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body
    }).then(res => res.json())
}

