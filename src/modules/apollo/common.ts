import { envConfig } from "@/env"
import { createHttpLink, DefaultOptions } from "@apollo/client"
import ApolloLinkTimeout from "apollo-link-timeout"

export const TIMEOUT = 3000 // 3 seconds
export const MAX_RETRY = 5 // 5 retries
export const MAX_RETRY_DELAY = 5000 // 5 second

export const defaultOptions: DefaultOptions = {
    watchQuery: {
        fetchPolicy: "no-cache",
        errorPolicy: "ignore",
    },
    query: {
        fetchPolicy: "no-cache",
        errorPolicy: "all",
    },
}

export const httpLink = createHttpLink({
    uri: envConfig().graphqlUrl,
})

export const timeoutLink = new ApolloLinkTimeout(300000)