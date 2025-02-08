import axios, { HttpStatusCode } from "axios"
import { AXIOS_TIMEOUT } from "./constants"
import { envConfig } from "@/env"
import axiosRetry, { isNetworkOrIdempotentRequestError } from "axios-retry"
import { sessionDb, SessionDbKey } from "../dexie"
import { refresh } from "./auth"
import { saveTokens } from "./tokens"

export const authAxios = axios.create({
    baseURL: envConfig().restApiUrl,
    timeout: AXIOS_TIMEOUT,
    headers: {
        "Content-Type": "application/json",
    },
})

// Add request interceptor to attach the token to the request
authAxios.interceptors.request.use(
    async (config) => {
        // get the access token from the session db
        const accessToken = await sessionDb.keyValueStore.get(SessionDbKey.AccessToken)
        if (!accessToken) {
            // Attach token to the Authorization header
            throw new Error("Access token not found")
        }
        config.headers["Authorization"] = `Bearer ${accessToken.value}`
        return config // Return the modified config
    },
    (error) => {
        // If there's an error, reject the request
        throw error
    }
)

authAxios.interceptors.response.use(
    (response) => {
        // Return response if it's successful
        return response
    },
    async (error) => {
        if (error.response && error.response.status === HttpStatusCode.Unauthorized) {
            // send api to refresh the token
            const refreshToken = await sessionDb.keyValueStore.get(SessionDbKey.RefreshToken)
            if (!refreshToken) {
                // no refresh token, throw an error
                throw new Error("Refresh token not found")
            }
            // send refresh token request
            const refreshResponse = await refresh({
                refreshToken: refreshToken.value,
            })
            // save the new tokens
            await saveTokens(refreshResponse.data)
            // retry the original request
            return authAxios(error.config)
        }

        // If not a 401 error, just reject
        throw error
    }
)

axiosRetry(authAxios, {
    retries: 3, // Number of retries
    retryDelay: axiosRetry.exponentialDelay, // Exponential backoff
    retryCondition: (error) => {
        if (isNetworkOrIdempotentRequestError(error)) return true
        // otherwise, return false
        return false
    }
})
