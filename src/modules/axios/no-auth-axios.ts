import { envConfig } from "@/env"
import axios, { HttpStatusCode } from "axios"
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
        // Do not retry if the error is 429 Too Many Requests
        if (error.status === HttpStatusCode.TooManyRequests) return false
        // Do not retry if the error is 401 Unauthorized
        if (error.status === HttpStatusCode.Unauthorized) return false
        // Do not retry if the error is 403 Forbidden
        if (error.status === HttpStatusCode.Forbidden) return false
        // Otherwise, retry
        return true
    }
})
