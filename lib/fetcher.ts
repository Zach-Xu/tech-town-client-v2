import axios from "axios";
import { FetchConfig } from "../types/requestTypes";
import { TECH_TOWN_TOKEN } from "./constants";

axios.defaults.baseURL = process.env.API_BASE_URL


// Regular fetcher for any none-protected API
export const fetcher = async<T>(url: string): Promise<T> => {
    const reponse = await axios.get(url)
    return reponse.data
}

// Fetcher for authentication related APIs
export const authFetcher = async <T>({ url, method, data }: FetchConfig): Promise<T> => {
    const response = await axios.request({
        method,
        url,
        data
    })
    return response.data
}

// Fetcher for any protected API that requires a token 
export const protectedFetcher = async <T>({ url, method, data }: FetchConfig): Promise<T> => {

    let token: string = localStorage.getItem(TECH_TOWN_TOKEN) ?? ''

    const response = await axios.request({
        method,
        url,
        data,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return response.data
}

