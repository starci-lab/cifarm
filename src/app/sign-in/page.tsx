"use client"

import { toast, useFirebaseAuthSwrMutation, useGraphQLMutationValidateGoogleTokenSwrMutation, useRouterWithSearchParams } from "@/hooks"
import { Container, ExtendedButton, Spacer } from "@/components"
import React, { FC } from "react"
import { Image } from "@/components"
import { useSingletonHook } from "@/modules/singleton-hook"
import { FIREBASE_AUTH_SWR_MUTATION, GRAPHQL_MUTATION_VALIDATE_GOOGLE_TOKEN_SWR_MUTATION } from "../constants"
import { pathConstants } from "@/constants"
import { saveTokens } from "@/modules/apollo/tokens"
import { setAuthenticated, useAppDispatch } from "@/redux"

const Page: FC = () => {
    const dispatch = useAppDispatch()
    const { swrMutation } = useSingletonHook<ReturnType<typeof useFirebaseAuthSwrMutation>>(
        FIREBASE_AUTH_SWR_MUTATION
    )

    const { swrMutation: validateGoogleTokenMutation } = useSingletonHook<ReturnType<typeof useGraphQLMutationValidateGoogleTokenSwrMutation>>(
        GRAPHQL_MUTATION_VALIDATE_GOOGLE_TOKEN_SWR_MUTATION
    )

    const router = useRouterWithSearchParams()

    return (
        <Container centerContent hasPadding>
            <div className="grid place-items-center">
                <Image src="/logo.png" className="w-40 h-40 rounded-full ring-2 ring-white"/>
                <Spacer y={6}/>
                <div className="text-2xl font-bold">
                    Welcome to CiFarm 🌾
                </div>
                <Spacer y={6}/>
                <ExtendedButton isLoading={swrMutation.isMutating}
                    onClick={async () => {
                        const response = await swrMutation.trigger()
                        const id = await response.user.getIdToken()
                        const validateGoogleTokenResponse = await validateGoogleTokenMutation.trigger({
                            request: {
                                token: id
                            }
                        })
                        if (!validateGoogleTokenResponse.data) {
                            toast({
                                title: "Failed to validate google token",
                                description: validateGoogleTokenMutation.error?.message,
                                variant: "destructive"
                            })
                            return
                        }
                        // store key pair in items
                        await saveTokens({
                            accessToken: validateGoogleTokenResponse.data.accessToken,
                            refreshToken: validateGoogleTokenResponse.data.refreshToken
                        })

                        dispatch(setAuthenticated(true))
                        // redirect to home
                        router.push(pathConstants.home)
                    }}
                    variant="secondary"
                    className="w-full justify-start">
                    <Image src="/google.svg" className="w-4 h-4"/>
                    Continue with Google
                </ExtendedButton>
                <Spacer y={2}/>
                <ExtendedButton className="w-full justify-start" variant="secondary">
                    <Image src="/facebook.svg" className="w-4 h-4"/>
                    Continue with Facebook
                </ExtendedButton>
                <Spacer y={2}/>
                <ExtendedButton className="w-full justify-start" variant="secondary">
                    <Image src="/x.svg" className="w-4 h-4"/>
                    Continue with X</ExtendedButton>
            </div>
        </Container>
    )
}

export default Page