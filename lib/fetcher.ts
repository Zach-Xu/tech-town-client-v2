import axios from "axios";
import { FetchConfig } from "../types/dto/fetchConfig";

import { TECH_TOWN_TOKEN } from "./constants";

axios.defaults.baseURL = process.env.API_BASE_URL


// Regular fetcher for any none-protected API
/**
 * @typeparam  T - type of data received from server
 */
export const fetcher = async<T>(url: string): Promise<T> => {
    const reponse = await axios.get(url)
    return reponse.data
}

// Fetcher for authentication related APIs
/**
 * @typeparam  T - type of data received from the server
 * @typeparam  S - type of data sent to the server
 */
export const authFetcher = async <T, S>({ url, method, data }: FetchConfig<S>): Promise<T> => {
    const response = await axios.request({
        method,
        url,
        data
    })
    return response.data
}

// Fetcher for any protected API that requires a token
/**
 * @typeparam  T - type of data received from the server
 * @typeparam  S - type of data sent to the server
 */
export const protectedFetcher = async <T, S>({ url, method, data }: FetchConfig<S>): Promise<T> => {

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

