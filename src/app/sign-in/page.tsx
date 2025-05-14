"use client"

import {
    useRouterWithSearchParams,
} from "@/hooks"
import { Container, ExtendedButton, Spacer } from "@/components"
import React, { FC } from "react"
import { Image } from "@/components"
import { envConfig } from "@/env"
import { formatUrl } from "url-lib"

const Page: FC = () => {
    const router = useRouterWithSearchParams()
    const network = envConfig().network
    return (
        <Container centerContent hasPadding>
            <div className="grid place-items-center">
                <Image
                    src="/logo.png"
                    className="w-40 h-40 rounded-full ring-2 ring-white"
                />
                <Spacer y={6} />
                <div className="text-2xl font-bold">Welcome to CiFarm 🌾</div>
                <Spacer y={6} />
                <ExtendedButton
                    onClick={async () => {
                        router.push(formatUrl(`${envConfig().socialAuthUrl}/auth/google/redirect`, {
                            network
                        }))
                    }}
                    color="secondary"
                    className="w-full justify-start"
                >
                    <Image src="/google.svg" className="w-4 h-4" />
          Continue with Google
                </ExtendedButton>
                <Spacer y={2} />
                <ExtendedButton className="w-full justify-start" color="secondary" onClick={async () => {
                    router.push(formatUrl(`${envConfig().socialAuthUrl}/auth/facebook/redirect`, {
                        network
                    }))
                }}> 
                    <Image src="/facebook.svg" className="w-4 h-4" />
          Continue with Facebook
                </ExtendedButton>
                <ExtendedButton
                    onClick={async () => {
                        router.push(
                            formatUrl(`${envConfig().socialAuthUrl}/auth/x/redirect`, {
                                network
                            })
                        )
                    }}
                    className="w-full justify-start"
                    color="secondary"
                >
                    <Image src="/x.svg" className="w-4 h-4" />
          Continue with X
                </ExtendedButton>
            </div>
        </Container>
    )
}

export default Page
