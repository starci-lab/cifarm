"use client"

import { toast, useGoogleLoginSwrMutation, useGraphQLMutationAuthenticateGoogleSwrMutation, useRouterWithSearchParams } from "@/hooks"
import { Container, ExtendedButton, Spacer } from "@/components"
import React, { FC } from "react"
import { Image } from "@/components"
import { useSingletonHook } from "@/modules/singleton-hook"
import { GOOGLE_LOGIN_SWR_MUTATION, GRAPHQL_MUTATION_AUTHENTICATE_GOOGLE_SWR_MUTATION } from "../constants"
import { setAuthenticated, useAppDispatch } from "@/redux"
import { envConfig } from "@/env"
import { saveTokens } from "@/modules/apollo/tokens"
import { pathConstants } from "@/constants"
import { useDisclosure } from "react-use-disclosure"
import { AUTHENTICATING_DISCLOSURE } from "../constants"

const Page: FC = () => {
    const dispatch = useAppDispatch()
    const { swrMutation } = useSingletonHook<ReturnType<typeof useGoogleLoginSwrMutation>>(
        GOOGLE_LOGIN_SWR_MUTATION
    )

    const { swrMutation: authenticateGoogleMutation } = useSingletonHook<ReturnType<typeof useGraphQLMutationAuthenticateGoogleSwrMutation>>(
        GRAPHQL_MUTATION_AUTHENTICATE_GOOGLE_SWR_MUTATION
    )

    const { open: openAuthenticatingModal, close: closeAuthenticatingModal } = useSingletonHook<ReturnType<typeof useDisclosure>>(AUTHENTICATING_DISCLOSURE)

    const router = useRouterWithSearchParams()
    const network = envConfig().network
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
                        try {
                            const response = await swrMutation.trigger()
                            openAuthenticatingModal()
                            try {
                                const authenticateGoogleResponse = await authenticateGoogleMutation.trigger({
                                    request: {
                                        token: response.access_token,
                                        network
                                    }
                                })
                                if (!authenticateGoogleResponse.data) {
                                    toast({
                                        title: "Failed to authenticate google",
                                        description: authenticateGoogleMutation.error?.message,
                                        variant: "destructive"
                                    })
                                    return
                                }
                                // store key pair in items
                                await saveTokens({
                                    accessToken: authenticateGoogleResponse.data.accessToken,
                                    refreshToken: authenticateGoogleResponse.data.refreshToken
                                })
                                dispatch(setAuthenticated(true))
                            } catch (error) {
                                toast({
                                    title: "Failed to authenticate google",
                                    description: error instanceof Error ? error.message : "Unknown error",
                                    variant: "destructive"
                                })
                            } finally {
                                closeAuthenticatingModal()        
                            }
                            // redirect to home
                            router.push(pathConstants.home)
                        } catch (error) {
                            toast({
                                title: "Failed to authenticate google",
                                description: error instanceof Error ? error.message : "Unknown error",
                                variant: "destructive"
                            })
                        }
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