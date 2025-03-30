"use client"

import { useDisclosure } from "react-use-disclosure"
import { Card, CardContent, CardHeader, Container, ExclamationTooltip, Header, Spacer } from "@/components"
import React, { FC } from "react"
import { Theme } from "./Theme"
import { useSingletonHook } from "@/modules/singleton-hook"
import {
    MNEMONIC_DISCLOSURE,
    PRIVATE_KEY_DISCLOSURE,
    WARNING_DISCLOSURE,
} from "../constants"
import { setWarningModal, useAppDispatch } from "@/redux"
import { Button } from "@/components"

const Page: FC = () => {
    const { open: openWarningModal } =
    useSingletonHook<ReturnType<typeof useDisclosure>>(WARNING_DISCLOSURE)
    const dispatch = useAppDispatch()
    return (
        <Container hasPadding>
            <div className="h-full">
                <Header title="Settings" description="Manage your settings." />
                <Spacer y={6} />
                <Theme />
                <Spacer y={6} />

                <Card>
                    <CardHeader>
                        <div className="flex gap-2 items-center">
                            <div className="text-lg font-bold">Security</div>
                            <ExclamationTooltip message="Manage your security settings." />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-between items-center">
                            <div className="text-sm">Mnemonic</div>
                            <Button
                                onClick={() => {
                                    dispatch(
                                        setWarningModal({
                                            message:
                    "Are you sure you want to display your mnemonic phrase? This phrase grants full access to your account or wallet. If exposed, anyone can control your assets and data. Ensure you're in a secure environment and protect it from unauthorized access. Proceed with caution.",
                                            nextModalToken: MNEMONIC_DISCLOSURE,
                                        })
                                    )
                                    openWarningModal()
                                }}
                                variant="outline"
                            >
            Show
                            </Button>
                        </div>
                        <Spacer y={4} />
                        <div className="flex justify-between items-center">
                            <div className="text-sm">Private key</div>
                            <Button
                                onClick={() => {
                                    dispatch(
                                        setWarningModal({
                                            message:
                    "Are you sure you want to reveal your private key? This key grants full control over your account or wallet. If exposed, anyone can access your assets and make transactions. Keep it secure and private at all times. Proceed with extreme caution.",
                                            nextModalToken: PRIVATE_KEY_DISCLOSURE,
                                        })
                                    )
                                    openWarningModal()
                                }}
                                variant="outline"
                            >
            Show
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </Container>
    )
}

export default Page
