"use client"

import {
    useRouterWithSearchParams,
} from "@/hooks"
import { BlurEffect, Container, ExtendedButton, Spacer } from "@/components"
import React, { FC } from "react"
import { Image } from "@/components"
import { envConfig } from "@/env"
import { formatUrl } from "url-lib"
import { useSearchParams } from "next/navigation"

const Page: FC = () => {
    const router = useRouterWithSearchParams()
    const network = envConfig().network
    const searchParams = useSearchParams()
    const referralUserId = searchParams.get("referralUserId")
    return (
        <Container centerContent hasPadding>
            <div className="grid place-items-center">
                <BlurEffect />
                <BlurEffect position="center" />
                <Image
                    src="/logo.png"
                    className="w-40 h-40 rounded-full ring-2 ring-white"
                />
                <Spacer y={6} />
                <div className="text-2xl font-bold">Welcome to CiFarm 🌾</div>
                <Spacer y={6} />
                <ExtendedButton
                    variant="flat"
                    onClick={async () => {
                        const url = formatUrl(`${envConfig().socialAuthUrl}/auth/google/redirect`, {
                            network,
                            referralUserId
                        })
                        router.push(url)
                    }}
                    color="secondary"
                    className="w-full justify-start"
                >
                    <Image src="/google.svg" className="w-6 h-6" />
          Continue with Google
                </ExtendedButton>
                {/* <Spacer y={2} />
                <ExtendedButton
                    variant="flat"
                    className="w-full justify-start"
                    color="secondary"
                    onClick={async () => {
                        const url = formatUrl(`${envConfig().socialAuthUrl}/auth/facebook/redirect`, {
                            network,
                            referralUserId
                        })
                        router.push(url)
                    }}
                > 
                    <Image src="/facebook.svg" className="w-4 h-4" />
          Continue with Facebook
                </ExtendedButton> */}
                <Spacer y={2} />
                <ExtendedButton
                    variant="flat"
                    onClick={async () => {
                        const url = formatUrl(`${envConfig().socialAuthUrl}/auth/x/redirect`, {
                            network,
                            referralUserId
                        })
                        router.push(url)
                    }}
                    className="w-full justify-start"
                    color="secondary"
                >
                    <Image src="/x.svg" className="w-6 h-6" />
          Continue with X
                </ExtendedButton>
            </div>
        </Container>
    )
}

export default Page
