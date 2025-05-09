"use client"

import { useFirebaseAuthSwrMutation, useRouterWithSearchParams } from "@/hooks"
import { Container, ExtendedButton } from "@/components"
import React, { FC } from "react"
import { useDispatch } from "react-redux"
import { useSingletonHook } from "@/modules/singleton-hook"
import { FIREBASE_AUTH_SWR_MUTATION } from "./constants"

const Page: FC = () => {
    const router = useRouterWithSearchParams()
    const dispatch = useDispatch()

    const { swrMutation } = useSingletonHook<ReturnType<typeof useFirebaseAuthSwrMutation>>(
        FIREBASE_AUTH_SWR_MUTATION
    )
    return (
        <Container centerContent hasPadding>
            
        </Container>
    )
}

export default Page

{/* <div className="w-full">
                <div className="grid place-items-center gap-4 w-full">
                    <div className="relative w-[150px] h-[150px] rounded-full overflow-hidden">
                        <Image
                            src="/logo.png"
                            alt="CiFarm Logo"
                            className="object-contain"
                        />
                    </div>
                </div>
                <div className="h-6" />
                <div className="text-center">
                    <div className="text-4xl font-bold">CiFarm</div>
                    <div className="text-muted-foreground text-sm">
            The leading GameFixDeFi farming game
                    </div>
                </div>
                <div className="h-12" />
                <div className="grid gap-4 w-full">
                    <ExtendedButton
                        size="lg"
                        className="w-full"
                        onClick={async () => {
                            const response = await swrMutation.trigger()
                            const id = await response.user.getIdToken()
                            console.log(id)
                        }}
                    >
            Continue with 
                    </ExtendedButton>
                    <ExtendedButton
                        variant="outline"
                        size="lg"
                        className="w-full"
                        onClick={() => router.push(pathConstants.import)}
                    >
            Import existing account
                    </ExtendedButton>
                </div>
            </div> */}