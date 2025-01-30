import { ApolloClient, ApolloLink, InMemoryCache } from "@apollo/client"
import { defaultOptions, httpLink, MAX_RETRY, MAX_RETRY_DELAY, timeoutLink } from "./common"
import { RetryLink } from "@apollo/client/link/retry"

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

export const noCacheClient = new ApolloClient({
    cache: new InMemoryCache(),
    link: ApolloLink.from([retryLink, timeoutLink, httpLink]),
    defaultOptions
})

export const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: ApolloLink.from([retryLink, timeoutLink, httpLink])
})


