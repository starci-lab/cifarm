import { sessionDb, SessionDbKey } from "@/modules/dexie"
import { setContext } from "@apollo/client/link/context"
import { onError } from "@apollo/client/link/error"
import { saveTokens } from "./tokens"
import { ApolloClient, ApolloLink, InMemoryCache, } from "@apollo/client"
import { defaultOptions, httpLink, timeoutLink, MAX_RETRY, MAX_RETRY_DELAY } from "./common"
import { RetryLink } from "@apollo/client/link/retry"
import { mutationRefresh } from "./mutations"

const authLink = setContext(async (_, { headers }) => {
    // get the authentication token from local storage if it exists
    const accessToken = await sessionDb.keyValueStore.get(SessionDbKey.AccessToken)
    // if token not exist, throw an error
    if (!accessToken) {
        throw new Error("Access token not found")
    }
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: accessToken.value ? `Bearer ${accessToken.value}` : "",
        }
    }
})

const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
        // Log GraphQL errors to the console or external service
        graphQLErrors.forEach(({ message, locations, path }) =>
            console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
        )
        // You can handle specific GraphQL errors here, e.g., unauthorized errors:
        graphQLErrors.forEach(async ({ message }) => {
            if (message === "Unauthorized") {
                const refreshToken = await sessionDb.keyValueStore.get(SessionDbKey.RefreshToken)
                if (!refreshToken) {
                    // no refresh token, throw an error
                    throw new Error("Refresh token not found")
                }
                // send refresh token request
                const refreshResponse = await mutationRefresh({
                    request: {
                        refreshToken: refreshToken.value,
                    },
                })
                if (!refreshResponse.data) {
                    throw new Error("Refresh token request failed")
                }
                // save the new tokens
                if (!refreshResponse.data.refresh.data) {
                    throw new Error("Refresh token request failed")
                }
                await saveTokens(refreshResponse.data.refresh.data)
                // retry the request
                return forward(operation)
            }
        })
    }

    if (networkError) {
        // Log network errors to the console or an error tracking service
        console.error(`[Network error]: ${networkError}`)
    }

    // Optionally, you can forward the request again after handling the error.
    // You can also retry failed requests, trigger an error page, etc.
    // return forward(operation) // Forward the operation to retry or continue.
})

export const retryLink = new RetryLink({
    delay: {
        initial: 300,
        max: MAX_RETRY_DELAY,
        jitter: true
    },
    attempts: {
        max: MAX_RETRY,
        retryIf: (error) => {
            return !!error
        }
    }
})

export const authClient = new ApolloClient({
    link: ApolloLink.from([retryLink, authLink, errorLink, timeoutLink, httpLink]), // Combine the 4 links
    cache: new InMemoryCache(), // Cache configuration
})

export const noCacheAuthClient = new ApolloClient({
    link: ApolloLink.from([retryLink, authLink, errorLink, timeoutLink, httpLink]), // Combine the 4 links
    cache: new InMemoryCache(),
    defaultOptions,
})
