import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../types"
import { useGoogleLogin, TokenResponse, NonOAuthError } from "@react-oauth/google"
import { useRef } from "react"

export const useGoogleLoginSwrMutation = (): UseSWRMutation<
  Omit<TokenResponse, "error" | "error_description" | "error_uri">
> => {
    const resolvePromiseRef = useRef<(
    token: Omit<TokenResponse, "error" | "error_description" | "error_uri">
  ) => void>()
    const rejectPromiseRef = useRef<(
    error: Pick<TokenResponse, "error" | "error_description" | "error_uri"> | NonOAuthError
  ) => void>()

    const login = useGoogleLogin({
        onSuccess: (response) => {
            
            // Remove the error-related properties from the responseresponse;
            resolvePromiseRef.current?.(response)
        },
        onError: (error) => {
            console.log("error", error)
            rejectPromiseRef.current?.(error)
        }, 
        onNonOAuthError: (error) => {
            console.log("error", error)
            rejectPromiseRef.current?.(error)
        },
    })

    const swrMutation = useSWRMutation("GOOGLE_LOGIN", async () => {
        return new Promise(
            (
                resolve: (
          token: Omit<
            TokenResponse,
            "error" | "error_description" | "error_uri"
          >
        ) => void,
                reject: (
          error: Pick<
            TokenResponse,
            "error" | "error_description" | "error_uri"
          > | NonOAuthError
        ) => void
            ) => {
                resolvePromiseRef.current = resolve
                rejectPromiseRef.current = reject
                login()
            }
        )
    })

    return {
        swrMutation,
    }
}
