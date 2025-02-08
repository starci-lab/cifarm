import { envConfig } from "@/env"
import axios from "axios"
import { AXIOS_TIMEOUT } from "./constants"
import axiosRetry, { isNetworkOrIdempotentRequestError } from "axios-retry"

export const noAuthAxios = axios.create({
    baseURL: envConfig().restApiUrl,
    timeout: AXIOS_TIMEOUT,
    headers: {
        "Content-Type": "application/json",
    },
})

axiosRetry(noAuthAxios, {
    retries: 3, // Number of retries
    retryDelay: axiosRetry.exponentialDelay, // Exponential backoff
    retryCondition: (error) => {
        if (isNetworkOrIdempotentRequestError(error)) return true
        // otherwise, return false
        return false
    }
})
