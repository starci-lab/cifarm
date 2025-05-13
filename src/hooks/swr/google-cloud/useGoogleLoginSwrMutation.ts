import { envConfig } from "@/env"
import useSWRMutation from "swr/mutation"
import { formatUrl } from "url-lib"
import { UseSWRMutation } from "../types"

// Example usage with your Google login:
export const useGoogleLoginSwrMutation = (): UseSWRMutation<void> => {
    const openGoogleLogin = () => {
        const state = (Math.random() * 1000000).toFixed(0)
        const authUrl = formatUrl("https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount", {
            gsiwebsdk: 3,
            client_id: envConfig().authentication.google.clientId,
            scope: "openid profile email",
            redirect_uri: envConfig().authentication.google.redirectUri,
            prompt: "select_account",
            response_type: "token",
            state,
            include_granted_scopes: "true",
            enable_granular_consent: "true",
            service: "lso",
            o2v: 2,
            flowName: "GeneralOAuthFlow",
        })
        window.location.href = authUrl
    }
  
    const swrMutation = useSWRMutation("GOOGLE_LOGIN", openGoogleLogin)
  
    return {
        swrMutation,
    }
}