import { UseSWRMutation } from "../types"
import { envConfig } from "@/env"
import { openPopup } from "@/modules/popup"
import useSWRMutation from "swr/mutation"
import { formatUrl } from "url-lib"

// Interface for the success response after successful authentication
export interface XLoginSuccess {
    code: string
    codeVerifier: string
}

// Function to generate PKCE (Proof Key for Code Exchange) parameters
const generatePKCE = async (): Promise<{ codeVerifier: string; codeChallenge: string }> => {
    const codeVerifier = [...Array(128)]
        .map(() => Math.random().toString(36)[2])
        .join("")

    const base64url = (str: ArrayBuffer): string =>
        btoa(String.fromCharCode(...Array.from(new Uint8Array(str))))
            .replace(/\+/g, "-")
            .replace(/\//g, "_")
            .replace(/=+$/, "")

    const encoder = new TextEncoder()
    const digest = await crypto.subtle.digest("SHA-256", encoder.encode(codeVerifier))

    return {
        codeVerifier,
        codeChallenge: base64url(digest),
    }
}

// Function to build the authorization URL for Twitter's OAuth2 flow
const buildXAuthUrl = ({
    clientId,
    redirectUri,
    codeChallenge,
    state,
    scope = "tweet.read users.read offline.access",
}: {
    clientId: string
    redirectUri: string
    codeChallenge: string
    state: string
    scope?: string
}): string => {
    const baseUrl = "https://twitter.com/i/oauth2/authorize"
    return formatUrl(baseUrl, {
        response_type: "code",
        client_id: clientId,
        redirect_uri: redirectUri,
        scope,
        state,
        code_challenge: codeChallenge,
        code_challenge_method: "S256",
    })
}

// Custom hook for handling Twitter login flow with PKCE
export const useXLoginSwrMutation = (): UseSWRMutation<XLoginSuccess> => {
    const openXLoginPopup = async () => {
        // Step 1: Generate PKCE parameters (codeVerifier and codeChallenge)
        const { codeVerifier, codeChallenge } = await generatePKCE()
        
        // Step 2: Generate a unique state to mitigate CSRF attacks
        const state = crypto.randomUUID()

        // Step 3: Store the codeVerifier and state for later validation
        sessionStorage.setItem("twitter_code_verifier", codeVerifier)
        sessionStorage.setItem("twitter_state", state)

        // Step 4: Build the Twitter OAuth authorization URL
        const authUrl = buildXAuthUrl({
            clientId: envConfig().xClientId,  // Assuming this is in your environment config
            redirectUri: window.location.origin,  // The redirect URI after successful authorization
            codeChallenge,
            state,
        })

        window.onmessage = (event) => {
            console.log(event)
        }
        
        // Step 5: Open the popup with the Twitter OAuth URL
        return new Promise<XLoginSuccess>((resolve, reject) => {
            const childWindow = openPopup<{ code: string; state: string }, string>({
                url: authUrl,
                name: "twitter_oauth_popup",
                originFilter: "https://twitter.com",
                onMessage: (message) => {
                    // Validate the message with the expected state and the code
                    if (message?.code && message?.state === state) {
                        // post message to parent
                        childWindow.parent.postMessage({
                            type: "X_LOGIN_SUCCESS",
                            code: message.code,
                            codeVerifier,
                        },
                        "*"
                        )
                        // close popup
                        childWindow.close()
                        resolve({ code: message.code, codeVerifier })
                    } else {
                        reject(new Error("Invalid state or missing code"))
                    }
                },
                onError: (error) => reject(error),
                onClose: () => reject(new Error("Popup closed")),
            })
        }
        )
    }

    // Step 6: Use SWR Mutation for handling the state of the login process
    const swrMutation = useSWRMutation("X_LOGIN", openXLoginPopup)

    return {
        swrMutation,
    }
}
